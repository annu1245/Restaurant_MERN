import React from 'react';
import { useState } from 'react/cjs/react.development';
import axios from 'axios';
import { useHistory } from 'react-router';

const Register = () => {

    const [regStatus, setRegStatus] = useState({});

    let history = useHistory();

    const [userData, setUserData] = useState({
        userName : "",
        email : "",
        password : "",
    });

    const inputEvent = (e) => {
        const {name, value} = e.target;
        setUserData((pre)=>{
            return {
                ...pre, 
                [name] : value,
            }
        })

    }

    const submitForm = (e) =>{
        e.preventDefault();
        const {userName, email, password} = userData;

        const userInfo = {
            userName,
            email,
            password,
        }

        axios.post('/user/register', userInfo)
        .then((res)=>{
            console.log(res);
            if(res.data.status == 0){
                setRegStatus("Email already used")
            }
            else{
                
            }
        })

    }

    return(
        <>
        <div className="container col-md-4 mt-5 shadow-lg p-3 mb-5 bg-body rounded">
            <h1>Registration</h1>
            <form onSubmit={submitForm}>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" 
                           class="form-control" 
                           name = "userName"
                           value = {userData.userName}
                           onChange={inputEvent}/>
                </div>
                <div class="mb-3">
                    <label  class="form-label">Email address</label>
                    <input type="email" 
                           class="form-control"
                           name = "email"
                           value = {userData.email}
                           onChange={inputEvent} />
                </div>
                <div class="mb-4">
                    <label class="form-label">Password</label>
                    <input type="password" 
                           class="form-control"
                           name = "password"
                           value = {userData.password}
                           onChange={inputEvent}/>
                </div>
                <div className="d-grid">
                    <input type="submit" class="btn btn-warning" value="Register"/>
                </div>
            </form>
         </div>
        </>
    )
}

export default Register;