import {combineReducers} from "redux"
import immutable from "object-path-immutable"
import {unbake, bake} from "./jsonloader.js"

function del(x) {
    return (arr) => {
        const idx = arr.indexOf(x);
        return [...arr.slice(0,idx), ...arr.slice(idx+1)];
    }
}

function upgrades(state = {}, action) {
    switch(action.type) {
        case 'OPTION_ADD_UPGRADE': return immutable.set(state,
            `${action.upgradeId}`,
            {
                id: action.upgradeId,
                content: {
                    title: "Title",
                    text: "Text"
                },
                variables: {},
                varMods: [],
                requirements: [],
                settings: {}
            }
        );
        case 'OPTION_DELETE_UPGRADE': return immutable.del(state,
            `${action.upgradeId}`
        );
        case 'UPGRADE_ADD_REQUIREMENT': return immutable.push(state,
            `${action.id}.requirements`,
            action.requirementId
        );
        case 'UPGRADE_DELETE_REQUIREMENT': return immutable.update(state,
            `${action.id}.requirements`,
            del(action.requirementId)
        );
        case 'UPGRADE_ADD_VARMOD':
            return immutable.push(state, `${action.id}.varMods`, action.varModId);
        case 'UPGRADE_DELETE_VARMOD':
            return immutable.update(state,
                `${action.id}.varMods`,
                del(action.varModId));
        case 'UPGRADE_TEXT': return immutable.set(state,
            `${action.id}.content.text`,
            action.text
        );
        case 'UPGRADE_TITLE': return immutable.set(state,
            `${action.id}.content.title`,
            action.title
        );
        default: return state;
    }
}

function options(state = {}, action) {
    switch(action.type) {
        case 'CHOICE_ADD_OPTION': return immutable.set(state,
            `${action.optionId}`,
            {
                id: action.optionId,
                content: {
                    title: "Title",
                    text: "Text",
                    image: ""
                },
                variables: {},
                varMods: [],
                requirements: [],
                settings: {},
                upgrades: []
            }
        );
        case 'CHOICE_DELETE_OPTION': return immutable.del(state,
            `${action.optionId}`
        );
        case 'OPTION_ADD_UPGRADE': return immutable.push(state,
            `${action.id}.upgrades`,
            action.upgradeId
        );
        case 'OPTION_DELETE_UPGRADE': return immutable.update(state,
            `${action.id}.upgrades`,
            del(action.upgradeId)
        );
        case 'OPTION_ADD_REQUIREMENT': return immutable.push(state,
            `${action.id}.requirements`,
            action.requirementId
        );
        case 'OPTION_DELETE_REQUIREMENT': return immutable.update(state,
            `${action.id}.requirements`,
            del(action.requirementId)
        );
        case 'OPTION_ADD_VARMOD':
            return immutable.push(state, `${action.id}.varMods`, action.varModId);
        case 'OPTION_DELETE_VARMOD':
            return immutable.update(state,
                `${action.id}.varMods`,
                del(action.varModId));
        case 'OPTION_TITLE': return immutable.set(state,
            `${action.id}.content.title`,
            action.title
        );
        case 'OPTION_TEXT': return immutable.set(state,
            `${action.id}.content.text`,
            action.text
        );
        case 'OPTION_IMAGE': return immutable.set(state,
            `${action.id}.content.image`,
            action.image
        );
        default: return state;
    }
}


function choices(state = {}, action) {
    switch(action.type) {
        case 'SCENE_ADD_CHOICE': return immutable.set(state,
            `${action.choiceId}`,
            {
                id: action.choiceId,
                content: {
                    title: "Title",
                    text: "Text"
                },
                variables: {},
                varMods: [],
                replacements: [],
                requirements: [],
                settings: {},
                options: []
            }
        );
        case 'SCENE_DELETE_CHOICE': return immutable.del(state,
            `${action.choiceId}`
        );
        case 'CHOICE_ADD_OPTION': return immutable.push(state,
            `${action.id}.options`,
            action.optionId
        );
        case 'CHOICE_DELETE_OPTION': return immutable.update(state,
            `${action.id}.options`,
            del(action.optionId)
        );
        case 'CHOICE_ADD_REQUIREMENT': return immutable.push(state,
            `${action.id}.requirements`,
            action.requirementId
        );
        case 'CHOICE_DELETE_REQUIREMENT': return immutable.update(state,
            `${action.id}.requirements`,
            del(action.requirementId)
        );
        case 'CHOICE_ADD_REPLACEMENT': return immutable.push(state,
            `${action.id}.replacements`,
            action.replacementId
        );
        case 'CHOICE_DELETE_REPLACEMENT': return immutable.update(state,
            `${action.id}.replacements`,
            del(action.replacementId)
        );
        case 'CHOICE_ADD_VARMOD':
            return immutable.push(state, `${action.id}.varMods`, action.varModId);
        case 'CHOICE_DELETE_VARMOD':
            return immutable.update(state,
                `${action.id}.varMods`,
                del(action.varModId));
        case 'CHOICE_TITLE': return immutable.set(state,
            `${action.id}.content.title`, action.title
        );
        case 'CHOICE_TEXT': return immutable.set(state,
            `${action.id}.content.text`, action.text
        );
        default: return state;
    }
}

