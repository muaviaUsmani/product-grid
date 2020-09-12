export enum actionTypes {
  SET_LOADING = 'SET_LOADING',
  SET_PRODUCTS = 'SET_PRODUCTS'
};

export type Product = {
  id: number,
  name: string,
  description: string,
  price: number,
  quantity: number,
  image: string
};

export type ProductState = {
  loading: boolean,
  products: Product[]
};

const initialState: ProductState = {
  loading: false,
  products: []
};

const products = (state=initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload };
    default: 
      return { ...state };
  }
}

export default products;