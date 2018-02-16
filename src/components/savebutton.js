import React from "react"
import {connect} from "react-redux"
import Button from "./button.js"

let SaveButton = (props) =>
    <Button className="btn-primary" onClick={() => save(props.state)}>
        Save
    </Button>
;

SaveButton = connect((state, ownProps) => ({state}))(SaveButton);

export default SaveButton;
