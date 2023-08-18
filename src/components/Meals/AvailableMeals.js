import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvilableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAvailableMeals = async () => {
      try {
        const response = await fetch(
          "https://food-order-app-905f2-default-rtdb.firebaseio.com/melas.json"
        );
        const data = await response.json();

        const responseMeals = [];
        for (const meal in data) {
          responseMeals.push({
            id: meal,
            description: data[meal].description,
            name: data[meal].name,
            price: data[meal].price,
          });
        }

        setAvailableMeals(responseMeals);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchAvailableMeals();
  }, [availableMeals]);

  if (isLoading) {
    return (
      <section className={classes.MealsIsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.ErrorMessage}>
        <p>Error...</p>
      </section>
    );
  }

  const mealsList = availableMeals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvilableMeals;
