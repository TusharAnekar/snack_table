import { createContext, useContext, useReducer } from "react";
import { initialSnack, snackReducer } from "../reducers/snack-reducer";

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
  } = snacks;

  const filteredSnacks = searchInput.length
    ? stateSnacks.filter(
        ({ product_name, ingredients }) =>
          product_name.toLowerCase().includes(searchInput.toLowerCase()) ||
          ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchInput.toLowerCase())
          )
      )
    : idSortType !== ""
    ? [...stateSnacks].sort((a, b) =>
        idSortType === "LTH" ? a.id - b.id : b.id - a.id
      )
    : productNameSortType !== ""
    ? [...stateSnacks].sort((a, b) =>
        productNameSortType === "LTH"
          ? a.product_name.localeCompare(b.product_name)
          : b.product_name.localeCompare(a.product_name)
      )
    : productWeightSortType !== ""
    ? [...stateSnacks].sort((a, b) =>
        productWeightSortType === "LTH"
          ? Number(a.product_weight.slice(0, -1)) -
            Number(b.product_weight.slice(0, -1))
          : Number(b.product_weight.slice(0, -1)) -
            Number(a.product_weight.slice(0, -1))
      )
    : priceSortType !== ""
    ? [...stateSnacks].sort((a, b) =>
        priceSortType === "LTH" ? a.price - b.price : b.price - a.price
      )
    : caloriesSortType !== ""
    ? [...stateSnacks].sort((a, b) =>
        caloriesSortType === "LTH"
          ? a.calories - b.calories
          : b.calories - a.calories
      )
    : ingredientsSortType !== ""
    ? [...stateSnacks].sort((a, b) =>
        ingredientsSortType === "LTH"
          ? a.ingredients.join("").localeCompare(b.ingredients.join(""))
          : b.ingredients.join("").localeCompare(a.ingredients.join(""))
      )
    : stateSnacks;

  return (
    <SnacksContext.Provider value={{ snacks, setSnacks, filteredSnacks }}>
      {children}
    </SnacksContext.Provider>
  );
};

const useSnacksContext = () => useContext(SnacksContext);

export { useSnacksContext, SnacksProvider };
