import React from "react";


const Navbar = ({uniqcat, filterMenu}) => {
    return(
        <>
        {
            uniqcat.map((cat)=>{
                return(
                    <button onClick={()=>filterMenu(cat)}>{cat}</button>
                    
                )
            })
        }
        </>
    )
}
export default Navbar;