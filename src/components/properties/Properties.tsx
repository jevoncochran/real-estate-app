import React from "react";
import classes from "./properties.module.css";
import PropertyCard from "@/components/propertyCard/PropertyCard";
import { Property } from "@/types";

interface PropertiesProps {
  properties: Property[];
}

const Properties = ({ properties }: PropertiesProps) => {
  const isProperties = properties.length > 0;
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h2 className={classes.mainTitle}>Most Viewed Properties</h2>
          <h5 className={classes.secondaryTitle}>Check them out</h5>
        </div>
        <div className={classes.propertyContainer}>
          {isProperties ? (
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <h2>No properties listed</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
