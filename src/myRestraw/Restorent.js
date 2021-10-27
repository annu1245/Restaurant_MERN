import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Menu from "./MenuCard";
import Navbar from "./Navbar";

const Restraw = ({isAuth}) => {
    // const checkAuth = props.location.state;
    // console.log(checkAuth);

    console.log("Authentication", isAuth);


    const [myfood, setMyFood] = useState([]);
    const [myFilterFood, setMyFilterFood] = useState([]);

    // const productDetails = props.location.state || {};
    // console.log(productDetails)

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
      setMyFilterFood(updatedMenu);
    }


    return(
        <>
        <Navbar uniqcat = {uniqMenu} filterItem = {filterItem}/>
        <Menu foodApi = {myFilterFood} isAuth = {isAuth}/>

       
        </>
    )
}

export default Restraw;