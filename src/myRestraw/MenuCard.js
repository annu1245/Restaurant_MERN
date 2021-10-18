import React from "react";


const Menu = ({foodApi, isAuth}) => {
  
  console.log("MMMMMM",isAuth)
    return(
        <>
        <section className="main-card--cointainer">

{
    foodApi.map((ele)=>{
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
                <button>Edit</button>
                <button>Delete</button>
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