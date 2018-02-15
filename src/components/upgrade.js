import React from "react"
import {connect} from "react-redux"
import RequirementList from "./requirementlist.js"
import VarModList from "./varmodlist.js"
import {genId} from "../util.js"

import TextEntry from "./textentry.js"

function getUpgrade(state, id) {
    return state.upgrades[id];
}

class Upgrade extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.delete(this.props.id);
    }

    render() {
        const desc = this.props.desc;
        return  <li className="list-group-item">
                <button type="button" className="close"
                    onClick={this.handleClose}
                >
                    <span>&times;</span>
                </button>
                <div className="row">
                    <div className="col-12">
                        <h5>
                            <TextEntry className="inherit"
                                value={desc.content.title}
                                onChange={this.props.updateTitle}
                            />
                        </h5>
                    </div>
                    <div className="col-12">
                        <p>
                            <TextEntry value={desc.content.text}
                                onChange={this.props.updateText}
                            />
                        </p>
                    </div>
                </div>
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
            </li>
        ;
    }
}
Upgrade = connect(
    (state, ownProps) => ({desc: getUpgrade(state, ownProps.id)}),
    (dispatch, ownProps) => ({
        addRequirement: () => dispatch({
            type: 'UPGRADE_ADD_REQUIREMENT', id: ownProps.id, requirementId: genId()
        }),
        deleteRequirement: requirementId => dispatch({
            type: 'UPGRADE_DELETE_REQUIREMENT', id: ownProps.id, requirementId
        }),
        addVarMod: () => dispatch({
            type: 'UPGRADE_ADD_VARMOD', id: ownProps.id, varModId: genId()
        }),
        deleteVarMod: varModId => dispatch({
            type: 'UPGRADE_DELETE_VARMOD', id: ownProps.id, varModId
        }),
        updateText: text => {
            dispatch({
                type: 'UPGRADE_TEXT',
                id: ownProps.id,
                text
            });
        },
        updateTitle: title => {
            dispatch({
                type: 'UPGRADE_TITLE',
                id: ownProps.id,
                title
            });
        }
    })
)(Upgrade);

export default Upgrade;
