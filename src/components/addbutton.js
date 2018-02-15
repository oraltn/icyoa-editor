import React from "react"
import Button from "./button.js"

export default function AddButton(props) {
    return <Button className="btn-sm AddButton"
        onClick={props.onClick}>
        {/* <i className="material-icons">add</i> */}
        Add
    </Button>;
}
