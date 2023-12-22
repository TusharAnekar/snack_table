import "./App.css";
import { useSnacksContext } from "./contexts/snacks-context";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function App() {
  const {
    snacks: {
      idSortType,
      productNameSortType,
      productWeightSortType,
      priceSortType,
      caloriesSortType,
      ingredientsSortType,
    },
    setSnacks,
    sortedSnacks,
  } = useSnacksContext();

  const handleInput = (e) => {
    setSnacks({ type: "SET_SEARCH_INPUT", payload: e.target.value });
  };

  const handleId = (e) => {
    setSnacks({ type: "UPDATE_ID_SORT_TYPE" });
    setSnacks({ type: "SET_TABLE_HEADER_NAME", payload: "ID" });
  };

  const handleName = (e) => {
    setSnacks({ type: "UPDATE_PRODUCT_NAME_SORT_TYPE" });
    setSnacks({ type: "SET_TABLE_HEADER_NAME", payload: "NAME" });
  };

  const handleWeight = (e) => {
    setSnacks({ type: "UPDATE_PRODUCT_WEIGHT_SORT_TYPE" });
    setSnacks({ type: "SET_TABLE_HEADER_NAME", payload: "WEIGHT" });
  };

  const handlePrice = (e) => {
    setSnacks({ type: "UPDATE_PRICE_SORT_TYPE" });
    setSnacks({ type: "SET_TABLE_HEADER_NAME", payload: "PRICE" });
  };

  const handleCalories = (e) => {
    setSnacks({ type: "UPDATE_CALORIES_SORT_TYPE" });
    setSnacks({ type: "SET_TABLE_HEADER_NAME", payload: "CALORIES" });
  };

  const handleIngredients = (e) => {
    setSnacks({ type: "UPDATE_INGREDIENTS_SORT_TYPE" });
    setSnacks({ type: "SET_TABLE_HEADER_NAME", payload: "INGREDIENTS" });
  };

  return (
    <div className="App">
      <h1>Snacks</h1>

      <input type="text" placeholder="search snacks" onChange={handleInput} />

      <table>
        <tbody>
          <tr>
            <th onClick={handleId}>
              <div className="table-header-content">
                ID{" "}
                {idSortType === "LTH" ? (
                  <ArrowDropDownIcon />
                ) : idSortType === "HTL" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <div className="up-down-arrow-container">
                    <ArrowDropUpIcon />
                    <ArrowDropDownIcon />
                  </div>
                )}
              </div>
            </th>
            <th onClick={handleName}>
              <div className="table-header-content">
                Product Name{" "}
                {productNameSortType === "LTH" ? (
                  <ArrowDropDownIcon />
                ) : productNameSortType === "HTL" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <div className="up-down-arrow-container">
                    <ArrowDropUpIcon />
                    <ArrowDropDownIcon />
                  </div>
                )}
              </div>
            </th>
            <th onClick={handleWeight}>
              <div className="table-header-content">
                Product Weight{" "}
                {productWeightSortType === "LTH" ? (
                  <ArrowDropDownIcon />
                ) : productWeightSortType === "HTL" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <div className="up-down-arrow-container">
                    <ArrowDropUpIcon />
                    <ArrowDropDownIcon />
                  </div>
                )}
              </div>
            </th>
            <th onClick={handlePrice}>
              <div className="table-header-content">
                Price{" "}
                {priceSortType === "LTH" ? (
                  <ArrowDropDownIcon />
                ) : priceSortType === "HTL" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <div className="up-down-arrow-container">
                    <ArrowDropUpIcon />
                    <ArrowDropDownIcon />
                  </div>
                )}
              </div>
            </th>
            <th onClick={handleCalories}>
              <div className="table-header-content">
                Calories{" "}
                {caloriesSortType === "LTH" ? (
                  <ArrowDropDownIcon />
                ) : caloriesSortType === "HTL" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <div className="up-down-arrow-container">
                    <ArrowDropUpIcon />
                    <ArrowDropDownIcon />
                  </div>
                )}
              </div>
            </th>
            <th className="th_ingredients" onClick={handleIngredients}>
              <div className="table-header-content">
                Ingredients{" "}
                {ingredientsSortType === "LTH" ? (
                  <ArrowDropDownIcon />
                ) : ingredientsSortType === "HTL" ? (
                  <ArrowDropUpIcon />
                ) : (
                  <div className="up-down-arrow-container">
                    <ArrowDropUpIcon />
                    <ArrowDropDownIcon />
                  </div>
                )}
              </div>
            </th>
          </tr>

          {sortedSnacks?.map(
            ({
              id,
              product_name,
              product_weight,
              price,
              calories,
              ingredients,
            }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{product_name}</td>
                <td>{product_weight}</td>
                <td>{price}</td>
                <td>{calories}</td>
                <td>
                  {ingredients.map((ingredient, index) => (
                    <span key={`${id}${index}`}>
                      {ingredient}
                      {index < ingredients.length - 1 ? "," : ""}
                    </span>
                  ))}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
