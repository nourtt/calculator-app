import React from "react";
import "./App.css"
function Button(props) {
    return <button onClick={() =>{
        props.click(props.name, props.type);
    }} className="button">{props.name}</button>
}

export default Button;