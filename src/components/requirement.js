import React from "react"
import {connect} from "react-redux"

import NumberField from "./numberfield.js"
import Dropdown from "./dropdown.js"
import VarDropdown from "./vardropdown.js"
import CloseButton from "./closebutton.js"

function getRequirement(state, id) {
    return state.requirements[id];
}

let Requirement = props => <div className="Requirement">
    <div className="form-row">
        <div className="col-auto">
            <VarDropdown value={props.desc.variable} onChange={props.updateVariable}/>
        </div>
        <div className="col-auto">
            <Dropdown value={props.desc.comparison}
                onChange={props.updateComparison}
            >
                <option>&lt;</option>
                <option>&gt;</option>
                <option>==</option>
                <option>!=</option>
            </Dropdown>
        </div>
        <div className="col-auto">
            <NumberField value={props.desc.value} onChange={props.updateValue} />
        </div>
        <div className="col-auto">
            <Dropdown value={props.desc.condition}
                onChange={props.updateCondition}
            >
                <option>and</option>
                <option>or</option>
            </Dropdown>
        </div>
        <div className="col-auto">
            <CloseButton id={props.id} delete={props.delete} />
        </div>
    </div>
</div>;
Requirement = connect(
    (state, ownProps) => ({desc: getRequirement(state, ownProps.id)}),
    (dispatch, ownProps) => ({
        updateVariable: varId => dispatch({
            type: 'REQUIREMENT_VARIABLE',
            id: ownProps.id,
            varId
        }),
        updateComparison: comparison => dispatch({
            type: 'REQUIREMENT_COMPARISON',
            id: ownProps.id,
            comparison
        }),
        updateValue: value => dispatch({
            type: 'REQUIREMENT_VALUE',
            id: ownProps.id,
            value: value
        }),
        updateCondition: condition => dispatch({
            type: 'REQUIREMENT_CONDITION',
            id: ownProps.id,
            condition
        })
    })
)(Requirement);

export default Requirement;
