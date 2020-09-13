import "./ProductDetails.scss";

import { Product } from "../../store/products/reducers";
import React from 'react';
import close from '../../assets/icons/close.svg';

type ProductDetailsProps = {
  toggleModal: Function,
  product: Product
};

const ProductDetails: React.FC<ProductDetailsProps> = ({product, toggleModal}) => {

  return (
    <div className="component-new-product">
      <div className="px-5 py-3 pb-5 modal">
        <div className="d-flex justify-content-between align-items-center">
          <h1>{ product.name }</h1>
          <img src={close} alt="Close" className="close" width="24" onClick={() => toggleModal(false)} />
        </div>
        <hr />
        <div className="d-flex justify-content-start align-items-start">
          <img src={product.image} alt={product.name} width="225" />
          <div className="pl-3">
            <p className="mb-1">Price: <b>${product.price}</b></p>
            <p>Quantity: <b>{product.quantity}pcs.</b></p>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;