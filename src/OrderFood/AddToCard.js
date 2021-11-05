import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const getLocalItem = () => {
    let data = localStorage.getItem('cardItemId');
    console.log(data);

    if(data){
        return JSON.parse(localStorage.getItem('cardItemId'));
    }
    else{
        return [];  
    }
}

const AddToCard = ({isCookie}) => {
    console.log({isCookie});
    const [getCardItem, setGetCardItem] = useState(getLocalItem());
    const [foodApi, setFoodApi] = useState([])

    if(!isCookie){
        console.log("yes")
    }



    const getFoodData = async() => {
        const res = await fetch('/display')
        const mydata = await res.json(); 
        console.log(mydata);

        const data = mydata.filter((el) => {
            if(getCardItem.includes(el.dishId)){
                return el;
            }
        })
        setFoodApi(data);


    }

    useEffect(()=>{
        getFoodData();
    },[getCardItem])

    const decrement = (e) => {
        let count = e.target.parentNode.children[1].innerText;
        // if(count > 1){
            count = Number(count) - 1 ;
        // } 
    }

    const increment = (e) => {

        
        

        // console.log(e.target.parentNode.children[1].innerText)
        // e.target.parentNode.children[1].innerText = Number(e.target.parentNode.children[1].innerText) + 1;
        var ct = e.target.parentNode.children[1].innerText;
        ct = Number(ct) + 1;
       
        
    }
    

    // var newStorage = getCardItem.filter(function(r) { return r != '6b1ccc7e-322c-4f5f-81f9-b1fd68c0eb8b'});
    //    localStorage.setItem('users', JSON.stringify(newStorage)); //Assign it back to LocalStorage.



   

    return(
        <>
        
        <div className = "container">

            {foodApi.map(el => {
                return(
                <div className = "row bucket_row shadow p-3 mb-5 bg-white rounded">
                    <div className = "col-md-4 img_class"><img src = {el.image_path} className = "img-responsive" width = "100%" height="100%"/></div>
                    <div className = "col-md-8 bucket_detail">
                        <h4>{el.dish_name}</h4>
                        <p>{el.description}</p>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-warning" onClick = {decrement}> - </button>
                        <span class="btn btn-danger">1</span>
                        <button type="button" className="btn btn-warning" onClick = {increment}> + </button>
                    </div>
                    <div style = {{ position : "relative" ,bottom:"-10px"}}><button>Delete</button></div>

                    </div>

                 

                    
                    

                </div>
                )
            })}

            </div>
        
        
        </>
    )
}

export default AddToCard;

