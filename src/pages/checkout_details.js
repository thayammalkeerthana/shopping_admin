import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { DeleteCartAllData, getCartData } from '../redux/action';

const CheckoutPage = (props) => {

    const [showModal, setShowModal] = useState(false);

    const cartData=useSelector(state=>state.cartData)

    const dispatch =useDispatch()

    useEffect(()=>{
        dispatch(getCartData())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleClose = () => {
        setShowModal(false)
    };

    const checkout_Func=()=>{
        dispatch(DeleteCartAllData(props))
    }

    const handleShow = () => setShowModal(true);

    const calculateTotal = () => {
        return cartData.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleCheckout = () => {
        handleShow();
    };

    return (
        <div>
            <div className='my-4'>
            <h4 className='text-center'>By placing your order, you agree to the delivery terms</h4>
            </div>

            <div className="card m-4 p-3" style={{ backgroundColor: '#F5F5F5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' }}>
                <h4>Order Summary</h4>

                <hr />
                {cartData.map(item => (
                    <div key={item.cartid} className="d-flex justify-content-between mb-2">
                        <span>{item.cartname} ({item.quantity})</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <hr />

                <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>${calculateTotal().toFixed(2)}</strong>
                </div>

                <div className='d-flex justify-content-center mt-4'>
                    <button className=" btn btn-warning btn-lg btn-block checkout_btn checkout_btn_size mt-3" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your order was successfully placed!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>checkout_Func()}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default CheckoutPage;
