import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import axios from "axios";
import { useHistory } from "react-router";

const AdminLogin = () => {

    const [inputText, setinputText] = useState();
    const [checkEmail, setCheckEmail] = useState();

    let history = useHistory();
   
    const [userInfo, setUserInfo] = useState({
        email : "",
        password : "",
    })

    const inputEvent = (e) => {
        setinputText(e.target.value);
        const {name, value} = e.target;

        setUserInfo((pre)=>{
            return{
                ...pre,
                [name] : value,
            }
        })
    }

    const submitForm = () => {
        const {email, password} = userInfo;
        const userData = {
            email, 
            password,
        }
        axios.post('/AdminLogin/login', userData)
        .then(res => {
            console.log(res.data.state);
            if(res.data.state === 0){
                setCheckEmail("invalid")
            }
            else{
                history.push('/add')
            }
        });
    }




    


    

    return(
        <>
        <div className="container col-md-4 mt-5">
            <h1>Admin Login </h1>
            <span>{checkEmail}</span>
                <form>
                    <div class="mb-3">
                        <label class="form-label">Email address</label>
                            <input type="email" 
                            class="form-control"
                            onChange={inputEvent}
                            name = "email"
                            value = {userInfo.email}/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                            <input type="password" 
                            class="form-control"
                            onChange={inputEvent}
                            name = "password"
                            value = {userInfo.password} />
                    </div>
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button onClick = {submitForm} class="btn btn-success" type="button">Button</button>
                    </div>     
                 </form>
        </div>
        </>
    )
}

export default AdminLogin;