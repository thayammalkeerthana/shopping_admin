import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getRegData } from "../redux/action";

const Home = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getRegData());
    }, []);
    
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 p-0">
                        <div className="content-wrapper">
                        <div className="text-center " style={{fontStyle:"italic"}}>
                            <h2>Welcome to our Admin Site!</h2>
                        </div>
                           <div className="mt-4 mb-2"  style={{fontStyle:"italic"}}>
                           <h4>Empower Your Business in the World of Fashion</h4>
                            <h4> Outfit for every occasion</h4>
                           </div>
                            <div className="my-2">
                            <p>Explore the potential of our Admin Site, where you can effortlessly manage and showcase your unique collection of dresses. Elevate your business and connect with fashion enthusiasts around the globe. From managing inventory to tracking sales, our admin platform is designed to streamline your selling experience. Dive into the world of opportunities and establish your brand presence in the fashion industry. Start your journey with us and let your dresses find their way to fashion-forward individuals.</p>
                            </div>
                            <div>
                            <button className="btn btn-primary checkout_btn checkout_btn_size" onClick={()=>history.push('/addProduct')}>Let's Add Product</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-0">
                        <img src={'./shoooping_home_page_img_2.png'} alt={'home'} style={{width:'100%',height:'100%'}}/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home