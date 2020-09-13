import "./Product.scss";

import { Product } from "../../store/products/reducers";
import React from 'react';

type ProductProps = {
  product: Product;
}

const ProductItem: React.FC<ProductProps> = ({product}) => {
  return (
    <div key={product.id} className="col-lg-8 col-sm-12 col-24 mb-4 mt-2 component-product-item">
      <div className="product">
        <div className="image-wrapper">
          <img src={product.image} alt={product.name} />
        </div>
        <h1 className="px-3 py-2 name">{product.name}</h1>
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