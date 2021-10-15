import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({component : Component, user, ...rest}) => {
    console.log(user)
    return (
        <Route {...rest} render = {() => {
            if (!user) {
               return <Redirect to ="/Login" />
            }
            return  <Component/> 
        }} />
    )
}

export default ProtectedRoute;