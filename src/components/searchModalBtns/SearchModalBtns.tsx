import React from "react";
import classes from "./searchModalBtns.module.css";

interface SearchModalBtnProps {
  step: number;
  handleBack: () => void;
  handleNext: () => void;
}

const SearchModalBtns = ({
  step,
  handleBack,
  handleNext,
}: SearchModalBtnProps) => {
  const isFirstStep = step === 1;

  const getNextBtnLabel = () => {
    if (step !== 3) {
      return "Next";
    }

    if (step === 3) {
      return "Search";
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <button
          className={classes.backBtn}
          onClick={handleBack}
          disabled={isFirstStep}
        >
          Back
        </button>
        <button className={classes.nextBtn} onClick={handleNext}>
          {getNextBtnLabel()}
        </button>
      </div>
    </div>
  );
};

export default SearchModalBtns;
