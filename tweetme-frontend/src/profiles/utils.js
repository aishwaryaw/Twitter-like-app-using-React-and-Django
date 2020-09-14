import React from 'react'
import numeral from 'numeral'
function DisplayCount(props) {
   
    return (
        <span>
           {numeral(props.children).format("0a")} 
        </span>
    )
}

export default DisplayCount
