import React from "react"
import {connect} from "react-redux"
import TextField from "./textfield.js"
import CloseButton from "./closebutton.js"
import RequirementList from "./requirementlist.js"
import {genId} from "../util.js"

function Replacement(props) {
    const desc = props.desc;

    return <div className="Replacement">
        <div className="form-row">
            <div className="col-auto">
                <TextField value={desc.searchString}
                    onChange={props.updateSearchString}/>
            </div>
            <div className="col-auto">
                <TextField value={desc.replaceString}
                    onChange={props.updateReplaceString}/>
            </div>
            <div className="col-auto">
                <CloseButton delete={props.delete} id={props.id} />
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col">
                    <RequirementList
                        list={desc.requirements}
                        add={props.addRequirement}
                        delete={props.deleteRequirement}
                    />
                </div>
            </div>
        </div>
    </div>
}
Replacement = connect(
    (state, ownProps) => ({desc: state.replacements[ownProps.id]}),
    (dispatch, ownProps) => ({
        updateSearchString: searchString => dispatch({
            type: 'REPLACEMENT_SEARCH_STRING', id: ownProps.id, searchString
        }),
        updateReplaceString: replaceString => dispatch({
            type: 'REPLACEMENT_REPLACE_STRING', id: ownProps.id, replaceString
        }),
        addRequirement: () => dispatch({
            type: 'REPLACEMENT_ADD_REQUIREMENT',
            id: ownProps.id,
            requirementId: genId()
        }),
        deleteRequirement: requirementId => dispatch({
            type: 'REPLACEMENT_DELETE_REQUIREMENT',
            id: ownProps.id,
            requirementId
        }),
    })
)(Replacement);

export default Replacement;
