import React, { useState } from 'react';
import { register } from '../redux/action';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const RegisterForm = (props) => {
const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    email:'',
    password:''
  });
const [formErrors, setFormErrors] = useState({
    userName: '',
    firstName: '',
    email:'',
    password:''
  });

const dispatch=useDispatch()

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateInput(name, value);
  };

const validateInput = (name, value) => {
    if (name === 'userName') {
      setFormErrors({
        ...formErrors,
        name: value.trim() === '' ? 'userName is required' : '',
      });
    } else if (name === 'firstName') {
      setFormErrors({
        ...formErrors,
        name: value.trim() === '' ? 'firstName is required' : '',
      });
    }else if (name === 'email') {
      setFormErrors({
        ...formErrors,
        email: !/^\S+@\S+\.\S+$/.test(value) ? 'Invalid email address' : '',
      });
    }else if (name === 'password') {
      setFormErrors({
        ...formErrors,
        name: value.trim() === '' ? 'password is required' : '',
      });
    }
  };

const handleSubmit = (e) => {
  let restData={"gender":'other',
  "phoneNumber":'1234567890',
  "imageurl":'https://tse3.mm.bing.net/th?id=OIP.BkoXurD30qD41Q4pDKvDAAHaGH&pid=Api&P=0&h=180',
  "type":'admin'}
    e.preventDefault();
    dispatch(register({...formData,...restData},props))
};

return (
    <div className="login-container">
      <div className="login-form-container">
        <img src="/shopping_logo.png" alt="Logo" className="login-logo" />
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              User Name
            </label>
           <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className={`form-control ${formErrors.userName ? 'is-invalid' : ''}`}
            />
            {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`} />
              {formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email
            </label>
            <input
             type="email"
             id="email"
             name="email"
             value={formData.email}
             onChange={handleInputChange}
             className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
             />
             {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
             value={formData.password}
             onChange={handleInputChange}
              className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
              />
              {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
          </div>
          <div className='mb-1'>Already have an account ? <NavLink to='/'>Login</NavLink></div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegisterForm;