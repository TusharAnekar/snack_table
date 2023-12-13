import { createContext, useContext, useEffect, useReducer } from "react";
import { initialSnack, snackReducer } from "../reducers/snack-reducer";
import { snacksData } from "../db/snacksData";

const SnacksContext = createContext();

const SnacksProvider = ({ children }) => {
  const [snacks, setSnacks] = useReducer(snackReducer, initialSnack);
  const {
    stateSnacks,
    searchInput,
    idSortType,
    productNameSortType,
    productWeightSortType,
    priceSortType,
    caloriesSortType,
    ingredientsSortType,
    tableHeaderName,
  } = snacks;

  useEffect(() => {
    setSnacks({ type: "SET_STATE_SNACKS", payload: snacksData });
  }, []);

  const searchFilteredSnacks = searchInput.length
    ? stateSnacks.filter(
        ({ product_name, ingredients }) =>
          product_name.toLowerCase().includes(searchInput.toLowerCase()) ||
          ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchInput.toLowerCase())
          )
      )
    : stateSnacks;

  const getSortedSnacks = () => {
    switch (tableHeaderName) {
      case "ID":
        return (
          idSortType !== "" &&
          [...searchFilteredSnacks].sort((a, b) =>
            idSortType === "LTH" ? a.id - b.id : b.id - a.id
          )
        );
      case "NAME":
        return (
          productNameSortType !== "" &&
          [...searchFilteredSnacks].sort((a, b) =>
            productNameSortType === "LTH"
              ? a.product_name.localeCompare(b.product_name)
              : b.product_name.localeCompare(a.product_name)
          )
        );
      case "WEIGHT":
        return (
          productWeightSortType !== "" &&
          [...searchFilteredSnacks].sort((a, b) =>
            productWeightSortType === "LTH"
              ? Number(a.product_weight.slice(0, -1)) -
                Number(b.product_weight.slice(0, -1))
              : Number(b.product_weight.slice(0, -1)) -
                Number(a.product_weight.slice(0, -1))
          )
        );
      case "PRICE":
        return (
          priceSortType !== "" &&
          [...searchFilteredSnacks].sort((a, b) =>
            priceSortType === "LTH" ? a.price - b.price : b.price - a.price
          )
        );
      case "CALORIES":
        return (
          caloriesSortType !== "" &&
          [...searchFilteredSnacks].sort((a, b) =>
            caloriesSortType === "LTH"
              ? a.calories - b.calories
              : b.calories - a.calories
          )
        );
      case "INGREDIENTS":
        return (
          ingredientsSortType !== "" &&
          [...searchFilteredSnacks].sort((a, b) =>
            ingredientsSortType === "LTH"
              ? a.ingredients.join("").localeCompare(b.ingredients.join(""))
              : b.ingredients.join("").localeCompare(a.ingredients.join(""))
          )
        );
      default:
        return searchFilteredSnacks;
    }
  };

  const sortedSnacks = getSortedSnacks();

  return (
    <SnacksContext.Provider value={{ snacks, setSnacks, sortedSnacks }}>
      {children}
    </SnacksContext.Provider>
  );
};

const useSnacksContext = () => useContext(SnacksContext);

export { useSnacksContext, SnacksProvider };
