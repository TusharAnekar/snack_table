import { useState } from "react";
import { snacks } from "../db/Snacks";
import "./home.css";
export function Home() {
  const [searchedSnacks, setSearchedSnacks] = useState(snacks);
  const [userSearchedSnack, setUserSearchedSnack] = useState("");

  function handleSearch(e) {
    setUserSearchedSnack(e.target.value);
  }

  function handleSearchBtn() {
    userSearchedSnack.length
      ? setSearchedSnacks(
          searchedSnacks.filter(({ product_name, ingredients }) =>
            product_name.toLowerCase().includes(userSearchedSnack.toLowerCase())
          )
        )
      : setSearchedSnacks(snacks);
  }

  function handleIDSort() {
    setSearchedSnacks([...searchedSnacks].sort((a, b) => b.id - a.id));
  }

  function handleNameSort() {
    setSearchedSnacks(
      [...searchedSnacks].sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      )
    );
  }

  function handleWeightSort() {
    setSearchedSnacks(
      [...searchedSnacks].sort((a, b) =>
        a.product_weight.localeCompare(b.product_weight)
      )
    );
  }

  function handlePriceSort() {
    setSearchedSnacks([...searchedSnacks].sort((a, b) => b.price - a.price));
  }

  function handleCaloriesSort() {
    setSearchedSnacks(
      [...searchedSnacks].sort((a, b) => b.calories - a.calories)
    );
  }

  return (
    <>
      <h1>Snacks</h1>
      <input type="text" onChange={handleSearch} />
      <button onClick={handleSearchBtn}>Search</button>
      <table>
        <tr>
          <th onClick={handleIDSort}>ID</th>
          <th onClick={handleNameSort}>Product Name</th>
          <th onClick={handleWeightSort}>Product Weight</th>
          <th onClick={handlePriceSort}>Price</th>
          <th onClick={handleCaloriesSort}>Calories</th>
          <th>Ingredients</th>
        </tr>

        {searchedSnacks.map(
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
              <td>{ingredients.map((ingredient, index) => <span>{ingredient}{index < ingredients.length - 1 ? "," : ""}</span>)}</td>
            </tr>
          )
        )}
      </table>
    </>
  );
}
