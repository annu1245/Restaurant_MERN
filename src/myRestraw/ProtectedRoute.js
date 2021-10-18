import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({component : Component, isAuth, ...rest}) => {
    return (
        <Route {...rest} render = {() => {
            if (isAuth) {
               return <Component/>
            }
            return <Redirect to ="/Error" />
        }} />
    )
}

export default ProtectedRoute;