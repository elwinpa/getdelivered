// AddProduct.js
import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { addProductSubmit } from '../redux/actions';
import { editProductSubmit } from '../redux/actions';

const AddProduct = ({ onClose, addProductSubmit, category, editProduct, editProductSubmit }) => {
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    image: null,
    price: ''
  });

  useEffect(() => {
    if(Object.keys(editProduct).length !== 0) {
      const newFormData = {
        
          "productName": editProduct.productName,
          "productDescription": editProduct.productDescription,
          "price": editProduct.price
        
      }
      
      setFormData(newFormData);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: selectedImage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(Object.keys(editProduct).length !== 0) {
      if(formData.image) {
        const formImageToSend = new FormData();
        formImageToSend.append('image', formData.image);
        const formInfoToSend = {
          "productId": editProduct._id,
          "productName": formData.productName,
          "price": formData.price,
          "productDescription": formData.productDescription,
          "category": category
        }
        editProductSubmit(formInfoToSend, formImageToSend);
      } else {

        const formInfoToSend = {
          "productId": editProduct._id,
          "productName": formData.productName,
          "price": formData.price,
          "productDescription": formData.productDescription,
          "category": category,
          "image": editProduct.image
        }
        editProductSubmit(formInfoToSend,null);

      }  
    } else {
      const formImageToSend = new FormData();
      formImageToSend.append('image', formData.image);
      const formInfoToSend = {
          "productName": formData.productName,
          "price": formData.price,
          "productDescription": formData.productDescription,
          "category": category
      }
      addProductSubmit(formInfoToSend, formImageToSend);
    }
    onClose();
    
  };

  return (
    <div className="add-product-overlay">
    <div className="overlay-container">
      <div className="form-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </label>
          <label>
            Product Description:
            <input
              type="text"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>
         
          <label>
                Select Image:
                <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                />
          </label>
          {editProduct && editProduct.image &&
            <img src={`/assets/${editProduct.image}`} alt={editProduct.productName} className="product-image" />
          }
          <div className="button-container">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
    addProductSubmit: (formInfoToSend, formImageToSend) => dispatch(addProductSubmit(formInfoToSend, formImageToSend)),
    editProductSubmit: (formInfoToSend, formImageToSend) => dispatch(editProductSubmit(formInfoToSend, formImageToSend)),
  });
  
export default connect(null, mapDispatchToProps)(AddProduct);

