import "./Products.scss";

import { ChangeEvent, useEffect } from "react";
import { ConnectedProps, connect } from 'react-redux';

import { Product } from "../../store/products/reducers";
import React from 'react';
import grid from '../../assets/icons/grid.svg';
import rows from '../../assets/icons/rows.svg';
import { sortProducts } from "../../store/products/actions";
import { useState } from "react";

const orderOptions = [
  { label: 'Name: Ascending', value: 'name:asc'},
  { label: 'Name: Descending', value: 'name:desc'},
  { label: 'Price: High to Low', value: 'price:desc'},
  { label: 'Price: Low to High', value: 'price:asc'},
  { label: 'Quantity: High to Low', value: 'quantity:desc'},
  { label: 'Quantity: Low to High', value: 'quantity:asc'},
];
const GRID_VEIW = 'grid';
const ROWS_VIEW = 'rows';

const Products: React.FC<PropsFromRedux> = ({products, loading, sortProducts}) => {
  const [order, setOrder] = useState(orderOptions[0].value);
  const [view, setView] = useState(GRID_VEIW);

  useEffect(() => {
    //TODO
  }, [order]);

  useEffect(() => {
    console.log(products, loading)
  }, [products, loading])

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
          <button type="button" className="btn btn-primary">+ New Product</button>
        </div>
      </div>
      <div className="row options">
        <div className="col-24 d-flex align-items-center justify-content-between">
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className={`btn btn-light ${view === GRID_VEIW ? 'active' : ''}`}>
              <input type="radio" name="options" checked={view === GRID_VEIW} onChange={() => setView(GRID_VEIW)} /> 
              <img src={grid} alt="Grid" width="32" />
            </label>
            <label className={`btn btn-light ${view === ROWS_VIEW ? 'active' : ''}`}>
              <input type="radio" name="options" checked={view === ROWS_VIEW} onChange={() => setView(ROWS_VIEW)} /> 
              <img src={rows} alt="Rows" width="24" />
            </label>
          </div>
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
      <div className="row product-wrapper mt-5">
        {
          products.map((product: Product) => (
            <div key={product.id} className="col-sm-12 mb-3 border">
              <div className="image-wrapper">
                {/* <img src={product.image} alt={product.name} /> */}
              </div>
            </div>
          ))
        }
      </div>
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