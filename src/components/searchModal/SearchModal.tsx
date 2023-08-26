import { useState } from "react";
import classes from "./searchModal.module.css";
import { useRouter } from "next/navigation";
import { MAX_PRICE, MIN_PRICE, propertyTypes, countries } from "@/constants";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import SearchModalBtns from "@/components/searchModalBtns/SearchModalBtns";

interface SearchModalProps {
  handleHideModal: () => void;
}

const SearchModal = ({ handleHideModal }: SearchModalProps) => {
  const [step, setStep] = useState(1);

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [propertyType, setPropertyType] = useState(0);
  const [country, setCountry] = useState(0);

  const router = useRouter();

  const responseType = {
    error: "error",
    success: "success",
  };

  const handleBack = () => {
    if (step === 1) return null;

    setStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (step === 3) {
      return handleSearch();
    }

    setStep((prev) => prev + 1);
  };

  const handleSearch = () => {
    if (
      minPrice &&
      maxPrice &&
      propertyType &&
      country &&
      maxPrice > minPrice
    ) {
      const url = `/search?type=${propertyType}&country=${country}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

      router.push(url);
    } else {
      notify("Please fill out all fields", responseType.error);
    }
  };

  const notify = (text, response) => {
    toast[response](text);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {step === 1 && (
          <div className={classes.step_1}>
            <h2 className={classes.title}>Pick your desired price</h2>
            <div className={classes.inputsContainer}>
              <div className={classes.inputWrapper}>
                <label htmlFor="minPrice">Min price</label>
                <input
                  id="minPrice"
                  type="number"
                  value={minPrice}
                  min={MIN_PRICE}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className={classes.inputWrapper}>
                <label htmlFor="maxPrice">Max Price</label>
                <input
                  id="maxPrice"
                  type="number"
                  value={maxPrice}
                  max={MAX_PRICE}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className={classes.step_2}>
            {" "}
            <h2 className={classes.title}>Choose a property type</h2>
            <div className={classes.selectContainer}>
              <select
                className={classes.propertyType}
                onChange={(e) => setPropertyType((prev) => e.target.value)}
                value={propertyType}
              >
                {propertyTypes.map((type, index) => (
                  <option value={index} key={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className={classes.step_3}>
            {" "}
            <h2 className={classes.title}>Pick a country</h2>
            <div className={classes.selectContainer}>
              <select
                className={classes.country}
                value={country}
                onChange={(e) => setCountry((prev) => e.target.value)}
              >
                {countries.map((countryOption, index) => (
                  <option value={index} key={countryOption}>
                    {countryOption}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <SearchModalBtns
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
        />
        <AiOutlineClose
          size={20}
          className={classes.closeIcon}
          onClick={handleHideModal}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SearchModal;
