import Restraw from './myRestraw/Restorent';
import Header from './myRestraw/Header';
import AddFood from './myRestraw/AddFood';
import AdminLogin from './Auth/AdminLogin';
import Register from './Authentication/Register';
import Login from './Authentication/Login';
import Error from './myRestraw/Error';
import LoginTest from './myRestraw/LoginTest';
import Logout from './Authentication/Logout';
import { Switch,  Route} from 'react-router-dom';
import { createContext, useState } from 'react';
import { useHistory } from "react-router";
import ProtectedRoute from './myRestraw/ProtectedRoute';


const App = () => {
    const [user, setUser] = useState(false);

    const [isAuth, setAuth] = useState(false);

    let history = useHistory();

    const Demo = createContext();


    const handleAuth = () => {
        console.log("Auth user")
        setAuth(true);
        history.push({
            pathname : '/',
            state : {isAuth : true}
        })
        
        
        
    }


    const handleLogout = async() => {
        const res = await fetch('/logout');
        const data = await res.json();
        console.log(data);
        if (data.status === 1){
            setUser(false);
        }
    }

    const handleLogin = async() => {
            setUser(true);
            history.push('/')
    }





    return (
        <>
         <Header isAuth = {isAuth}/>
        <Switch>
            <Route exact path="/"  component={Restraw} />
            <Route path="/adminLogin" component={AdminLogin} />
            {
             isAuth ?  <Route path="/Logout" render = {()=> <Logout handleLogout = {handleLogout}/>} /> 
             :<Route path="/Login" render = {() => <Login handleLogin = {handleLogin} handleAuth = {handleAuth}/>}/>
            }
            <Route path="/Register" component={Register} />

            <ProtectedRoute path="/add" isAuth = {isAuth} component={AddFood}/>

            <Route component={Error}/>
        </Switch>
        </>
    )
}

export default App;