function scenes(state = {}, action) { switch(action.type) {
    case 'CYOA_ADD_SCENE':
        return immutable.set(state, `${action.sceneId}`, {
            id: action.sceneId,
            content: {title: "Title"},
            variables: {},
            varMods: [],
            replacements: [],
            navigation: { scenes: [] },
            requirements: [],
            settings: {},
            choices: []
        });
    case 'CYOA_DELETE_SCENE':
        return immutable.del(state, `${action.sceneId}`);
    case 'SCENE_ADD_VARMOD':
        return immutable.push(state, `${action.id}.varMods`, action.varModId);
    case 'SCENE_DELETE_VARMOD':
        return immutable.update(state, `${action.id}.varMods`, del(action.varModId));
    case 'SCENE_ADD_CHOICE': return immutable.push(state,
        `${action.id}.choices`,
        action.choiceId
    );
    case 'SCENE_DELETE_CHOICE': return immutable.update(state,
        `${action.id}.choices`,
        del(action.choiceId)
    );
    case 'SCENE_ADD_REQUIREMENT': return immutable.push(state,
        `${action.id}.requirements`,
        action.requirementId
    );
    case 'SCENE_DELETE_REQUIREMENT': return immutable.update(state,
        `${action.id}.requirements`,
        del(action.requirementId)
    );
    case 'SCENE_ADD_REPLACEMENT': return immutable.push(state,
        `${action.id}.replacements`,
        action.replacementId
    );
    case 'SCENE_DELETE_REPLACEMENT': return immutable.update(state,
        `${action.id}.replacements`,
        del(action.replacementId)
    );
    case 'SCENE_ADD_NAVIGATION': return immutable.push(state,
        `${action.id}.navigation.scenes`,
        action.navigationId
    );
    case 'SCENE_DELETE_NAVIGATION': return immutable.update(state,
        `${action.id}.navigation.scenes`,
        del(action.navigationId)
    );
    case 'SCENE_TITLE': return immutable.set(state,
        `${action.id}.content.title`, action.title
    );
    default: return state;
}}

function cyoas(state = {}, action) { switch(action.type) {
    case 'CYOA_ADD_VARDEF':
        return immutable.push(state, `${action.id}.varDefs`, action.varDefId);
    case 'CYOA_DELETE_VARDEF':
        return immutable.update(state, `${action.id}.varDefs`, del(action.varDefId));
    case 'CYOA_ADD_REPLACEMENT': return immutable.push(state,
        `${action.id}.replacements`,
        action.replacementId
    );
    case 'CYOA_DELETE_REPLACEMENT': return immutable.update(state,
        `${action.id}.replacements`,
        del(action.replacementId)
    );
    case 'CYOA_ADD_SCENE':
        return immutable.push(state, `${action.id}.scenes`, action.sceneId);
    case 'CYOA_DELETE_SCENE':
        return immutable.update(state, `${action.id}.scenes`, del(action.sceneId));
    default:
        return state;
}}

function requirements(state = {}, action) { switch(action.type) {
    case 'SCENE_ADD_REQUIREMENT':
    case 'CHOICE_ADD_REQUIREMENT':
    case 'OPTION_ADD_REQUIREMENT':
    case 'UPGRADE_ADD_REQUIREMENT':
    case 'REPLACEMENT_ADD_REQUIREMENT': return immutable.set(state,
        `${action.requirementId}`,
        {
            id: action.requirementId,
            variable: "",
            comparison: "<",
            value: 0,
            condition: "and"
        }
    );
    case 'SCENE_DELETE_REQUIREMENT':
    case 'CHOICE_DELETE_REQUIREMENT':
    case 'OPTION_DELETE_REQUIREMENT':
    case 'UPGRADE_DELETE_REQUIREMENT':
    case 'REPLACEMENT_DELETE_REQUIREMENT': return immutable.del(state,
        `${action.requirementId}`
    );
    case 'REQUIREMENT_VARIABLE': return immutable.set(state,
        `${action.id}.variable`,
        action.varId
    );
    case 'REQUIREMENT_COMPARISON': return immutable.set(state,
        `${action.id}.comparison`,
        action.comparison
    );
    case 'REQUIREMENT_VALUE': return immutable.set(state,
        `${action.id}.value`,
        action.value
    );
    case 'REQUIREMENT_CONDITION': return immutable.set(state,
        `${action.id}.condition`,
        action.condition
    );
    default:
        return state;
}}

