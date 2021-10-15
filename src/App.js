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
import { useState } from 'react';
import { useHistory } from "react-router";
import ProtectedRoute from './myRestraw/ProtectedRoute';


const App = () => {
    const [user, setUser] = useState(false);

    let history = useHistory();

    const handleLogout = async() => {
        const res = await fetch('/logout');
        const data = await res.json();
        console.log(data);
        if (data.status === 1){
            setUser(false);
        }
    }

    const handleLogin = async() => {
        const res = await fetch('/addFood')
        const data = await res.json();
        console.log(data.status);
        if (data.status === 1){
            setUser(true);
            history.push('/add')
        }
        else {
            console.log("invalid")
        }
    }




    return (
        <>
         <Header user = {user}/>
        <Switch>
            <Route exact path="/"  component={Restraw} />
            <Route path="/adminLogin" component={AdminLogin} />
            {
             user ?  <Route path="/Logout" render = {()=> <Logout handleLogout = {handleLogout}/>} /> 
             :<Route path="/Login" render = {() => <Login handleLogin = {handleLogin}/>}/>
            }
            <Route path="/Register" component={Register} />

            <ProtectedRoute path="/add" user = {user} component={AddFood}/>

            <Route component={Error}/>
        </Switch>
        </>
    )
}

export default App;