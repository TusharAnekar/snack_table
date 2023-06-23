import { useState } from "react";
import { snacks } from "../db/Snacks";
import "./home.css";
export function Home() {
  const [searchedSnacks, setSearchedSnacks] = useState(snacks);
  const [userSearchedSnack, setUserSearchedSnack] = useState("");

  function handleSearch(e) {
    setUserSearchedSnack(e.target.value);
  }

  /*||
          ingredients.filter((ingredient) =>
            ingredient.toLowerCase().includes(userSearchedSnack.toLowerCase())
          )*/

  function handlePriceSort() {
    setSearchedSnacks([...searchedSnacks].sort((a, b) => b.price - a.price));
  }

  function handleWeightSort() {
    setSearchedSnacks(
      [...searchedSnacks].sort((a, b) => b.product_weight - a.product_weight)
    );
  }

  function handleCaloriesSort() {
    setSearchedSnacks(
      [...searchedSnacks].sort((a, b) => b.calories - a.calories)
    );
  }

  function handleIDSort() {
    setSearchedSnacks([...searchedSnacks].sort((a, b) => b.id - a.id));
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

  function handleNameSort () {
    setSearchedSnacks([...searchedSnacks].sort())
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
          <th onClick={ handleWeightSort}>Product Weight</th>
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
              <td>{ingredients.map((ingredient) => ingredient)}</td>
            </tr>
          )
        )}
      </table>
    </>
  );
}
