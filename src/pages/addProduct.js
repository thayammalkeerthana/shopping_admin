import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getCategoryData } from '../redux/action';

const AddProduct = (props) => {
  const [formData, setFormData] = useState({
    productimage: '',
    productname: '',
    category: '',
    amount: '',
  });

  const [formErrors, setFormErrors] = useState({
    productimage: '',
    productname: '',
    category: '',
    amount: '',
  });
  
  const categoryData=useSelector(state=>state.categoryData)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getCategoryData())
  },[])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: '', // Clear previous error when user starts typing
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    let errors = {};
    let formIsValid = true;

    // URL Validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!formData.productimage.trim() || !urlRegex.test(formData.productimage.trim())) {
      errors.productimage = 'Enter a valid URL';
      formIsValid = false;
    }

    // Name Validation
    const nameRegex = /^[a-zA-Z ]*$/;
    if (!formData.productname.trim() || !nameRegex.test(formData.productname.trim())) {
      errors.productname = 'Only letters are allowed in the name';
      formIsValid = false;
    }

    // Category Validation (Check if a category is selected)
    if (!formData.category.trim()) {
      errors.category = 'Category is required';
      formIsValid = false;
    }

    // Amount Validation (Check if only numbers are entered)
    const amountRegex = /^[0-9]*$/;
    if (!formData?.amount?.trim() || !amountRegex.test(formData?.amount?.trim())) {
      errors.amount = 'Only numbers are allowed in the amount';
      formIsValid = false;
    }

    // Check if any field is empty
    for (const key in formData) {
      if (!formData[key].trim()) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        formIsValid = false;
      }
    }

    if (formIsValid) {
      // Submit the form data or perform further actions
      console.log('Form is valid. Submitting data:', formData);
    } else {
      // Update state with errors to trigger re-render and display error messages
      setFormErrors(errors);
    }
    console.log("formDAta",typeof(formData.amount))
    ;
    const randomId = Math.floor(Math.random() * 1000000) + 1; // Adjust the range as needed

    const data={
      "productid":randomId ,
      "productname":formData.productname,
      "imageurl":formData.productimage,
      "categoryid":formData.category,
      "price":`$${formData.amount}`
      }
      console.log("data",data);
      dispatch(addProduct(data,props))
  };

  return (
    <div className='d-flex justify-content-center my-3'>
      <form
        onSubmit={handleSubmit}
        className='p-4'
        style={{
          backgroundColor: '#F5F5F5',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
          width: '50%',
        }}
      >
        <h4 className='text-center'>Add Product Form</h4>

        <div className='mb-3'>
          <label htmlFor='formImage' className='form-label'>
            Profile Image URL
          </label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter image URL'
            name='productimage'
            value={formData.productimage}
            onChange={handleChange}
          />
          <div className='text-danger'>{formErrors.image}</div>
        </div>

        <div className='mb-3'>
          <label htmlFor='formUsername' className='form-label'>
            Product Name
          </label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter productname'
            name='productname'
            value={formData.productname}
            onChange={handleChange}
          />
          <div className='text-danger'>{formErrors.productname}</div>
        </div>

        <div className='mb-3'>
          <label htmlFor='formCategory' className='form-label'>
            Category
          </label>
          <select
            className='form-select'
            id='formCategory'
            name='category'
            value={formData.category}
            onChange={handleChange}
          >
            <option value=''>Select Category</option>
            {
              categoryData.map(item=><option value={item?.categoryid}>{item?.categoryname}</option>)
            }
          </select>
          <div className='text-danger'>{formErrors.category}</div>
        </div>

        <div className='mb-3'>
          <label htmlFor='formPhone' className='form-label text-center'>
            Amount
          </label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter amount'
            name='amount'
            value={formData.amount}
            onChange={handleChange}
          />
          <div className='text-danger'>{formErrors.amount}</div>
        </div>
        <div className='d-flex justify-content-center'>
          <button type='submit' className='btn btn-primary'>
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
