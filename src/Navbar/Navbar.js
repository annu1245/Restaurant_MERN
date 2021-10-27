import { NavLink } from "react-router-dom";

const Navbar = ({isAuth}) => {
    return(
        <nav class="navbar navbar-light" style = {{background : "rgba(255,209,67,1)"}}>
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                <img src="images/logo3.jpg" alt="food logo" width="60" class="d-inline-block align-text-top"/>
                <span style={{color : "red" , padding : "20px"}}>Foodyy</span>
                </a>

                <ul class="nav nav-pills">
                
                <li class="nav-item">
                    <NavLink to = "/" activeClassName = "active_class" style = {{padding : "10px"}}>Home</NavLink>
                </li>
                <li class="nav-item">
                    {
                        isAuth ? <NavLink to = "/add" activeClassName = "active_class" style = {{padding : "10px"}}>AddFood</NavLink> : null
                    } 
                </li>
                
                <li class="nav-item">
                    { isAuth ? null : <NavLink to = "/Register" activeClassName = "active_class" style = {{padding : "10px"}}>Register</NavLink>}
                </li>
                <li class="nav-item">
                    {
                        isAuth ? <NavLink to = "/Logout" activeClassName = "active_class" style = {{padding : "10px"}}>LogOut</NavLink> : <NavLink to = "/Login" activeClassName = "active_class" style = {{padding : "10px"}}>Login</NavLink>
                    } 
                </li>
                
                </ul>
            </div>
            
        </nav>
    )
}

export default Navbar;

