import React from "react"
import {connect} from "react-redux"
import Option from "./option.js"
import Requirement from "./requirement.js"
import Button from "./button.js"
import TextEntry from "./textentry.js"
import TextField from "./textfield.js"
import AddButton from "./addbutton.js"
import RequirementList from "./requirementlist.js"
import VarModList from "./varmodlist.js"
import ReplacementList from "./replacementlist.js"
import {genId} from "../util.js"

function getChoice(state, id) {
    return state.choices[id];
}

class Choice extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.delete(this.props.id);
    }

    render() {
        const desc = this.props.desc;
        const optionElements = desc.options.map(
            id => <div className="col-lg-4" key={id}>
                <Option id={id}
                    delete={this.props.deleteOption}
                />
            </div>
        );
        return  <div className="Choice">
            <button type="button" className="close"
                onClick={this.handleClose}
            >
                <i className="material-icons">close</i>
            </button>
            <div className="row">
                <div className="col">
                    <h3>
                        <TextEntry className="inherit"
                            value={desc.content.title}
                            onChange={this.props.updateTitle}
                        />
                    </h3>
                </div>
                <div className="w-100"></div>
                <div className="col">
                    <p>
                        <TextEntry value={desc.content.text}
                            onChange={this.props.updateText}
                        />
                    </p>
                </div>
            </div>

            <RequirementList
                list={desc.requirements}
                add={this.props.addRequirement}
                delete={this.props.deleteRequirement}
            />
            <VarModList
                list={desc.varMods}
                add={this.props.addVarMod}
                delete={this.props.deleteVarMod}
            />
            <ReplacementList
                list={desc.replacements}
                add={this.props.addReplacement}
                delete={this.props.deleteReplacement}
            />

            <div className="row">
                <div className="col">
                    <Button className="float-right"
                        onClick={this.props.addOption}>
                        <i className="material-icons">add</i>
                    </Button>
                </div>
            </div>
            <div className="row justify-content-center">
                {optionElements}
            </div>
            <hr />
        </div>;
    }
}
Choice = connect(
    (state, ownProps) => ({desc: getChoice(state, ownProps.id)}),
    (dispatch, ownProps) => ({
        addRequirement: () => dispatch({
            type: 'CHOICE_ADD_REQUIREMENT', id: ownProps.id, requirementId: genId()
        }),
        deleteRequirement: requirementId => dispatch({
            type: 'CHOICE_DELETE_REQUIREMENT', id: ownProps.id, requirementId
        }),
        addVarMod: () => dispatch({
            type: 'CHOICE_ADD_VARMOD', id: ownProps.id, varModId: genId()
        }),
        deleteVarMod: varModId => dispatch({
            type: 'CHOICE_DELETE_VARMOD', id: ownProps.id, varModId
        }),
        addReplacement: () => dispatch({
            type: 'CHOICE_ADD_REPLACEMENT', id: ownProps.id, replacementId: genId()
        }),
        deleteReplacement: replacementId => dispatch({
            type: 'CHOICE_DELETE_REPLACEMENT', id: ownProps.id, replacementId
        }),
        addOption: () => dispatch({
            type: 'CHOICE_ADD_OPTION',
            id: ownProps.id,
            optionId: genId()
        }),
        deleteOption: optionId => dispatch({
            type: 'CHOICE_DELETE_OPTION',
            id: ownProps.id,
            optionId
        }),
        updateTitle: title => {dispatch({
            type: 'CHOICE_TITLE',
            id: ownProps.id,
            title
        })},
        updateText: text => {dispatch({
            type: 'CHOICE_TEXT',
            id: ownProps.id,
            text
        })}
    })
)(Choice);

export default Choice;
