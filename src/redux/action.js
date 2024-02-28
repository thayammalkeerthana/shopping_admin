import axios from 'axios';
import * as types from './actionType'

export const register=(data,props)=>async(dispatch)=>{
  dispatch({ type: types.REGISTER_USER_DATA_REQUEST });
  await axios.post('http://localhost:8000/users/register', data)
  .then((response) => {
     dispatch({ type: types.REGISTER_USER_DATA_SUCCESS,payload: response})
     props.history.push('/')
     alert('registered successfully')
  })
  .catch(error => {
    dispatch({ type: types.REGISTER_USER_DATA_FAILURE });
    alert(error.response.data.message);
  });
}

export const login=(data,props)=>async(dispatch)=>{
  dispatch({ type: types.REGISTER_USER_DATA_REQUEST });
  await axios.post('http://localhost:8000/users/login', data)
  .then((response) => {
     localStorage.setItem('AuthToken',response.data.data.authToken)
     localStorage.setItem('userID',response.data.data.userid)
     dispatch({ type: types.REGISTER_USER_DATA_SUCCESS,payload: response});
     props.history.push('/home')
  })
  .catch(error => {
    alert(error?.response?.data?.message);
    dispatch({ type: types.REGISTER_USER_DATA_FAILURE });
  });
}

export const getRegData=()=>async(dispatch)=>{
  dispatch({ type: types.GET_REG_DATA_REQUEST });
  const authToken=localStorage.getItem('AuthToken')
    axios.get('http://localhost:8000/users/getData',{
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    })
      .then((response)=>{
        dispatch({ type: types.GET_REG_DATA_SUCCESS,payload:response.data.data});
      })
      .catch((err)=>{
        dispatch({ type: types.GET_REG_DATA_FAILURE });
      });
}

export const updateProfile=(data,props)=>async(dispatch)=>{
  const authToken=localStorage.getItem('AuthToken')
  await axios.put(`http://localhost:8000/users/updateRegData`, data,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
  .then(response => {
    console.log('PUT request successful. Response:', response);  
    alert('your Profile was updated successfully!');
    props.history.push('/home')

  })
  .catch(error => {
    console.error('Error making PUT request:', error.response ? error.response.data : error.message);
  });
}

export const addProduct=(data,props)=>async(dispatch)=>{
  const authToken=localStorage.getItem('AuthToken')
  dispatch({ type: types.ADD_PRODUCT_DATA_REQUEST });
  await axios.post('http://localhost:8000/product/addAdminProduct', data,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
  .then((response) => {
     dispatch({ type: types.ADD_PRODUCT_DATA_SUCCESS,payload: response});  
      props.history.push('/home')
      alert('your product was added successfully')
  })
  .catch(error => {
    alert(error?.response?.data?.message);
    dispatch({ type: types.ADD_PRODUCT_DATA_FAILURE });
  });
}

export const getCategoryData=()=>async(dispatch)=>{
  dispatch({ type: types.GET_CATEGORY_DATA_REQUEST });
  const authToken=localStorage.getItem('AuthToken')
    axios.get('http://localhost:8000/category/getCategoryData',{
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    })
      .then((response)=>{
        dispatch({ type: types.GET_CATEGORY_DATA_SUCCESS,payload:response.data.data});
      })
      .catch((err)=>{
        dispatch({ type: types.GET_CATEGORY_DATA_FAILURE });
      });
}