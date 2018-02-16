import React from "react"
import {connect} from "react-redux"
import TextEntry from "./textentry.js"
import Upgrade from "./upgrade.js"
import Button from "./button.js"
import RequirementList from "./requirementlist.js"
import VarModList from "./varmodlist.js"
import CardImgEditable from "./cardimgeditable.js"
import Collapse from "./collapse.js"
import {genId} from "../util.js"

function getOption(state, id) {
    return state.options[id];
}

class Option extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.delete(this.props.id);
    }

    render() {
        const desc = this.props.desc;
        return <div className="Option">
            <button type="button" className="close"
                onClick={this.handleClose}
            >
                <i className="material-icons">close</i>
            </button>
            <div className="card">
            <CardImgEditable img={desc.content.image}
                onChange={this.props.updateImage}
            />
            <div className="card-body">
                <h3 className="card-title">
                    <TextEntry className="inherit"
                        value={desc.content.title}
                        onChange={this.props.updateTitle}
                    />
                </h3>
                <p>
                    <TextEntry value={desc.content.text}
                        onChange={this.props.updateText}
                    />
                </p>
                <Collapse label="Settings:">
                    <RequirementList
                        singleColumn
                        list={desc.requirements}
                        add={this.props.addRequirement}
                        delete={this.props.deleteRequirement}
                    />

                    <VarModList
                        singleColumn
                        list={desc.varMods}
                        add={this.props.addVarMod}
                        delete={this.props.deleteVarMod}
                    />
                </Collapse>
            </div>
            <ul className="list-group list-group-flush">
                {desc.upgrades.map(id =>
                    <Upgrade id={id} key={id}
                        delete={this.props.deleteUpgrade}
                    />
                )}
            </ul>
            <Button className=""
                onClick={this.props.addUpgrade}>
                <i className="material-icons">add</i>
            </Button>
            </div>
        </div>;
    }
}
Option = connect(
    (state, ownProps) => ({desc: getOption(state, ownProps.id)}),
    (dispatch, ownProps) => ({
        updateTitle: title => {dispatch({
            type: 'OPTION_TITLE',
            id: ownProps.id,
            title
        })},
        updateText: text => {dispatch({
            type: 'OPTION_TEXT',
            id: ownProps.id,
            text
        })},
        updateImage: image => {dispatch({
            type: 'OPTION_IMAGE',
            id: ownProps.id,
            image
        })},
        addRequirement: () => dispatch({
            type: 'OPTION_ADD_REQUIREMENT', id: ownProps.id, requirementId: genId()
        }),
        deleteRequirement: requirementId => dispatch({
            type: 'OPTION_DELETE_REQUIREMENT', id: ownProps.id, requirementId
        }),
        addVarMod: () => dispatch({
            type: 'OPTION_ADD_VARMOD', id: ownProps.id, varModId: genId()
        }),
        deleteVarMod: varModId => dispatch({
            type: 'OPTION_DELETE_VARMOD', id: ownProps.id, varModId
        }),
        addUpgrade: upgradeId => {dispatch({
            type: 'OPTION_ADD_UPGRADE',
            id: ownProps.id,
            upgradeId: genId()
        })},
        deleteUpgrade: upgradeId => {dispatch({
            type: 'OPTION_DELETE_UPGRADE',
            id: ownProps.id,
            upgradeId
        })}
    })
)(Option);

export default Option;
