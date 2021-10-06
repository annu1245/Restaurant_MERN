import React from "react";

const FoodCard = ({foodapi}) => {
    return(
        <>
        <h1>hekk</h1>
        {foodapi.map((ele)=>{
            return(
                <p>{ele.description}</p>
            )
        })}
        </>
    )
}

export default FoodCard;