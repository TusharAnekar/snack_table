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

  const idSortedSnacks =
    idSortType !== ""
      ? [...searchFilteredSnacks].sort((a, b) =>
          idSortType === "LTH" ? a.id - b.id : b.id - a.id
        )
      : searchFilteredSnacks;

  const productNameSortedSnacks =
    productNameSortType !== ""
      ? [...idSortedSnacks].sort((a, b) =>
          productNameSortType === "LTH"
            ? a.product_name.localeCompare(b.product_name)
            : b.product_name.localeCompare(a.product_name)
        )
      : idSortedSnacks;

  const productWeightSortedSnacks =
    productWeightSortType !== ""
      ? [...productNameSortedSnacks].sort((a, b) =>
          productWeightSortType === "LTH"
            ? Number(a.product_weight.slice(0, -1)) -
              Number(b.product_weight.slice(0, -1))
            : Number(b.product_weight.slice(0, -1)) -
              Number(a.product_weight.slice(0, -1))
        )
      : productNameSortedSnacks;

  const priceSortedSnacks =
    priceSortType !== ""
      ? [...productWeightSortedSnacks].sort((a, b) =>
          priceSortType === "LTH" ? a.price - b.price : b.price - a.price
        )
      : productWeightSortedSnacks;

  const caloriesSortedSnacks =
    caloriesSortType !== ""
      ? [...priceSortedSnacks].sort((a, b) =>
          caloriesSortType === "LTH"
            ? a.calories - b.calories
            : b.calories - a.calories
        )
      : priceSortedSnacks;

  const ingredientsSortedSnacks =
    ingredientsSortType !== ""
      ? [...caloriesSortedSnacks].sort((a, b) =>
          ingredientsSortType === "LTH"
            ? a.ingredients.join("").localeCompare(b.ingredients.join(""))
            : b.ingredients.join("").localeCompare(a.ingredients.join(""))
        )
      : caloriesSortedSnacks;

  return (
    <SnacksContext.Provider
      value={{ snacks, setSnacks, ingredientsSortedSnacks }}
    >
      {children}
    </SnacksContext.Provider>
  );
};

const useSnacksContext = () => useContext(SnacksContext);

export { useSnacksContext, SnacksProvider };
