const LoginTest = ({handleLogin, user}) =>{
    return(
        <>
        <h1>{user}</h1>
        <button onClick = {handleLogin}> Click to authorize</button> 
        </>
    )
}

export default LoginTest;