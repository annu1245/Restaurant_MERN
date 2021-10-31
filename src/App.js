import Restraw from './myRestraw/Restorent';
import AddFood from './myRestraw/AddFood';
import Register from './Authentication/Register';
import Login from './Authentication/Login';
import Error from './myRestraw/Error';
import Navbar from './Navbar/Navbar';
import Logout from './Authentication/Logout';
import Test from './myRestraw/Test';
import AddToCard from './OrderFood/AddToCard';

import { Switch,  Route} from 'react-router-dom';
import { createContext, useState } from 'react';
import { useHistory } from "react-router";
import ProtectedRoute from './myRestraw/ProtectedRoute';
import { useEffect } from 'react/cjs/react.development';
import './index.css';



const App = () => {
    const [user, setUser] = useState(false);

    const [isAuth, setAuth] = useState(false);

    const [addcard, setAddCard] = useState(false);
    let history = useHistory();

    const Demo = createContext();

    window.atc_data = [];


    const handleAuth = () => {
        setAuth(true);
        
    }

    const checkSession = async() => {
        const res = await fetch('/user');
        const data = await res.json();
        if (data.status === 0){
            setAuth(false)
        }
        else {
            setAuth(true)
        }
    }

    useEffect(()=>{
        checkSession();
    })

    useEffect(() => {
        history.push({
            pathname : '/',
            state : isAuth,
        }) 
    },[isAuth])


    const handleLogout = async() => {
        const res = await fetch('/logout');
        const data = await res.json();
        console.log(data);
        if (data.status === 1){
            setAuth(false);
        }
    }

    const handleLogin = async() => {
            setUser(true);
            history.push('/')
    }

    return (
        <>
        {/* <Test/> */}
        <Navbar isAuth = {isAuth}/>
         {/* <Header isAuth = {isAuth}/> */}
        <Switch>
            <Route exact path="/" render = {() => <Restraw isAuth = {isAuth} isAddCard = {addcard}/>} />
            {
             isAuth ?  <Route path="/Logout" render = {()=> <Logout handleLogout = {handleLogout}/>} /> 
             :<Route path="/Login" render = {() => <Login handleLogin = {handleLogin} handleAuth = {handleAuth}/>}/>
            }
            <Route path="/Register" component={Register} />
            
            <Route path = '/bucket' component={AddToCard}  />
            <ProtectedRoute exact path="/add" isAuth = {isAuth} component={AddFood}/>
            
            <Route component={Error}/>
        </Switch>
        </>
    )
}

export default App;


