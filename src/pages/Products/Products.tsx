import "./Products.scss";

import { ChangeEvent, useEffect } from "react";
import { ConnectedProps, connect } from 'react-redux';
import { saveProduct, sortProducts } from "../../store/products/actions";

import NewProduct from "../../components/NewProduct/NewProduct";
import { Product } from "../../store/products/reducers";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import ProductItem from "../../components/Product/Product";
import React from 'react';
import { useState } from "react";

const orderOptions = [
  { label: 'Name: Ascending', value: 'name:asc'},
  { label: 'Name: Descending', value: 'name:desc'},
  { label: 'Price: High to Low', value: 'price:desc'},
  { label: 'Price: Low to High', value: 'price:asc'},
  { label: 'Quantity: High to Low', value: 'quantity:desc'},
  { label: 'Quantity: Low to High', value: 'quantity:asc'},
];

const Products: React.FC<PropsFromRedux> = ({products, loading, sortProducts, saveProduct}) => {
  const [order, setOrder] = useState(orderOptions[0].value);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editableProduct, setEditableProduct] = useState<Product>({ id: -1, name: '', price: 0, quantity: 0, description: '', image: '' });
  const [selectedProduct, setSelectedProduct] = useState<Product>({ id: -1, name: '', price: 0, quantity: 0, description: '', image: '' });

  useEffect(() => {
    //TODO
  }, [order]);

  const sortItems = (e: ChangeEvent<HTMLSelectElement>) => {
    e.persist();
    setOrder(e.target.value);
    sortProducts(e.target.value);
  }

  const editProduct = (product: Product) => {
    setShowModal(true);
    setEditableProduct(product);
  };

  const showProduct = (product: Product) => {
    setShowDetailsModal(true);
    setSelectedProduct(product);
  };

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
            <ProductItem product={product} key={product.id} editFunc={editProduct} selectFunc={showProduct} />
          ))
        }
      </div>

      {
        showModal ? <NewProduct toggleModal={setShowModal} store={saveProduct} editableProduct={editableProduct} /> : <></>
      }

      {
        showDetailsModal ? <ProductDetails toggleModal={setShowDetailsModal} product={selectedProduct} /> : <></>
      }
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  products: state.products.products,
  loading: state.products.loading
});

const mapDispatchToProps = {
  sortProducts,
  saveProduct
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Products);