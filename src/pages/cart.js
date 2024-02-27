import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DeleteCartData, getCartData, addCart, decCart } from '../redux/action';


const CartPage = (props) => {

    const cartData = useSelector(state => state.cartData)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartData())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const removeItem = (item) => {
        dispatch(DeleteCartData(item.cartid))
    };

    const cartFun_inc = (item) => {
        let data = {
            "cartId": item.cartid,
            "cartName": item.cartname,
            "price": item.price,
            "carturl":item.carturl,
            "quantity": "1"
        }
        dispatch(addCart(data, props))
    }

    const cartFun_dec = (item) => {
        let data = {
            "cartId": item.cartid,
            "cartName": item.cartname,
            "price": item.price,
            "carturl":item.carturl,
            "quantity": "1"
        }
        if(item.quantity===1){
            dispatch(DeleteCartData(item.cartid))
        }else{
            dispatch(decCart(data))
        }
    }
console.log('cartData',cartData);
    return (
        <div>
            <h2 className='text-center py-4'>Your Shopping Cart</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                   {cartData.sort((a, b) => a.cartid - b.cartid).map((item, inx) => (
                        <tr key={inx}>
                            <td className="d-flex align-items-center" style={{ marginLeft: '10px' }}>
                                {/* <img src={'https://source.unsplash.com/1920x1080/?shopping'} alt={item.name} style={{ width: '80px', height: '80px', marginRight: '10px' }} /> */}
                                <img src={item.carturl} alt={item.name} style={{ width: '80px', height: '80px', marginRight: '10px' }} /> 
                                <div style={{ marginLeft: '20px' }}>
                                    <p>{item.cartname}</p>
                                </div>
                            </td>

                            <td className="align-middle">${item.price}</td>
                            <td className="align-middle">
                                <button className="btn btn-light" onClick={() => cartFun_dec(item)} >-</button>
                                <span className="mx-2">{item.quantity}</span>
                                <button className="btn btn-light" onClick={() => cartFun_inc(item)}>+</button>
                            </td>
                            <td className="align-middle">${(item.price * item.quantity).toFixed(2)}</td>
                            <td className="align-middle">
                                <button onClick={() => removeItem(item)} className="btn btn-danger">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {cartData.length <= 0 && <div className='text-center my-4'>
                        <h4>your cart is empty</h4>
                    </div>}
            {cartData.length > 0 && (
                <div className="text-center mt-4">
                    <button className="btn btn-warning btn-lg btn-block" onClick={() => history.push('/checkout')}>
                        Proceed
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
