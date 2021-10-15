import Restraw from './myRestraw/Restorent';
import Header from './myRestraw/Header';
import AddFood from './myRestraw/AddFood';
import AdminLogin from './Auth/AdminLogin';
import Register from './Authentication/Register';
import Login from './Authentication/Login';
import LoginTest from './myRestraw/LoginTest';
import { BrowserRouter, Switch, Router, Route} from 'react-router-dom';
import { useState } from 'react';
import ProtectedRoute from './myRestraw/ProtectedRoute';


const App = () => {
    const [user, setUser] = useState(false);

    const handleLogin = () => {
        setUser(true);
    }


    return (
        <>
         <Header/>
        <Switch>
            <Route exact path="/"  component={Restraw} />
            {/* <Route path="/add" component={AddFood} /> */}
            <Route path="/adminLogin" component={AdminLogin} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            <ProtectedRoute path="/add" user = {user} component={AddFood}/>
        </Switch>
        </>
    )
}

export default App;