import React from "react"
import {connect} from "react-redux"
import TextField from "./textfield.js"
import NumberField from "./numberfield.js"
import CloseButton from "./closebutton.js"

function VarDef(props) {
    const desc = props.desc;

    return <div className="VarDef">
        <div className="form-row">
            <div className="col-auto">
                <TextField value={desc.name} onChange={props.updateName}/>
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
VarDef = connect(
    (state, ownProps) => ({desc: state.varDefs[ownProps.id]}),
    (dispatch, ownProps) => ({
        updateName: name => dispatch(
            {type: 'VARDEF_NAME', id: ownProps.id, name: name}
        ),
        updateValue: value => dispatch(
            {type: 'VARDEF_VALUE', id: ownProps.id, value: value}
        )
    })
)(VarDef);

export default VarDef;
