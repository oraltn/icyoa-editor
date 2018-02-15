import React from "react"
import {connect} from "react-redux"
import Dropdown from "./dropdown.js"

function SceneDropdown(props) {
    return <Dropdown value={props.value} onChange={props.onChange}>
        <option key="" value="">---</option>
        {props.sceneList.map(scene =>
            <option key={scene.id} value={scene.id}>
                {scene.content.title}
            </option>
        )}
    </Dropdown>;
}
SceneDropdown = connect(
    (state, ownProps) => ({
        sceneList: state.cyoas["root"].scenes.map(s => state.scenes[s])
    })
)(SceneDropdown);

export default SceneDropdown;
