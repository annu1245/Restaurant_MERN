import React from 'react'
import {Link} from 'react-router-dom'

function Header({isAuth}) {
    return (
        <>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add">Add Food</Link></li>
                <li><Link to="/adminLogin">Admin</Link></li>
                {
                    isAuth ? <li><Link to="/Logout">Logout</Link></li>
                    :<li><Link to="/Login">Login</Link></li> 

                }
                <li><Link to="/Register">Register</Link></li>
                <li><Link to= "/loginTest">Authentication</Link></li>
            </ul>
        </>
    )
}

export default Header;