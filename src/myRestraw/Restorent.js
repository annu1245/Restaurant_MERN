import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Menu from "./MenuCard";
import Navbar from "./Navbar";

const Restraw = () => {

    const [myfood, setMyFood] = useState([]);
    const [myFilterFood, setMyFilterFood] = useState([]);



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
        <Menu foodApi = {myFilterFood}/>

       
        </>
    )
}

export default Restraw;