"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { propertiesData } from "@/components/properties/propertiesData";
import { Property } from "@/types";
import classes from "./details.module.css";
import Image from "next/image";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import EditModal from "@/components/editModal/EditModal";

const DetailsPage = (ctx) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const router = useRouter();

  const id = ctx.params.id;

  const isOwner = true;

  const handleShowEditModal = () => {
    setShowEditModal((prev) => true);
  };

  const handleHideEditModal = () => {
    setShowEditModal((prev) => false);
  };

  const handleDelete = () => {};

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/property/${id}`);
        const data = await res.json();
        setProperty(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProperty();
  }, []);

  console.log(property);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.imageContainer}>
          <Image
            src={property?.img ?? ""}
            alt="Property"
            height="750"
            width="1000"
          />
          <span className={classes.category}>{property?.propertyType} </span>
        </div>
        <div className={classes.propertyData}>
          <div className={classes.propertySection}>
            <h2 className={classes.title}>{property?.title}</h2>
            {isOwner && (
              <div className={classes.controls}>
                <button onClick={handleShowEditModal}>
                  <BsFillPencilFill />
                </button>
                <button onClick={handleDelete}>
                  <BsFillTrashFill />
                </button>
              </div>
            )}
          </div>
          <div className={classes.propertySection}>
            <h5 className={classes.country}>{property?.country}</h5>
            <span className={classes.propertyType}>{property?.type}</span>
          </div>
          <div className={classes.propertySection}>
            <h5
              className={classes.sqmeters}
            >{`${property?.sqmeters} Sq. meters`}</h5>
            <span className={classes.beds}>
              {property?.beds} <FaBed />
            </span>
          </div>
          <div className={classes.propertySection}>
            <span
              className={classes.price}
            >{`Price: $${property?.price}`}</span>
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditModal
          handleHideEditModal={handleHideEditModal}
          property={property}
          id={id}
        />
      )}
    </div>
  );
};

export default DetailsPage;
