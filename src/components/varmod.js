import React from "react"
import {connect} from "react-redux"
import TextField from "./textfield.js"
import NumberField from "./numberfield.js"
import VarDropdown from "./vardropdown.js"
import CloseButton from "./closebutton.js"

function VarMod(props) {
    const desc = props.desc;

    return <div className="VarMod">
        <div className="form-row">
            <div className="col-auto">
                <VarDropdown value={desc.variable} onChange={props.updateVariable} />
            </div>
            <div className="col-auto">
                <NumberField value={desc.value} onChange={props.updateValue}/>
            </div>
            <div className="col-auto">
                <CloseButton delete={props.delete} id={props.id} />
            </div>
        </div>
    </div>
}
VarMod = connect(
    (state, ownProps) => ({desc: state.varMods[ownProps.id]}),
    (dispatch, ownProps) => ({
        updateVariable: variable => dispatch(
            {type: 'VARMOD_VARIABLE', id: ownProps.id, varId: variable}
        ),
        updateValue: value => dispatch(
            {type: 'VARMOD_VALUE', id: ownProps.id, value: value}
        )
    })
)(VarMod);

export default VarMod;
