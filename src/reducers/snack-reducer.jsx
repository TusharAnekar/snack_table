const initialSnack = {
  stateSnacks: [],
  searchInput: "",
  idSortType: "",
  productNameSortType: "",
  productWeightSortType: "",
  priceSortType: "",
  caloriesSortType: "",
  ingredientsSortType: "",
  tableHeaderName: "",
};

const snackReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_STATE_SNACKS":
      return { ...state, stateSnacks: payload };
    case "SET_SEARCH_INPUT":
      return { ...state, searchInput: payload };
    case "UPDATE_ID_SORT_TYPE":
      return {
        ...state,
        idSortType:
          state.idSortType === ""
            ? "LTH"
            : state.idSortType === "LTH"
            ? "HTL"
            : "LTH",
      };

    case "UPDATE_PRODUCT_NAME_SORT_TYPE":
      return {
        ...state,
        productNameSortType:
          state.productNameSortType === ""
            ? "LTH"
            : state.productNameSortType === "LTH"
            ? "HTL"
            : "LTH",
      };

    case "UPDATE_PRODUCT_WEIGHT_SORT_TYPE":
      return {
        ...state,
        productWeightSortType:
          state.productWeightSortType === ""
            ? "LTH"
            : state.productWeightSortType === "LTH"
            ? "HTL"
            : "LTH",
      };

    case "UPDATE_PRICE_SORT_TYPE":
      return {
        ...state,
        priceSortType:
          state.priceSortType === ""
            ? "LTH"
            : state.priceSortType === "LTH"
            ? "HTL"
            : "LTH",
      };

    case "UPDATE_CALORIES_SORT_TYPE":
      return {
        ...state,
        caloriesSortType:
          state.caloriesSortType === ""
            ? "LTH"
            : state.caloriesSortType === "LTH"
            ? "HTL"
            : "LTH",
      };

    case "UPDATE_INGREDIENTS_SORT_TYPE":
      return {
        ...state,
        ingredientsSortType:
          state.ingredientsSortType === ""
            ? "LTH"
            : state.ingredientsSortType === "LTH"
            ? "HTL"
            : "LTH",
      };
    case "SET_TABLE_HEADER_NAME":
      return { ...state, tableHeaderName: payload };

    default:
      return state;
  }
};

export { initialSnack, snackReducer };
