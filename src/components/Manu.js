import React from "react";

const Menu = ({foodapi}) => {
    return(
        <>
        <h1>HEllo</h1>
        {
           foodapi.map((el)=>{
               return(
                   <p>{el.name}</p>
               )
           })
        }
        </>
    )
}

export default Menu;