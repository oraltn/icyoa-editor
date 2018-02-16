import schemas from "./schema.js"
import {normalize, denormalize} from "normalizr"
import immutable from "object-path-immutable"
import {mapValues} from "./util.js"

const formatSceneNumber = (number, state) => {
    if (number === "") return number;
    return state.cyoas["root"].scenes[number];
}

const unformatVarDefs = (elem, state) => {
    let newVariables = {};
    elem.varDefs.map(v => state.varDefs[v]).forEach(({name, value}) => {
        newVariables[name] = value;
    });
    return newVariables;
}

const unformatVarMods = (elem, state) => {
    let newVariables = {};
    elem.varMods.map(v => state.varMods[v]).forEach(({variable, value}) => {
        if (state.varDefs[variable])
            newVariables[state.varDefs[variable].name] = value;
    });
    return newVariables;
}

const unformatVarName = (variable, state) => {
    if (variable === "") return variable;
    if (!state.varDefs[variable]) return "";
    return state.varDefs[variable].name;
}

const unformatSceneNumber = (scene, state) => {
    if (scene === "") return scene;
    return state.cyoas["root"].scenes.indexOf("scene");
}

export function unbake(data) {
    const normalizedData = normalize(data.cyoa, schemas.cyoa).entities;
    return immutable(normalizedData)
        .update('navigations', l => mapValues(l, o =>
            immutable.set(o, 'scene', formatSceneNumber(o.sceneNumber, normalizedData))
        ))
        .value();
}

export function bake(data) {
    const unformat = immutable(data)
        .update('requirements', l => mapValues(l, o =>
            immutable.set(o, 'variable', unformatVarName(o.variable, data))
        ))
        .update('varMods', l => mapValues(l, o =>
            immutable.set(o, 'variable', unformatVarName(o.variable, data))
        ))
        .update('cyoas', l => mapValues(l, o =>
            immutable.set(o,'variables', unformatVarDefs(o, data))
        ))
        .update('scenes', l => mapValues(l, o =>
            immutable.set(o, 'variables', unformatVarMods(o, data))
        ))
        .update('choices', l => mapValues(l, o =>
            immutable.set(o, 'variables', unformatVarMods(o, data))
        ))
        .update('options', l => mapValues(l, o =>
            immutable.set(o, 'variables', unformatVarMods(o, data))
        ))
        .update('upgrades', l => mapValues(l, o =>
            immutable.set(o, 'variables', unformatVarMods(o, data))
        ))
        .update('navigations', l => mapValues(l, o =>
            immutable.set(o, 'sceneNumber', unformatSceneNumber(o.scene, data))
        ))
        .value()
    ;
    return {cyoa: denormalize(unformat.cyoas["root"], schemas.cyoa, unformat)};
}
