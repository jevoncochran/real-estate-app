import { useState, FormEvent, ChangeEvent } from "react";
import classes from "./listModal.module.css";
import { AiOutlineClose, AiOutlineFileImage } from "react-icons/ai";
import {
  CLOUD_NAME,
  UPLOAD_PRESET,
  countries,
  propertyTypes,
  responseType,
} from "@/constants";
import { ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { notify } from "@/utils/notify";
import { ExtendedSession } from "@/types";

interface ListModalProps {
  handleHideListModal: () => void;
}

interface NewProperty {
  title: string;
  desc: string;
  sqmeters: number;
  beds: number;
  country: string;
  propertyType: string;
}

const ListModal = ({ handleHideListModal }: ListModalProps) => {
  const [newProperty, setNewProperty] = useState<NewProperty>({
    title: "",
    desc: "",
    sqmeters: 1,
    beds: 1,
    country: "",
    propertyType: "",
  });
  const [photo, setPhoto] = useState<File | null | undefined>(null);

  const { data: session }: ExtendedSession = useSession();

  const router = useRouter();

  console.log("new property: ", newProperty);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value: string | number = e.target.value;
    if (e.target.type === "number") {
      console.log("this is getting changed to number");
      value = parseInt(value);
    }
    setNewProperty((prev) => {
      return {
        ...prev,
        [e.target.name]: value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFieldEmpty = Object.values(newProperty).some(
      (field) => field === ""
    );

    if (isFieldEmpty) {
      return notify("Please fill out all fields", responseType.error);
    }

    try {
      const imageUrl = await uploadImage();

      const res = await fetch("http://localhost:3000/api/property", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "POST",
        body: JSON.stringify({
          ...newProperty,
          img: imageUrl,
          currentOwner: session?.user?._id,
        }),
      });

      if (!res.ok) {
        throw new Error("Error occurred");
      }

      const property = await res.json();

      router.push(`/details/${property._id}`);
    } catch (error) {
      console.log("An error has ocurrend");
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (!photo) return;

    const formData = new FormData();

    formData.append("file", photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const imageUrl = data["secure_url"];

      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.title}>List Property</div>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputWrapper}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="desc">Description</label>
            <input type="text" name="desc" id="desc" onChange={handleChange} />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              onChange={handleChange}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="sqmeters">Sq. meters</label>
            <input
              type="number"
              name="sqmeters"
              id="sqmeters"
              onChange={handleChange}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="beds">Beds</label>
            <input
              type="number"
              name="beds"
              id="beds"
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
              value={newProperty.country}
              onChange={handleChange}
              className={classes.country}
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.inputWrapper}>
            <select
              name="propertyType"
              id="propertyType"
              value={newProperty.propertyType}
              onChange={handleChange}
              className={classes.propertyType}
            >
              {propertyTypes.map((pt) => (
                <option key={pt} value={pt}>
                  {pt}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={classes.listBtn}>
            List Estate
          </button>
          <AiOutlineClose
            className={classes.closeIcon}
            onClick={handleHideListModal}
            size={25}
          />
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ListModal;
