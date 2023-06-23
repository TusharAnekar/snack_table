import { useState } from "react";
import { snacks } from "../db/Snacks";
import "./home.css";
export function Home() {
  const [updatedSnacks, setUpdatedSnacks] = useState(snacks);
  const [userSearchedSnack, setUserSearchedSnack] = useState("");

  function handleSearch(e) {
    setUserSearchedSnack(e.target.value);
  }

  const searchedSnacks = userSearchedSnack.length
    ? updatedSnacks.filter(({ product_name }) =>
        product_name.toLowerCase().includes(userSearchedSnack.toLowerCase())
      )
    : updatedSnacks;

  function handleIDSort() {
    setUpdatedSnacks([...updatedSnacks].sort((a, b) => b.id - a.id));
  }

  function handleNameSort() {
    setUpdatedSnacks(
      [...updatedSnacks].sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      )
    );
  }

  function handleWeightSort() {
    setUpdatedSnacks(
      [...updatedSnacks].sort((a, b) =>
        a.product_weight.localeCompare(b.product_weight)
      )
    );
  }

  function handlePriceSort() {
    setUpdatedSnacks([...updatedSnacks].sort((a, b) => b.price - a.price));
  }

  function handleCaloriesSort() {
    setUpdatedSnacks(
      [...updatedSnacks].sort((a, b) => b.calories - a.calories)
    );
  }

  return (
    <>
      <h1>Snacks</h1>
      <input type="text" onChange={handleSearch} />
      <table>
        <tbody>
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
    </>
  );
}
