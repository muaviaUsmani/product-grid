import "./Product.scss";

import { Product } from "../../store/products/reducers";
import React from 'react';

type ProductProps = {
  product: Product;
  editFunc: Function;
  selectFunc: Function;
}

const ProductItem: React.FC<ProductProps> = ({product, editFunc, selectFunc}) => {
  return (
    <div key={product.id} className="col-lg-8 col-sm-12 col-24 mb-4 mt-2 component-product-item" onClick={(e: React.MouseEvent<HTMLDivElement>) => selectFunc(e, product)}>
      <div className="product">
        <div className="image-wrapper">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="px-3 py-2 name">{product.name}</h1>
          <button className="btn btn-outline-primary btn-sm mr-3" onClick={(e: React.MouseEvent<HTMLButtonElement>) => editFunc(e, product)}>Edit</button>
        </div>
        <p className="px-3 mb-1 d-flex justify-content-between align-items-center">
          <span className="price"><b>${product.price}</b></span>
          <span className="badge badge-dark"><b>{product.quantity}</b> pcs.</span>
        </p>
        <p className="px-3 description">
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default ProductItem;