import Restraw from './myRestraw/Restorent';
import AddFood from './myRestraw/AddFood';
import Register from './Authentication/Register';
import Login from './Authentication/Login';
import Error from './myRestraw/Error';
import Navbar from './Navbar/Navbar';
import Logout from './Authentication/Logout';
import Test from './myRestraw/Test';
import AddToCard from './OrderFood/AddToCard';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { Switch,  Route} from 'react-router-dom';
import { createContext, useState } from 'react';
import { useHistory } from "react-router";
import ProtectedRoute from './myRestraw/ProtectedRoute';
import { useEffect } from 'react/cjs/react.development';
import './index.css';
import React from 'react';

const App = () => {
    const [user, setUser] = useState(false);
    const [isAuth, setAuth] = useState(false);
    const [isCookie, setisCookie] = useState(false);
    const [itemCount, setItemCount] = useState(null);


    const [addcard, setAddCard] = useState(false);
    let history = useHistory();

    const handleAdminUser = () => {
        setAuth(true);  
    }

    const handleNormalUserLogin = () => {
        setUser(true);
        history.push('/')
    }

    const checkSession = async() => {
        const res = await fetch('/user');
        const data = await res.json();
        
        if (data.status === 1){
            setUser(true);
        }

        else if(data.status === 2){
            setAuth(true);
        }
        else{
            setAuth(false);
            setUser(false);
        }
    }

  const cookies = new Cookies();

    const checkCookie = () => {
        if (!cookies.get('userId')){
            setisCookie(false);
        } 
        else {
            setisCookie(true);
        }
    }

    useEffect(()=>{
        checkSession();
        checkCookie();
        bucket_items_count();
    })

    useEffect(() => {
        history.push({
            pathname : '/',
            state : isAuth,
        }) 
    },[isAuth])


    const handleLogout = async() => {
        const res = await fetch('/user/logout');
        const data = await res.json();
        console.log(data);
        if (data.status === 1){
            setAuth(false);
            setUser(false);
            setItemCount(null);
            history.push('/')
        }
    }

    




const bucket_items_count = () => {
    if (isAuth){
        axios.post('/cart/totalItem')
        .then(res => setItemCount(res.data.item));
    }
}
   
    return (
        <>
        <Navbar isAuth = {isAuth} 
                isUser = {user}
                countItem = {itemCount}
        />

        <Switch>
            <Route exact path="/" 
                render = {() => 
                <Restraw isAuth = {isAuth}  
                     isuser = {user} 
                     isCookie = {isCookie} 
                     isAddCard = {addcard}
                     totalItem = {bucket_items_count}/>} 
                />
            
            {
                isAuth || user ?  
                <Route path="/Logout" 
                    render = {()=> 
                    <Logout handleLogout = {handleLogout}/>} 
                /> :
                <Route path="/Login" 
                    render = {() => 
                    <Login handleNormalUserLogin = {handleNormalUserLogin} 
                        handleAdminUser = {handleAdminUser}/>}
                />
            }

            <Route path="/Register" component={Register} />
            
            <Route path = '/bucket' 
                render = {() =>
                <AddToCard  isCookie = {isCookie}/>}
            />

            <ProtectedRoute exact path="/add" 
                            isAuth = {isAuth} 
                            component={AddFood}
            />
            
            <Route component={Error}/>
        </Switch>
        </>
    )
}

export default App;


