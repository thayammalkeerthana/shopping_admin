import { initialState } from './initialState'
const reducer = (state = initialState, action) => {
  console.log("action", action.payload);
  switch (action.type) {
    case 'GET_USER_DATA_REQUEST':
      return { ...state, loading: true, error: null };

    case 'GET_USER_DATA_SUCCESS':
      return { ...state, loading: false, userData: action.payload };

    case 'GET_USER_DATA_FAILURE':
      return { ...state, loading: false, error: action.payload };


    case 'REGISTER_USER_DATA_REQUEST':
      return { ...state, loading: true, error: null };

    case 'REGISTER_USER_DATA_SUCCESS':
      return { ...state, loading: false };

    case 'REGISTER_USER_DATA_FAILURE':
      return { ...state, loading: false, error: action.payload };


    case 'GET_USER_PRODUCT_REQUEST':
      return { ...state, loading: true, error: null };

    case 'GET_USER_PRODUCT_SUCCESS':
      return { ...state, loading: false, productData: action.payload?.data?.data };

    case 'GET_USER_PRODUCT_FAILURE':
      return { ...state, loading: false, error: action.payload };


    case 'ADD_CART_DATA_REQUEST':
      return { ...state, loading: true, error: null };

    case 'ADD_CART_DATA_SUCCESS':
      return { ...state, loading: false };

    case 'ADD_CART_DATA_FAILURE':
      return { ...state, loading: false, error: action.payload };


    case 'GET_CART_DATA_REQUEST':
      return { ...state, loading: true, error: null };

    case 'GET_CART_DATA_SUCCESS':
      return { ...state, loading: false, cartData: action.payload };

    case 'GET_CART_DATA_FAILURE':
      return { ...state, loading: false, error: action.payload };


    case 'GET_REG_DATA_REQUEST':
      return { ...state, loading: true, error: null };

    case 'GET_REG_DATA_SUCCESS':
      return { ...state, loading: false, regData: action.payload };

    case 'GET_REG_DATA_FAILURE':
      return { ...state, loading: false, error: action.payload };


    case 'DELETE_CART_DATA_REQUEST':
      return { ...state, loading: true, error: null };

    case 'DELETE_CART_DATA_SUCCESS':
      return { ...state, loading: false };

    case 'DELETE_CART_DATA_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_PRODUCT_DATA_REQUEST':
      return { ...state, loading: true, error: null };

    case 'ADD_PRODUCT_DATA_SUCCESS':
      return { ...state, loading: false };

    case 'ADD_PRODUCT_DATA_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'GET_CATEGORY_DATA_REQUEST':
      return { ...state, loading: true, error: null };

    case 'GET_CATEGORY_DATA_SUCCESS':
      return { ...state, loading: false, categoryData: action.payload };

    case 'GET_CATEGORY_DATA_FAILURE':
      return { ...state, loading: false, error: action.payload };


    default:
      return state;
  }
};

export default reducer;