import axios from "axios";
import React, { useState } from "react";
import AddToCard from "../OrderFood/AddToCard";
import { useHistory, useLocation } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { Children } from "react";
import Cookies from "universal-cookie/es6";


const Menu = ({foodApi, isAuth, chngFood, isCookie, totalItem}) => {

  const [itemCount, setItemCount] = useState(0);
  const [addtoCard, setAddtoCard] = useState([]);
  const [filterFood, setFilterFood] = useState([]);

  useEffect(()=>{
    setFilterFood(foodApi);
  },[foodApi])

  const DeleteMenu = (id) => {
    const delt = foodApi.filter((el) => {
      return el._id != id;
    })
    axios.post('/deleteFood', {foodId : id})
    .then(res => console.log(res.data.status));
    setFilterFood(delt);
    chngFood(delt, id);

  }
  

  let history = useHistory();
  const EditMenu = (id) => {
      const editElm = filterFood.find((el) => {
        return el._id === id;
      })
      if (editElm){
        history.push({
          pathname : "/add",
          state : editElm,
        })
      }
  }


const cookies = new Cookies();
var date = new Date()
date.setDate(date.getDate() + 1)


const AddtoCard = (id) => {
    if (!isCookie){
      console.log("not cookie")
      axios.post('anuser/store', {name : "Annonimus"})
      .then((res) => {
        if(res){
          cookies.set('userId', res.data, {path : '/', expires : date})
        }
      });
    }
    else return cookies.addChangeListener(() => StoreProduct(id)); 
  


axios.post('/cart/storeItem', {productId : id, quantity : 1})
.then(res => {
  if(res){
    totalItem();
  } 
});
}


  const StoreProduct = (id) => {
    if(cookies.get('userId')){
      console.log("@@@@@", cookies.get('userId'))
    }
    const cookieId = cookies.get('userId');
    console.log("cookie id", cookieId);
    axios.post('cart/storeOrder', {userId : cookieId, productId : id, quantity : 1})
    .then((res) => {
      if(res){
        totalItem();
      }
    })
  } 
  // const setCookie = () => {
  //   if (!cookies.get('userId')) {
  //   var crypto = require("crypto");
  //   var id = crypto.randomBytes(20).toString('hex');
  //   cookies.set('userId', id, { path: '/' });
  //   }
  //   else {
  //     console.log("already set")
  //   }
  // }

  // const getCookie = () => {
  // console.log(cookies.get('userId')); // Pacman
  // }

//if user is logged in then userid is empty else cookie id will pass
const addProduct = (id) => {
  console.log("addProduc")
  var userid;

  if (!isAuth){  //user is not looged in
    if(!cookies.get('userId')){  //and cookie also not set
      console.log("cookie not set")
      axios.post('anuser/store', {name : "Annonimus"}) // generate new cookie
      .then((res) => {
        if(res){
          cookies.set('userId', res.data, {path : '/', expires : date})
          userid = res.data;
          return axios.post('/cart/addProducts', {productID : id, userID : userid, quantity : 1}).then(res => {
            if(res){
              totalItem();
            }
          })   
        }
      });
    }
    else {
      userid= cookies.get('userId'); // if cookie is set assign cookieid in userid
      console.log("elerid se", userid)
      return axios.post('/cart/addProducts', {productID : id, userID : userid, quantity : 1})
      .then(res => {
        if(res){
          totalItem();
        }
      })
    }
  }
  else{
    return axios.post('/cart/addProducts', {productID : id, userID : userid, quantity : 1})
    .then(res => {
      if(res){
        totalItem();
      }
    })
  }
}

  
return(
    <>
    <section className="main-card--cointainer">
    {
      filterFood.map((ele)=>{
        return(

            <div className="card-container" key={ele._id}>
            <div className="card ">
              <div className="card-body">
                <span className="card-author subtle"> {ele.category}</span>
                <h2 className="card-title"> {ele.name} </h2>
                <span className="card-description subtle">
                  {ele.description}
                </span>
                <div className="card-read">PRICE : {ele.price} Rs/-</div>
              </div>
              <img src={ele.image_path} alt="images" className="card-media" />
             { isAuth ? 
                <div>
                  <button onClick = {()=> EditMenu(ele._id)}>Edit</button>
                  <button onClick = {()=> DeleteMenu(ele._id)}>Delete</button>
                </div> 
                : null
              }
              
              <span onClick = {() => addProduct(ele.dishId)} className="card-tag subtle">Add Order</span>
            </div>
          </div>
        )
    })

}
</section>
        </>
    )
}
export default Menu;
