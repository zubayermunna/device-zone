// productActions.js
export const selectProductToEdit = (productData) => ({
  type: "SELECT_PRODUCT_TO_EDIT",
  payload: productData,
});
export const ProductDetails = (productData) => ({
  type: "SELECT_PRODUCT_DETAIL",
  payload: productData,
});