import React from "react";


const Navbar = ({uniqcat , filterItem}) => {
    return(
        <>
        {
            uniqcat.map((cat)=>{
                return(
                    <>
                      <button onClick={()=>filterItem(cat)}>{cat}</button>
                    </>
                )
            })
        }
        </>
    )
}
export default Navbar;