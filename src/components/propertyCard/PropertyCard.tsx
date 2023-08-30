import React from "react";
import { Property } from "@/types";
import classes from "./propertyCard.module.css";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link
          href={`/details/${property._id}`}
          className={classes.imageContainer}
        >
          <Image src={property.img} alt="Property" width="350" height="300" />
          <span className={classes.propertyCategory}>
            {property.propertyType}
          </span>
          <div className={classes.propertyData}>
            <h5 className={classes.propertyTitle}>{property.title}</h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
