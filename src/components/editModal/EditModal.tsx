import { ChangeEvent, FormEvent, useState } from "react";
import classes from "./editModal.module.css";
import { Photo, Property } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { countries, responseType, propertyTypes } from "@/constants";
import { notify } from "@/utils/notify";
import { AiOutlineClose, AiOutlineFileImage } from "react-icons/ai";
import { uploadImage } from "@/utils/uploadImage";

interface EditModalProps {
  handleHideEditModal: () => void;
  property: Property;
  id: string;
}

const EditModal = ({ handleHideEditModal, property, id }: EditModalProps) => {
  const [editedProperty, setEditedProperty] = useState(property);
  const [photo, setPhoto] = useState<Photo>(null);

  const { data: session } = useSession();

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditedProperty((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFieldEmpty = Object.values(editedProperty).some(
      (field) => field === ""
    );

    if (isFieldEmpty) {
      return notify("Please fill out all fields", responseType.error);
    }

    try {
      if (photo) {
        const imageUrl = await uploadImage(photo);
        editedProperty.img = imageUrl;
      }

      const res = await fetch(`http://localhost:3000/api/property/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "PUT",
        body: JSON.stringify({
          ...editedProperty,
          currentOwner: session?.user?._id,
        }),
      });

      if (!res.ok) {
        throw new Error("Error occured");
      }

      const updatedProperty = res.json();

      router.push(`/details/${updatedProperty._id}`);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Edit Property</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputWrapper}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedProperty.title}
              onChange={handleChange}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={editedProperty.desc}
              onChange={handleChange}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedProperty.price}
              onChange={handleChange}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="sqmeters">Sq. meters</label>
            <input
              type="number"
              id="sqmeters"
              name="sqmeters"
              value={editedProperty.sqmeters}
              onChange={handleChange}
            />
          </div>
          <div className={classes.inputWrapperImage}>
            <label htmlFor="image">
              Upload Image <AiOutlineFileImage />
            </label>
            <input
              type="file"
              id="image"
              style={{ display: "none" }}
              onChange={(e) => setPhoto(e.target.files?.[0])}
            />
          </div>
          <div className={classes.inputWrapper}>
            <select
              name="country"
              id="country"
              value={editedProperty.country}
              onChange={handleChange}
              className={classes.country}
            >
              {countries.map((country) => (
                <option value={country} key={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.inputWrapper}>
            <select
              name="propertyType"
              id="propertyType"
              value={editedProperty.propertyType}
              onChange={handleChange}
              className={classes.type}
            >
              {propertyTypes.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <button className={classes.listBtn} type="submit">
            List Estate
          </button>
        </form>
        <AiOutlineClose
          className={classes.closeIcon}
          onClick={handleHideEditModal}
          size={25}
        />
      </div>
    </div>
  );
};

export default EditModal;
