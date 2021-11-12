import { createMuiTheme } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import Cookies from "universal-cookie/es6";


const AddToCard = ({isCookie,countItem}) => {
    const [getCardItem, setCardItem] = useState([]);
    const cookies = new Cookies();

//lookup data


const lookupdata = () => {
    var cookieId;
    if (cookies.get('userId')){
        cookieId = cookies.get('userId');
    }
    axios.post('/cart/displayCartProduct', {cookieid : cookieId})
    .then(res => {
        if(res){
            console.log(res.data);
            setCardItem(res.data);
        }
    });
}

useEffect(()=>{
    lookupdata();
},[])

    return(
        <>
        <div className = "container">

            {getCardItem.map(el => {
                return(
                <div className = "row bucket_row shadow p-3 mb-5 bg-white rounded">
                    <div className = "col-md-4 img_class"><img src = {el.foods[0].image_path} className = "img-responsive" width = "100%" height="100%"/></div>
                    <div className = "col-md-8 bucket_detail">
                        <h4>{el.foods[0].dish_name}</h4>
                        <p>{el.foods[0].description}</p>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-warning"> - </button>
                        <span class="btn btn-danger">{el.quantity}</span>
                        <button type="button" className="btn btn-warning"> + </button>
                    </div>
                    <div style = {{ position : "relative" ,bottom:"-10px"}}><button>Delete</button></div>

                    </div>

                </div>
                )
            })}

            </div>
        
        
        </>
    )
}

export default AddToCard;

