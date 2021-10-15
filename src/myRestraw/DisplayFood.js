import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Navbar from "./Navbar";

const DisplayFood = () => {

    const [myfood, setMyFood] = useState([]);
    const [myFilterFodd, setMyFilterFood] = useState([]);



    useEffect(()=>{
        getFoodData();
    },[])


    const getFoodData = async() => {
        const res = await fetch('/display')
        const mydata = await res.json();
        setMyFood(mydata);
        setMyFilterFood(mydata);
        
    }
    const uniqMenu = [...new Set( myfood.map(el=>el.category)), "All"]

    
    const filterItem = (menuItem) => {
      if (menuItem === "All"){
        setMyFilterFood(myfood);
        return;
      }
      const updatedMenu = myfood.filter((el)=>{
        return el.category === menuItem;
      })
      console.log(updatedMenu)
      setMyFilterFood(updatedMenu);
    }

    return(
        <>
        <Navbar uniqcat = {uniqMenu} filterItem = {filterItem}/>
        <section className="main-card--cointainer">

        {
            myFilterFodd.map((ele)=>{
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

export default DisplayFood;