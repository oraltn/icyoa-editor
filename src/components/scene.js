import React from "react"
import {connect} from "react-redux"

import Choice from "./choice.js"
import RequirementList from "./requirementlist.js"
import VarModList from "./varmodlist.js"
import ReplacementList from "./replacementlist.js"
import VarMod from "./varmod.js"
import NavigationList from "./navigationlist.js"

import TextEntry from "./textentry.js"
import Button from "./button.js"
import AddButton from "./addbutton.js"
import {genId} from "../util.js"

function getScene(state, id) {
    return state.scenes[id];
}

function Scene(props) {
    const desc = props.desc;
    const choiceElements = desc.choices.map(
        id => <Choice id={id} key={id} delete={props.deleteChoice}/>
    );
    return  <div className="Scene">
        <h1><TextEntry className="inherit"
            onChange={props.updateTitle}
            value={desc.content.title}
        /></h1>

        <RequirementList
            list={desc.requirements}
            add={props.addRequirement}
            delete={props.deleteRequirement}
        />

        <VarModList
            list={desc.varMods}
            add={props.addVarMod}
            delete={props.deleteVarMod}
        />

        <ReplacementList
            list={desc.replacements}
            add={props.addReplacement}
            delete={props.deleteReplacement}
        />

        {choiceElements}
        <Button className="btn-primary"
            onClick={props.addChoice}>
            <span>Add Choice</span>
        </Button>

        <NavigationList
            list={desc.navigation.scenes}
            add={props.addNavigation}
            delete={props.deleteNavigation}
        />

    </div>;
}
Scene = connect(
    (state, ownProps) => ({desc: getScene(state, ownProps.id)}),
    (dispatch, ownProps) => ({
        updateTitle: title => dispatch({
            type: 'SCENE_TITLE',
            id: ownProps.id,
            title
        }),
        addVarMod: () => dispatch({
            type: 'SCENE_ADD_VARMOD', id: ownProps.id, varModId: genId()
        }),
        deleteVarMod: varModId => dispatch({
            type: 'SCENE_DELETE_VARMOD', id: ownProps.id, varModId
        }),
        addRequirement: () => dispatch({
            type: 'SCENE_ADD_REQUIREMENT', id: ownProps.id, requirementId: genId()
        }),
        deleteRequirement: requirementId => dispatch({
            type: 'SCENE_DELETE_REQUIREMENT', id: ownProps.id, requirementId
        }),
        addReplacement: () => dispatch({
            type: 'SCENE_ADD_REPLACEMENT', id: ownProps.id, replacementId: genId()
        }),
        deleteReplacement: replacementId => dispatch({
            type: 'SCENE_DELETE_REPLACEMENT', id: ownProps.id, replacementId
        }),
        addNavigation: () => dispatch({
            type: 'SCENE_ADD_NAVIGATION', id: ownProps.id, navigationId: genId()
        }),
        deleteNavigation: navigationId => dispatch({
            type: 'SCENE_DELETE_NAVIGATION', id: ownProps.id, navigationId
        }),
        addChoice: () => dispatch({
            type: 'SCENE_ADD_CHOICE',
            id: ownProps.id,
            choiceId: genId()
        }),
        deleteChoice: choiceId => dispatch({
            type: 'SCENE_DELETE_CHOICE',
            id: ownProps.id,
            choiceId
        })
    })
)(Scene);

export default Scene;
