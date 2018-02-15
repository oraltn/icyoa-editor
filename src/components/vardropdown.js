import React from "react"
import {connect} from "react-redux"
import Dropdown from "./dropdown.js"

function VarDropdown(props) {
    return <Dropdown value={props.value} onChange={props.onChange}>
        <option key="" value="">---</option>
        {props.varList.map(varDef =>
            <option key={varDef.id} value={varDef.id}>
                {varDef.name}
            </option>
        )}
    </Dropdown>;
}
VarDropdown = connect(
    (state, ownProps) => ({
        varList: state.cyoas["root"].varDefs.map(v => state.varDefs[v])
    })
)(VarDropdown);

export default VarDropdown;
