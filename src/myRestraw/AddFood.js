import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import axios from 'axios';
import { useHistory } from 'react-router';
import { getDefaultNormalizer } from '@testing-library/dom';
import Error from './Error';
import { useLocation } from "react-router-dom";



const AddFood = () =>{

    const [myimg, setMyImg] = useState();

    var time = new Date().getTime().toString(); 
    const [dishid, setDishId] = useState(time);

    const [editMyFood, setEditMyFood] = useState(false);

    const [data, setData] = useState({
        dish : "",
        category : "",
        description : "",

    })
    const location = useLocation();
    
    useEffect(()=>{
    if (location.state != null){
        console.log("state",location.state);
        editMenu();
        setEditMyFood(true)
    }
    },[location])


    
    const editMenu = () => {
        const {dishId, dish_name, description, category, image_path} = location.state;
        setMyImg(image_path);
        setDishId(dishId);
        setData((pre)=>{
            console.log(description);
            return{
                dish : dish_name,
                category : category,
                description : description,
            }
        })
     }
    
    
    

    const DataEvent = (event) => {
        const {name, value} = event.target;
        setData((pre)=>{
            return{
                ...pre,
                [name] : value,
            }
        })
    }

    const InputEvent = (e) => {
        const img = e.target.files[0];
        setMyImg(img);
        
    }  
    
    const history = useHistory();
    
    
    const SubmitForm = () =>{
        const {dish, category, description} = data;
        const formData = new FormData();

        formData.append('img',myimg)
        formData.append('dishId',dishid)
        formData.append('dish', dish)
        formData.append('category', category)
        formData.append('description', description)

         

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        axios.post('/store',formData, config)
        .then(()=>history.push('/'))
        .catch(err=>console.log(err))
    }


    return(
        <>
        <div className="container col-md-6 mt-5">
        <form >
        <div class="mb-3">
            <label class="form-label">Name of Food : </label>
            <input type="text" 
                   class="form-control" 
                   onChange={DataEvent}
                   name = "dish"
                   value = {data.dish}/>
        </div>
        <div class="mb-3">
            <label class="form-label">Category : </label>
            <input type="text" 
                   class="form-control"
                   onChange={DataEvent}
                   name="category"
                   value={data.category}/>
        </div>
        <div class="mb-3">
            <label class="form-label">description: </label>
            <input type="text" 
                   class="form-control"
                   onChange={DataEvent}
                   name="description"
                   value={data.description}/>
        </div>
        <img src = {myimg} />
        <input type="file" 
               onChange={InputEvent}  />
        <div class="d-grid mt-4">
           {
                editMyFood ? <button onClick = {SubmitForm} class="btn btn-warning" type="button">Update</button> : <button onClick = {SubmitForm} class="btn btn-primary" type="button">Save</button>
           } 
        </div>
        </form>

        </div>

        </>

    )
}

export default AddFood;