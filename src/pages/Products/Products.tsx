import "./Products.scss";

import { ChangeEvent, useEffect } from "react";
import { ConnectedProps, connect } from 'react-redux';

import NewProduct from "../../components/NewProduct/NewProduct";
import { Product } from "../../store/products/reducers";
import ProductItem from "../../components/Product/Product";
import React from 'react';
// import firebase from '../../shared/firebase';
import { sortProducts } from "../../store/products/actions";
import { useState } from "react";

// const firebaseStorage = firebase.app().storage()

const orderOptions = [
  { label: 'Name: Ascending', value: 'name:asc'},
  { label: 'Name: Descending', value: 'name:desc'},
  { label: 'Price: High to Low', value: 'price:desc'},
  { label: 'Price: Low to High', value: 'price:asc'},
  { label: 'Quantity: High to Low', value: 'quantity:desc'},
  { label: 'Quantity: Low to High', value: 'quantity:asc'},
];

const Products: React.FC<PropsFromRedux> = ({products, loading, sortProducts}) => {
  const [order, setOrder] = useState(orderOptions[0].value);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    //TODO
  }, [order]);

  useEffect(() => {
    console.log(products, loading)
  }, [products, loading]);

  useEffect(() => {
    console.log(showModal)
  }, [showModal])

  const sortItems = (e: ChangeEvent<HTMLSelectElement>) => {
    e.persist();
    setOrder(e.target.value);
    sortProducts(e.target.value);
  }

  return (
    <div className="page-products container">
      <div className="row page-header d-flex align-items-center justify-content-between">
        <div className="col-sm-12 col-24">
          <h1>Products</h1>
        </div>
        <div className="col-sm-12 col-24 d-flex justify-content-end">
          <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Product</button>
        </div>
      </div>
      <div className="row options">
        <div className="mt-4 col-24 d-flex align-items-center justify-content-end">
          <div className="input-group sort-wrap">
            <div className="input-group-prepend">
              <label className="input-group-text">Sort</label>
            </div>
            <select className="custom-select" value={order} onChange={sortItems}>
              {
                orderOptions.map((oo, ind) => <option key={ind} value={oo.value}>{oo.label}</option>)
              }
            </select>
          </div>
        </div>
      </div>
      <div className="row product-wrapper mt-3">
        {
          products.map((product: Product) => (
            <ProductItem product={product} key={product.id} />
          ))
        }
      </div>

      {
        showModal ? <NewProduct toggleModal={setShowModal} /> : <></>
      }
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  products: state.products.products,
  loading: state.products.loading
});

const mapDispatchToProps = {
  sortProducts
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Products);