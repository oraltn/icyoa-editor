import React from "react"
import {connect} from "react-redux"
import Scene from "./scene.js"
import VarDef from "./vardef.js"
import AddButton from "./addbutton.js"
import TabbedScenes from "./tabbedscenes.js"
import ReplacementList from "./replacementlist.js"
import SaveButton from "./savebutton.js"
import LoadButton from "./loadbutton.js"
import Collapse from "./collapse.js"
import {genId} from "../util.js"

function getCyoa(state, id) {
    return state.cyoas[id];
}

function Cyoa(props) {
    const desc = props.desc;

    return <div className="container">
        <div className="row"><div className="col-auto">
            <div className="form-row">
                <div className="col-auto">
                    <SaveButton />
                </div>
                <div className="col-auto">
                    <LoadButton />
                </div>
            </div>
        </div></div>

        <Collapse label="Settings:">
            <div className="row align-items-center">
                <div className="col-auto">
                    <label>Variables:</label>
                </div>
                <div className="col-auto">
                    <AddButton onClick={props.addVarDef} />
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    {desc.varDefs.map(id =>
                        <VarDef key={id} id={id} delete={props.deleteVarDef}/>
                    )}
                </div>
            </div>
            <ReplacementList
                list={desc.replacements}
                add={props.addReplacement}
                delete={props.deleteReplacement}
            />
        </Collapse>
        <TabbedScenes list={desc.scenes}
            add={props.addScene}
            delete={props.deleteScene}
        />
    </div>
}
Cyoa = connect(
    (state, ownProps) => ({desc: getCyoa(state, ownProps.id)}),
    (dispatch, ownProps) => ({
        addVarDef: () => dispatch({
            type: 'CYOA_ADD_VARDEF',
            id: ownProps.id,
            varDefId: genId()
        }),
        deleteVarDef: varDefId => dispatch({
            type: 'CYOA_DELETE_VARDEF',
            id: ownProps.id,
            varDefId
        }),
        addReplacement: () => dispatch({
            type: 'CYOA_ADD_REPLACEMENT', id: ownProps.id, replacementId: genId()
        }),
        deleteReplacement: replacementId => dispatch({
            type: 'CYOA_DELETE_REPLACEMENT', id: ownProps.id, replacementId
        }),
        addScene: () => dispatch({
            type: 'CYOA_ADD_SCENE',
            id: ownProps.id,
            sceneId: genId()
        }),
        deleteScene: sceneId => dispatch({
            type: 'CYOA_DELETE_SCENE',
            id: ownProps.id,
            sceneId
        })
    })
)(Cyoa);

export default Cyoa;
