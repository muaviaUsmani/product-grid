import "./NewProduct.scss";

import React, { ChangeEvent, FormEvent } from 'react';

import { Product } from "../../store/products/reducers";
import close from '../../assets/icons/close.svg';
import { useState } from "react";

type NewProductProps = {
  toggleModal: Function
};

const NewProduct: React.FC<NewProductProps> = ({toggleModal}) => {
  const [productData, setProductData] = useState<Product>({ id: 1000, name: '', price: 0, quantity: 0, description: '', image: '' });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    event.persist();
    let name = event.target.name;
    let value: number|string = event.target.value;
    if (name === 'price') {
      value = parseFloat(value);
    } else if (name === 'quantity') {
      value = parseInt(value);
    }
    setProductData({...productData, [name]: value});
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(productData)
  }

  return (
    <div className="component-new-product">
      <div className="px-5 py-3 modal">
        <div className="d-flex justify-content-between align-items-center">
          <h1>New Product</h1>
          <img src={close} alt="Close" className="close" width="24" onClick={() => toggleModal(false)} />
        </div>
        <hr />
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="form-group row">
            <div className="col-24">
              <label>Name</label>
              <input type="text" name="name" className="form-control" value={productData.name} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12 col-24">
              <label>Price</label>
              <input type="number" name="price" className="form-control" value={productData.price} onChange={handleInputChange} />
            </div>
            <div className="col-sm-12 col-24">
              <label>Quantity</label>
              <input type="number" name="quantity" className="form-control" value={productData.quantity} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-24">
              <label>Description</label>
              <textarea className="form-control" name="description" rows={3} value={productData.description} onChange={handleInputChange}></textarea>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-24">
              <button className="btn btn-primary btn-block">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;