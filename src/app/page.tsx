import Hero from "@/components/hero/Hero";
import Properties from "@/components/properties/Properties";
import { propertiesData } from "@/components/properties/propertiesData";

export default function Home() {
  return (
    <main>
      <Hero />
      <Properties properties={propertiesData} />
    </main>
  );
}
