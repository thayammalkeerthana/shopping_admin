import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCart, getAllProducts } from '../redux/action';

const Trending = (props) => {
    const dispatch = useDispatch()
    const productData = useSelector((state) => state.productData)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const cartFun = (item) => {
        console.log("item", item)
        let data={
            "cartId":item.productid,
            "cartName":item.productname,
            "carturl":item.imageurl,
            "price":item.price.slice(1),
            "quantity":"1"
        }
        dispatch(addCart(data,props))
    }
    console.log("productData",productData);
    return (
        <div className="d-flex flex-wrap justify-content-around">
            {productData.map((item, inx) => (
                <div key={item.productid} className="card m-4" style={{ width: '18rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' }}>
                    <img src={item.imageurl} className="card-img-top rounded-circle mt-2" alt={'jeans'} style={{ width: '150px', height: '150px', margin: 'auto' }} />
                    {/* <img src={'https://stanwellskids.in/cdn/shop/files/PastelLavender.jpg?v=1705778861&width=1080'} className="card-img-top rounded-circle mt-2" alt={'jeans'} style={{ width: '150px', height: '150px', margin: 'auto' }} /> */}
                    <div key={inx} className="card-body text-center">
                        <h5 className="card-title">{item.productname}</h5>
                        <p className="card-text">Amount: {item.price}</p>
                        <button className="btn btn-primary" onClick={() => cartFun(item)}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>


    )
}

export default Trending

