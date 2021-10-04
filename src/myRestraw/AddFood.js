import React from 'react';
import { useState } from 'react/cjs/react.development';
import axios from 'axios';

const AddFood = () =>{
    const [myimg, setMyImg] = useState();
    const [data, setData] = useState({
        dish : "",
        category : "",
        description : "",

    })

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
    
    const SubmitForm = () =>{
        const {dish, category, description} = data;
        const formData = new FormData();
        
        formData.append('img',myimg)
        formData.append('dish', dish)
        formData.append('category', category)
        formData.append('description', description)

        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post('/store', formData, config)
        .then(()=>console.log("data submitted"))
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
        <input type="file" onChange={InputEvent}/>
        <div class="d-grid mt-4">
            <button onClick = {SubmitForm} class="btn btn-primary" type="button">Save</button>
        </div>
        </form>
        </div>

        </>

    )
}

export default AddFood;