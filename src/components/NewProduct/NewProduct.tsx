import "./NewProduct.scss";
import 'react-dropzone-uploader/dist/styles.css';

import Dropzone, { IFileWithMeta, StatusValue } from 'react-dropzone-uploader';
import React, { ChangeEvent, FormEvent } from 'react';

import { Product } from "../../store/products/reducers";
import close from '../../assets/icons/close.svg';
import firebaseStorage from '../../shared/firebase';
import { useEffect } from "react";
import { useState } from "react";

type NewProductProps = {
  toggleModal: Function,
  store: Function,
  editableProduct: Product
};

const NewProduct: React.FC<NewProductProps> = ({editableProduct, toggleModal, store}) => {
  const [productData, setProductData] = useState<Product>({ id: -1, name: '', price: 0, quantity: 0, description: '', image: '' });
  const [imageUploading, setImageUploading] = useState(false);
  const [showImageError, setShowImageError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (editableProduct && editableProduct.id > -1) {
      setProductData({...editableProduct});
    }
  }, [editableProduct]);

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
    if (!productData.image) {
      setShowImageError(true);
    } else {
      setShowImageError(false);
      setButtonDisabled(true);
      const callback = () => {
        setButtonDisabled(false);
        toggleModal(false);
      }
      store(productData, callback);
    }
  }

  const deleteImage = () => {
    setProductData({ ...productData, image: '' });
  }

  const handleFileChange = (file: IFileWithMeta, status: StatusValue) => {
    if (status === 'done') {
      setImageUploading(true);

      let fileObject = file.file;
      let storageRef = firebaseStorage.ref().child(fileObject.name);
      storageRef.put(file.file).then((snapshot: any) => {
        snapshot.ref.getDownloadURL().then((image: any) => {
          setProductData({ ...productData, image });
          setImageUploading(false);
        })
      })
    }
  }

  return (
    <div className="component-new-product">
      <div className="px-5 py-3 modal">
        <div className="d-flex justify-content-between align-items-center">
          <h1>{ productData.id === -1 ? 'New Product' : productData.name }</h1>
          <img src={close} alt="Close" className="close" width="24" onClick={() => toggleModal(false)} />
        </div>
        <hr />
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="form-group row">
            <div className="col-24">
              {
                productData.image ?
                <div className="d-flex flex-column justify-content-center align-items-center image-preview">
                  <img src={productData.image} alt={productData.name} width="200" />
                  <button className="btn btn-danger mt-2" onClick={deleteImage}>Delete Image</button>
                </div> :
                <Dropzone
                  onChangeStatus={handleFileChange}
                  maxFiles={1}
                  multiple={false}
                  inputContent="Select an Image"
                  styles={{
                    dropzone: {borderWidth: '1px'}
                  }} />
              }
              {
                showImageError ?
                <div className="alert alert-danger mt-2 mb-1" role="alert">
                  An image is required.
                </div> : <></>
              }
              {
                imageUploading ?
                <div className="alert alert-info mt-2 mb-1" role="alert">
                  Uploading image...
                </div> : <></>
              }
            </div>
          </div>
          <div className="form-group row">
            <div className="col-24">
              <label>Name</label>
              <input type="text" name="name" required className="form-control" value={productData.name} disabled={imageUploading} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12 col-24">
              <label>Price</label>
              <input type="number" name="price" min="0.99" required className="form-control" value={productData.price} disabled={imageUploading} onChange={handleInputChange} />
            </div>
            <div className="col-sm-12 col-24">
              <label>Quantity</label>
              <input type="number" name="quantity" min="1" required className="form-control" value={productData.quantity} disabled={imageUploading} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-24">
              <label>Description</label>
              <textarea className="form-control" required name="description" rows={3} value={productData.description} disabled={imageUploading} onChange={handleInputChange}></textarea>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-24">
              <button className="btn btn-primary btn-block" disabled={buttonDisabled || imageUploading}>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;