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
 history = useHistory();
  

 const cookies = new Cookies();               

const AddtoCard = (id) => {
  if (!isAuth){  
    if (!isCookie){
      console.log("not cookie")
      axios.post('anuser/store', {name : "Annonimus"})
      .then((res) => {
        console.log("res", res)
        if(res){
          cookies.set('userId', res, {path : '/'})
        }
      })
    }
    StoreProduct(id);
}

console.log("yes i am logged in")
axios.post('/cart/storeItem', {productId : id, quantity : 1})
.then(res => {
  if(res){
    totalItem();
  }
});

}


  const StoreProduct = (id) => {
    console.log("store product",cookies.get('userId'))
    const cookieId = cookies.get('userId');
    axios.post('cart/storeOrder', {userId : cookieId.data, productId : id, quantity : 1})
    .then((res) => {console.log("product added")})
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

  useEffect(() => {
    localStorage.setItem('cardItemId', JSON.stringify(addtoCard))

 },[addtoCard]) 
    
  
  console.log({isCookie});

    return(
        <>
     
        <section className="main-card--cointainer">
{
    filterFood.map((ele)=>{
        return(

            <div className="card-container" key={ele._id}>
            <div className="card ">
              <div className="card-body">
                {/* <span className="card-number card-circle subtle">{ele.dishId}</span> */}
                <span className="card-author subtle"> {ele.category}</span>
                <h2 className="card-title"> {ele.name} </h2>
                <span className="card-description subtle">
                  {ele.description}
                </span>
                <div className="card-read">Read</div>
              </div>
              <img src={ele.image_path} alt="images" className="card-media" />
             { isAuth ? 
              <div>
                <button onClick = {()=> EditMenu(ele._id)}>Edit</button>
                <button onClick = {()=> DeleteMenu(ele._id)}>Delete</button>
              </div> 
              : null}
              
              <span onClick = {() => AddtoCard(ele.dishId)} className="card-tag subtle">Add Order</span>
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
