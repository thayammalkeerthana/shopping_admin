import React from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const DropdownComponent = () => {
    const history = useHistory()
    const logoutFuc = () => {
        localStorage.removeItem('AuthToken');
        localStorage.removeItem('userID')
        history.push('/')
    }
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i class="bi bi-three-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => history.push('/home')} >Home</Dropdown.Item>
                <Dropdown.Item onClick={() => history.push('/addProduct')}>Add Product</Dropdown.Item>
                <Dropdown.Item onClick={() => history.push('/updateProfile')}>Update Profile</Dropdown.Item>
                <Dropdown.Item onClick={() => logoutFuc()}>logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default DropdownComponent