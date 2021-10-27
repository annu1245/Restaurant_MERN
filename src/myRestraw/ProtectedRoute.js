import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({component : Component, isAuth, ...rest}) => {
    console.log("this is protected route", isAuth)
    return (
        <Route {...rest} render = {() => {
            if (isAuth) {
                console.log("protected route")
               return <Component {...rest}/>
            }
            return <Redirect to ="/Error" />
        }} />
    )
}

export default ProtectedRoute;