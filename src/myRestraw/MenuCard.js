import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react/cjs/react.development";

const Menu = ({foodApi, isAuth}) => {


  var [filterFood, setFilterFood] = useState([]);
  // console.log("$$$$",{foodApi});
  useEffect(()=>{
    var dd = foodApi;
    setFilterFood(foodApi);
    console.log(filterFood, foodApi)
  },[foodApi])
  

  const DeleteMenu = (id) => {
    
    const delt = foodApi.filter((el) => {
      return el._id != id;
    })
    setFilterFood(delt);
    axios.post('/deleteFood', {foodId : id})
    .then(res => console.log(res.data.status))
  }

  let history = useHistory();
  const EditMenu = (id) => {
      const editElm = filterFood.find((el) => {
        return el._id === id;
      })
      console.log("dfjdf",editElm)
      if (editElm){
        console.log(editElm);
        history.push({
          pathname : "/add",
          state : editElm,
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
                <span className="card-number card-circle subtle">{ele.dishId}</span>
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
              
              <span className="card-tag  subtle">Order Now</span>
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