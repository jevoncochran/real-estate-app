"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/hero/Hero";
import Properties from "@/components/properties/Properties";
import { propertiesData } from "@/components/properties/propertiesData";

export default function Home() {
  const [estates, setEstates] = useState([]);

  useEffect(() => {
    const fetchEstates = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/property");
        const data = await res.json();

        setEstates(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEstates();
  }, []);
  return (
    <main>
      <Hero />
      <Properties properties={estates} />
    </main>
  );
}
