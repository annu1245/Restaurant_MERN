import React, { useState } from "react";
import FoodApi from "../api/FoodApi";

const Home = () => {
    const [foodapi, setFoodApi] = useState(FoodApi)
    return(
        <>
        <h1>hellooo</h1>
        <section className="main-card--cointainer">

        {
            foodapi.map((ele)=>{
                return (
                    <div className="card-container" key={ele.id}>
                    <div className="card ">
                      <div className="card-body">
                        <span className="card-number card-circle subtle">{ele.id}</span>
                        <span className="card-author subtle"> {ele.category}</span>
                        <h2 className="card-title"> {ele.name} </h2>
                        <span className="card-description subtle">
                          {ele.description}
                        </span>
                        <div className="card-read">Read</div>
                      </div>
                      <img src={ele.image} alt="images" className="card-media" />
    
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

export default Home;