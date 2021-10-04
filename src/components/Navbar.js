import React from "react";
import Menu from "./Manu";

const Navbar = ({uniqmenu, foodapi}) => {

    const checkMenu = (menu) => {
        const selectedmenu = foodapi.filter((food)=>{
            return food.catagory === menu;
        })
    }

    return (
        <>
        {
            uniqmenu.map(menu=>(
                <button onClick={checkMenu(menu)}>{menu}</button>
                
            ))
        }
        <Menu/>

        </>
    )
}

export default Navbar;