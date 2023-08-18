import { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvilableMeals from "./AvailableMeals";
const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvilableMeals />
    </Fragment>
  );
};

export default Meals;
