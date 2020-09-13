import { Product, actionTypes } from "./reducers";
import { loadItem, storeItem } from "../helpers";

import productData from "../../mock/products.json";

export const setLoading = (loading: boolean) => (dispatch: Function) => {
  dispatch({ type: actionTypes.SET_LOADING, payload: loading });
}

export const setProducts = (products: Product[]) => (dispatch: Function) => {
  dispatch({ type: actionTypes.SET_PRODUCTS, payload: products });
}

export const sortProducts = (filter: string, products=[]) => (dispatch: Function, getState: Function) => {
  let tempProducts: Product[] = [...products];
  
  if (!products.length) {
    let { products } = getState();
    tempProducts = [...products.products];
  }

  switch (filter) {
    case 'name:asc':
      tempProducts.sort((a, b) => a.name > b.name ? 1 : -1);
      break;
    case 'name:desc':
      tempProducts.sort((a, b) => a.name < b.name ? 1 : -1);
      break;
    case 'price:asc':
      tempProducts.sort((a, b) => a.price > b.price ? 1 : -1);
      break;
    case 'price:desc':
      tempProducts.sort((a, b) => a.price < b.price ? 1 : -1);
      break;
    case 'quantity:asc':
      tempProducts.sort((a, b) => a.quantity > b.quantity ? 1 : -1);
      break;
    case 'quantity:desc':
      tempProducts.sort((a, b) => a.quantity < b.quantity ? 1 : -1);
      break;
    default:
      break;
  }
  dispatch({ type: actionTypes.SET_PRODUCTS, payload: tempProducts });
}

export const loadProducts = (callback: Function) => (dispatch: Function) => {
  let storedProducts = loadItem('products');
  if (!storedProducts || (storedProducts && !storedProducts.length)) {
    storedProducts = productData;
    storeItem('products', storedProducts);
  }
  callback();
  dispatch(sortProducts('name:asc', storedProducts));
}

export const saveProduct = (product: Product, callback: Function) => (dispatch: Function, getState: Function) => {
  let { products } = getState();
  let tempProducts;
  if (product.id === -1) {
    product.id = products.products.length;
    tempProducts = [product, ...products.products];
  } else {
    tempProducts = [...products.products];
    let updatedIndex = tempProducts.findIndex((tp: Product) => tp.id === product.id);
    tempProducts[updatedIndex] = product;
  }
  storeItem('products', tempProducts);
  dispatch({ type: actionTypes.SET_PRODUCTS, payload: tempProducts });
  callback();
}