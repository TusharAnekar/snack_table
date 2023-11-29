import { useState } from "react";

import { snacks } from "../db/snacks";
import "./home.css";

export function Home() {
  const [updatedSnacks, setUpdatedSnacks] = useState(snacks);
  const [userSearchedSnack, setUserSearchedSnack] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  function handleSearch(e) {
    setUserSearchedSnack(e.target.value);
  }

  const searchedSnacks = userSearchedSnack.length
    ? updatedSnacks.filter(({ product_name }) =>
        product_name.toLowerCase().includes(userSearchedSnack.toLowerCase())
      )
    : updatedSnacks;

  function handleIDSort() {
    if (isClicked) {
      setIsClicked(false);
      setUpdatedSnacks([...updatedSnacks].sort((a, b) => a.id - b.id));
    } else {
      setIsClicked(true);
      setUpdatedSnacks([...updatedSnacks].sort((a, b) => b.id - a.id));
    }
  }

  function handleNameSort() {
    if (isClicked) {
      setIsClicked(false);
      setUpdatedSnacks(
        [...updatedSnacks].sort((a, b) =>
          a.product_name.localeCompare(b.product_name)
        )
      );
    } else {
      setIsClicked(true);
      setUpdatedSnacks(
        [...updatedSnacks].sort((a, b) =>
          b.product_name.localeCompare(a.product_name)
        )
      );
    }
  }

  function handleWeightSort() {
    if (isClicked) {
      setIsClicked(false);
      setUpdatedSnacks(
        [...updatedSnacks].sort((a, b) =>
          a.product_weight.localeCompare(b.product_weight)
        )
      );
    } else {
      setIsClicked(true);
      setUpdatedSnacks(
        [...updatedSnacks].sort((a, b) =>
          b.product_weight.localeCompare(a.product_weight)
        )
      );
    }
  }

  function handlePriceSort() {
    if (isClicked) {
      setIsClicked(false);
      setUpdatedSnacks([...updatedSnacks].sort((a, b) => a.price - b.price));
    } else {
      setIsClicked(true);
      setUpdatedSnacks([...updatedSnacks].sort((a, b) => b.price - a.price));
    }
  }

  function handleCaloriesSort() {
    if (isClicked) {
      setIsClicked(false);
      setUpdatedSnacks(
        [...updatedSnacks].sort((a, b) => a.calories - b.calories)
      );
    } else {
      setIsClicked(true);
      setUpdatedSnacks(
        [...updatedSnacks].sort((a, b) => b.calories - a.calories)
      );
    }
  }

  return (
    <div className="table_container">
      <h1>Snacks</h1>
      <input type="text" placeholder="search snacks" onChange={handleSearch} />
      <table>
        <tbody>
          <tr>
            <th value="id" onClick={handleIDSort}>
              ID
            </th>
            <th onClick={handleNameSort}>Product Name</th>
            <th onClick={handleWeightSort}>Product Weight</th>
            <th onClick={handlePriceSort}>Price</th>
            <th onClick={handleCaloriesSort}>Calories</th>
            <th className="th_ingredients">Ingredients</th>
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
    </div>
  );
}
