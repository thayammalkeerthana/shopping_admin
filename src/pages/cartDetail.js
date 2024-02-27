import React from 'react'

const CartDetail=()=>{
    return(
        <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 p-0">
                        <div className="content-wrapper">
                        <div className="text-center " style={{fontStyle:"italic"}}>
                            <h2>Welcome to our Site !</h2>
                        </div>
                           <div className="mt-4 mb-2"  style={{fontStyle:"italic"}}>
                           <h4>Discover the perfect</h4>
                            <h4> Outfit for every occasion</h4>
                           </div>
                            <div className="my-2">
                            <p>Discover the perfect outfit for every occasion with our curated collection, meticulously crafted to elevate your style. From casual chic to formal elegance, we have the perfect ensemble to make you stand out. Explore our latest trends and find your signature look today!</p>
                            </div>
                            <div>
                            <button className="btn btn-primary checkout_btn checkout_btn_size">Let's purchase</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-0">
                        <img src={'./shoooping_home_page_img_2.png'} alt={'home'} style={{width:'100%',height:'100%'}}/>
                    </div>
                </div>
            </div>
    )
}
export default CartDetail
