import { useState } from "react";

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

const AddToCard = () => {


    const [getCardItem, setGetCardItem] = useState(getLocalItem());
    return(
        <>
        
        <h1>Add To Card</h1>

        {
            getCardItem.map(el =>{
                return (
                    <p>{el}</p>
                )
            })
        }
        </>
    )
}

export default AddToCard;