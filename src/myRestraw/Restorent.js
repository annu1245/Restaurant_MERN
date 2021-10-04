import React, { useState } from "react";
import FoodApi from "../api/FoodApi";
import Menu from "./MenuCard";
import Navbar from "./Navbar";
import { Router, Switch } from "react-router";

const uniqCat = [...new Set(FoodApi.map(ele=>ele.category)),"All"];

const Restraw = () => {
    const [foodapi, setFoodApi] = useState(FoodApi);
    const [menuList, setMenuList] = useState(uniqCat);

    const filterMenu = (menu) => {
        if(menu === "All"){
            setFoodApi(FoodApi);
            return;
        }
        const newMenu = FoodApi.filter((ele)=>{
            return ele.category === menu;
        });
        setFoodApi(newMenu);
    }


    return(
        <>

        <Navbar uniqcat = {menuList} filterMenu = {filterMenu}/>
        <Menu foodApi = {foodapi}/>

       
        </>
    )
}

export default Restraw;