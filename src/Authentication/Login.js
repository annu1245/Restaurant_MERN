import { useState } from "react/cjs/react.development";
import axios from "axios";
import { useHistory } from "react-router";

const Login = () => {

    const [loginStatus, setLoginStatus] = useState();

    let history = useHistory();

    const [userData, setUserData] = useState({
        email : "",
        password : "",
    });

    const inputEvent = (e) => {
        const {name, value} = e.target;
        setUserData((pre)=>{
            return{
                ...pre,
                [name] : value,
            }
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        const {email, password} = userData
        const userInfo = {
            email,
            password,
        }

        axios.post('/user/login', userInfo)
        .then((res)=>{
            console.log(res.data)
            if (res.data.status === 0){
                setLoginStatus("Invalid EmailId OR Password")
            }
            else{
                history.push('/');
            }
        })

    }

    return (
        <>
        <div className="container col-md-4 mt-5  shadow-lg p-3 mb-5 bg-body rounded">
            <h1>Login</h1>
            {loginStatus}
            <form onSubmit={submitForm}>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" 
                           class="form-control"
                           name = "email"
                           onChange = {inputEvent}
                           value = {userData.email}
                          />
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" 
                           class="form-control"
                           name = "password"
                           onChange = {inputEvent}
                           value = {userData.password}/>
                </div>
                <div className="d-grid">
                    <input type="submit" class="btn btn-warning" value="Login"/>
                </div>
            </form>
        </div>

        </>
    )
}

export default Login;