function replacements(state = {}, action) { switch(action.type) {
    case 'CYOA_ADD_REPLACEMENT':
    case 'SCENE_ADD_REPLACEMENT':
    case 'CHOICE_ADD_REPLACEMENT': return immutable.set(state,
        `${action.replacementId}`,
        {
            id: action.replacementId,
            searchString: "",
            replaceString: "",
            requirements: []
        }
    );
    case 'CYOA_DELETE_REPLACEMENT':
    case 'SCENE_DELETE_REPLACEMENT':
    case 'CHOICE_DELETE_REPLACEMENT': return immutable.del(state,
        `${action.replacementId}`
    );
    case 'REPLACEMENT_SEARCH_STRING': return immutable.set(state,
        `${action.id}.searchString`,
        action.searchString
    );
    case 'REPLACEMENT_REPLACE_STRING': return immutable.set(state,
        `${action.id}.replaceString`,
        action.replaceString
    );
    case 'REPLACEMENT_ADD_REQUIREMENT': return immutable.push(state,
        `${action.id}.requirements`,
        action.requirementId
    );
    case 'REPLACEMENT_DELETE_REQUIREMENT': return immutable.update(state,
        `${action.id}.requirements`,
        del(action.requirementId)
    );
    default:
        return state;
}}

const genUnusedName = (prefix, list) => {
    if (list.indexOf(prefix) == -1) return prefix;

    let i = 2;
    let name = `${prefix} ${i}`;
    while(list.indexOf(name) != -1) {
        i++;
        name = `${prefix} ${i}`;
    }
    return name;
}

function varDefs(state = {}, action) { switch(action.type) {
    case 'CYOA_ADD_VARDEF':
        return immutable.set(state, `${action.varDefId}`, {
            id: action.varDefId,
            name: genUnusedName("Variable", Object.values(state).map(v => v.name)),
            value: 0
        })
    case 'CYOA_DELETE_VARDEF':
        return immutable.del(state, `${action.varDefId}`);
    case 'VARDEF_NAME':
        return immutable.set(state, `${action.id}.name`, action.name);
    case 'VARDEF_VALUE':
        return immutable.set(state, `${action.id}.value`, action.value);
    default:
        return state;
}}

function varMods(state = {}, action) { switch(action.type) {
    case 'SCENE_ADD_VARMOD':
    case 'CHOICE_ADD_VARMOD':
    case 'OPTION_ADD_VARMOD':
    case 'UPGRADE_ADD_VARMOD':
        return immutable.set(state, `${action.varModId}`, {
            id: action.varModId,
            variable: "",
            value: 0
        });
    case 'SCENE_DELETE_VARMOD':
    case 'CHOICE_DELETE_VARMOD':
    case 'OPTION_DELETE_VARMOD':
    case 'UPGRADE_DELETE_VARMOD':
        return immutable.del(state, `${action.varModId}`);
    case 'VARMOD_VARIABLE':
        return immutable.set(state, `${action.id}.variable`, action.varId);
    case 'VARMOD_VALUE':
        return immutable.set(state, `${action.id}.value`, action.value);
    default:
        return state;
}}

function navigations(state = {}, action) { switch(action.type) {
    case 'SCENE_ADD_NAVIGATION':
        return immutable.set(state, `${action.navigationId}`, {
            id: action.navigationId,
            text: "",
            scene: ""
        });
    case 'SCENE_DELETE_NAVIGATION':
        return immutable.del(state, `${action.navigationId}`);
    case 'NAVIGATION_TEXT':
        return immutable.set(state, `${action.id}.text`, action.text);
    case 'NAVIGATION_SCENE':
        return immutable.set(state, `${action.id}.scene`, action.scene);
    default:
        return state;
}}

const reduce = combineReducers({
    cyoas,
    scenes,
    choices,
    options,
    upgrades,
    requirements,
    replacements,
    varDefs,
    varMods,
    navigations
});

function cyoaApp(state, action) { switch(action.type) {
    case 'CYOA_LOAD':
        return reduce(unbake(action.cyoa),action);
    case 'CYOA_LOAD_DIRECT':
        return reduce(action.state, action);
    default:
        return reduce(state, action);
}}

export default cyoaApp;
