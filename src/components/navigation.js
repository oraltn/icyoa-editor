import React from "react"
import {connect} from "react-redux"
import TextField from "./textfield.js"
import CloseButton from "./closebutton.js"
import SceneDropdown from "./scenedropdown.js"
import {genId} from "../util.js"

function Navigation(props) {
    const desc = props.desc;

    return <div className="Navigation">
        <div className="form-row">
            <div className="col-auto">
                <TextField value={desc.text}
                    onChange={props.updateText} />
            </div>
            <div className="col-auto">
                <SceneDropdown value={desc.scene}
                    onChange={props.updateScene} />
            </div>
            <div className="col-auto">
                <CloseButton delete={props.delete} id={props.id} />
            </div>
        </div>
    </div>
}
Navigation = connect(
    (state, ownProps) => ({desc: state.navigations[ownProps.id]}),
    (dispatch, ownProps) => ({
        updateText: text => dispatch({
            type: 'NAVIGATION_TEXT', id: ownProps.id, text
        }),
        updateScene: scene => dispatch({
            type: 'NAVIGATION_SCENE', id: ownProps.id, scene
        })
    })
)(Navigation);

export default Navigation;
