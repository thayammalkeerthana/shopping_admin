import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { login } from '../redux/action';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';


const LoginForm = (props) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch()
  // const history = useHistory()


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    if (name === 'email') {
      setFormErrors({
        ...formErrors,
        email: !/^\S+@\S+\.\S+$/.test(value) ? 'Invalid email address' : '',
      });
    } else if (name === 'password') {
      setFormErrors({
        ...formErrors,
        name: value.trim() === '' ? 'password is required' : '',
      });
    }
  };

  const handleSubmit = (e) => {
    let restData={
      "type":'admin'
      }
    e.preventDefault();
    dispatch(login({...formData,...restData},props))
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <img src='/shopping_logo.png' alt="Logo" className="login-logo" />
        <form onSubmit={handleSubmit}>

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
          <div className='mb-1'>Don't have an account ? <NavLink to='/register'>Signup</NavLink></div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginForm;