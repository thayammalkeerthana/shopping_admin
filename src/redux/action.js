import axios from 'axios';
import * as types from './actionType'

export const register=(data,props)=>async(dispatch)=>{
  dispatch({ type: types.REGISTER_USER_DATA_REQUEST });
  await axios.post('http://localhost:8000/users/register', data)
  .then((response) => {
     dispatch({ type: types.REGISTER_USER_DATA_SUCCESS,payload: response})
     props.history.push('/')
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

export const getAllProducts=()=>async(dispatch)=>{
  dispatch({ type: types.GET_USER_PRODUCT_REQUEST });
  const authToken=localStorage.getItem('AuthToken')
    axios.get('http://localhost:8000/product/getAllProduct',{
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    })
      .then((response)=>{
        dispatch({ type: types.GET_USER_PRODUCT_SUCCESS,payload:response});
      })
      .catch((err)=>{
        dispatch({ type: types.GET_USER_PRODUCT_FAILURE });
      });
}

export const addCart=(data,props)=>async(dispatch)=>{
  const authToken=localStorage.getItem('AuthToken')
  dispatch({ type: types.ADD_CART_DATA_REQUEST });
  await axios.post('http://localhost:8000/cart/addCart', data,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
  .then((response) => {
     dispatch({ type: types.ADD_CART_DATA_SUCCESS,payload: response});
     if(props?.history?.location?.pathname==='/cart'){
      dispatch(getCartData())
     }else{
      props.history.push('/cart')
     }
  })
  .catch(error => {
    alert(error?.response?.data?.message);
    dispatch({ type: types.ADD_CART_DATA_FAILURE });
  });
}

export const decCart=(data)=>async(dispatch)=>{
  const authToken=localStorage.getItem('AuthToken')
  dispatch({ type: types.DELETE_CART_DATA_REQUEST });
  await axios.post('http://localhost:8000/cart/decCart', data,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
  .then((response) => {
     dispatch({ type: types.DELETE_CART_DATA_SUCCESS,payload: response});
      dispatch(getCartData())
  })
  .catch(error => {
    alert(error?.response?.data?.message);
    dispatch({ type: types.DELETE_CART_DATA_FAILURE });
  });
}

export const getCartData=()=>async(dispatch)=>{
  dispatch({ type: types.GET_CART_DATA_REQUEST });
  const authToken=localStorage.getItem('AuthToken')
    axios.get('http://localhost:8000/cart/getCartData',{
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    })
      .then((response)=>{
        dispatch({ type: types.GET_CART_DATA_SUCCESS,payload:response.data.data});
      })
      .catch((err)=>{
        dispatch({ type: types.GET_CART_DATA_FAILURE });
      });
}

export const DeleteCartData = (data) => async (dispatch) => {
  const authToken=localStorage.getItem('AuthToken')
  axios.delete(`http://localhost:8000/cart/deleteCartData/${data}`,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
    .then((response)=>{
      if(response.statusText==="OK"){
        dispatch(getCartData())
      }
    })
    .catch((err)=>{
      console.log("err",err)
    });
}

export const DeleteCartAllData = (props) => async (dispatch) => {
  const authToken=localStorage.getItem('AuthToken')
  axios.delete(`http://localhost:8000/cart/deleteCartAllData`,{
    headers: {
      'Authorization': 'Bearer ' + authToken
    }
  })
    .then((response)=>{
      if(response.statusText==="OK"){
        props.history.push('/trending')
      }
    })
    .catch((err)=>{
      console.log("err",err)
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