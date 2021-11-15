import { createMuiTheme } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import Cookies from "universal-cookie/es6";


const AddToCard = ({isCookie,countItem}) => {
    const [getCardItem, setCardItem] = useState([]);
    const [quantityCount, setQuantityCount] = useState(0);

    const cookies = new Cookies();
    var cookieId;

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

const decrementItem = (id) => {
    let itemQuantity = getCardItem.filter((el) => {
        if (el.foods[0].dishId === id){
            if (el.quantity != 1){
                el.quantity = el.quantity - 1;
            }
            return el;
        }
    })
    changeQuantity(id, itemQuantity[0].quantity);
    setCardItem((el) =>  {return [...el]});
}

const incrementItem = (id) => {
    let itemQuantity = getCardItem.filter((el) => {
        if (el.foods[0].dishId === id){
            el.quantity = el.quantity + 1;
            return el;
        }
        
    })
    changeQuantity(id, itemQuantity[0].quantity);
    setCardItem((el) =>  {return [...el]});
}

const changeQuantity = (dishid, quantity) => {
    if (cookies.get('userId')){
        cookieId = cookies.get('userId');
    }
    axios.post('/cart/changeQuantity', {userId : cookieId, productId : dishid, quantity : quantity})
    .then((res) => console.log(res));
}

const deleteItem = (id) => {
    if (cookies.get('userId')){
        cookieId = cookies.get('userId');
    }
    console.log("delete", id)
    axios.post('/cart/deleteItem', {userId : cookieId, productId : id})
    .then((res) => console.log(res))

    let deletefood = getCardItem.filter((el) => {
        return el.foods[0].dishId != id;
    })
    setCardItem(deletefood);
}



    return(
        <>
        <div className = "container">

            {getCardItem.map((el) => {
                return(
                <div className = "row bucket_row shadow mb-5 mt-3 bg-white rounded">
                    <div className = "col-md-3 img_class">
                        <img src = {el.foods[0].image_path} className = "img-responsive" width = "100%" height="100%"/>
                    </div>
                    <div className = "col-md-6 bucket_detail px-5">
                        <div className = "row bucket_detail_row1">
                        <h4>{el.foods[0].dish_name}</h4>
                        <p>{el.foods[0].description}</p>
                        </div>
                    <div className = "row bucket_detail_row2">
                        <div className = "col-md-3">
                            <div className="btn-group" role="group">
                                <button type="button" 
                                        className="btn btn-warning" 
                                        onClick = { () => decrementItem(el.foods[0].dishId)}> 
                                        -
                                </button>
                                <span class="btn btn-danger">{el.quantity}</span>
                                <button type="button" className="btn btn-warning" onClick = {() => incrementItem(el.foods[0].dishId)}> + </button>
                            </div>
                        </div>
                        <div className = "col-md-6 pt-2">
                            <span style = {{cursor : "pointer", color : "blue"}} onClick = {() => deleteItem(el.foods[0].dishId)}> | delete |</span>
                        </div>
                    </div>
                    </div>
                    
                    <div className = "col-md-3 cart_delete_btn p-4">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <h4>PRICE : {el.foods[0].price} RS/-</h4>
                    </div>
                    </div>
                </div>
                )
            })}

            </div>
        
        
        </>
    )
}

export default AddToCard;

