const Test = () => {

    const checkImage = (e) => {
        console.log(e.target.files[0])
        
    }

    return(
        <>
        <h1>hi</h1>
        <input type = "file" onChange = {checkImage}/>
        </>
    )
}

export default Test;