import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DropdownComponent from './dropDown';
import { useDispatch, useSelector } from 'react-redux';
import { getRegData } from '../redux/action';

const Layout = ({ children }) => {
  const history = useHistory();
  const get_Reg_Data = useSelector((state) => state.regData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRegData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserId = localStorage.getItem('userID');
  const FilterRegData = get_Reg_Data.find((item) => item.userid === getUserId);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <header className="text-light" style={{ backgroundColor: '#E7D3EE', padding: '10px' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img src="/shopping_logo (2).png" alt="Logo" style={{ width: '100px' }} />
            </div>
            <div className="d-flex align-items-center">
              <span className='mx-3' style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => history.push('/home')}>Home</span>
              <span className='mx-2' style={{ cursor: 'pointer' }}>
                <img src={FilterRegData?.imageurl} className="card-img-top rounded-circle mt-2" alt={'profile'} style={{ width: '30px', height: '30px' }} />
              </span>
              <span>{FilterRegData?.username}</span>
              <span style={{ marginLeft: 'auto' }}><DropdownComponent /></span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow-1 d-flex">
        <nav className="sidebar" style={{ backgroundColor: '#C5A6C7', padding: '10px', width: '250px' }}>
          <ul className="nav flex-column">
            <li className="nav-item my-2">
              <div className="nav-link sidebartxt" onClick={() => history.push('/home')} >
                Home
              </div>
            </li>
            <li className="nav-item my-2">
              <div className="nav-link sidebartxt" onClick={() => history.push('/addProduct')}>
                Add Product
              </div>
            </li>
            <li className="nav-item my-2">
              <div className="nav-link sidebartxt" onClick={() => history.push('/updateProfile')}>
                Update Profile
              </div>
            </li>
          </ul>
        </nav>

        <main className="flex-grow-1">
          {children}
        </main>
      </div>

      <footer className="text-dark p-3 text-center" style={{ backgroundColor: '#E7D3EE', fontWeight: 'bold', marginTop: 'auto' }}>
        <div className="container">
          <p>&copy; 2024 shopping_Site | All rights reserved</p>
          <p>Contact: shopping@example.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
