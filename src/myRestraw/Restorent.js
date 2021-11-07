import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Menu from "./MenuCard";
import Navbar from "./Navbar";

const Restraw = ({isAuth, isCookie, totalItem}) => {

    const [myfood, setMyFood] = useState([]);
    const [myFilterFood, setMyFilterFood] = useState([]);

    
    const changeFoodApi = (e, delid) => {
      setMyFilterFood(e);
      

      const delfood = myfood.filter((el) => {
        return el._id != delid;
      })
      setMyFood(delfood);
    }

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
        <Menu foodApi = {myFilterFood} 
              isAuth = {isAuth} 
              chngFood = {changeFoodApi} 
              isCookie = {isCookie}
              totalItem = {totalItem}/>

       
        </>
    )
}



export default Restraw;