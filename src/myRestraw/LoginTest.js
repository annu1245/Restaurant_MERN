const LoginTest = ({mydata, handleLogin}) =>{
    const myfun = () => {
        console.log("hi")
        }
    return(
        <>
       <h1>{mydata}</h1>
       <button onClick = {myfun}>Login</button>
       <h2>Hi</h2>
        </>
    )
}

export default LoginTest;