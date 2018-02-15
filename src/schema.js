import { schema } from "normalizr";

const ids = {};

const genId = (value, parent, key) => {
    if (value.id) return value.id;
    if (!key) return "root";

    if (key === "varDefs" || key === "varMods") {
        return `${parent.id}${key}@${value.variable}`
    }

    const idx = parent[key].indexOf(value);
    return `${parent.id}${key}@${idx}`
};

const formatVarDefs = variables => {
    let newVariables = [];
    Object.entries(variables).forEach(([key, value]) => {
        newVariables.push({id: key, name: key, value});
    });
    return newVariables;
}

const formatVarMods = variables => {
    let newVariables = [];
    Object.entries(variables).forEach(([key, value]) => {
        newVariables.push({variable: key, value});
    });
    return newVariables;
}

const opt = {
    processStrategy: (value, parent, key) => {
        return Object.assign({}, value, {
            id: genId(value, parent, key)
        });
    },
    idAttribute: (value, parent, key) => {
        return genId(value, parent, key);
    }
};

const optFixVarDefs = {
    processStrategy: (value, parent, key) => Object.assign(
        opt.processStrategy(value,parent,key),
        {varDefs: formatVarDefs(value.variables)}
    ),
    idAttribute: opt.idAttribute
}

const optFixVarMods = {
    processStrategy: (value, parent, key) => Object.assign(
        opt.processStrategy(value,parent,key),
        {varMods: formatVarMods(value.variables)}
    ),
    idAttribute: opt.idAttribute
}

const optFixScene = {
    processStrategy: (value, parent, key) => {
        const scene = optFixVarMods.processStrategy(value, parent, key);
        return Object.assign(scene, {
            navigation: Object.assign(scene.navigation, {id: scene.id})
        });
    },
    idAttribute: optFixVarMods.idAttribute
}

const varDef = new schema.Entity('varDefs', {}, opt);
const varMod = new schema.Entity('varMods', {}, opt);
const requirement = new schema.Entity('requirements', {}, opt);
const replacement = new schema.Entity('replacements', {
    requirements: [requirement]
}, opt);
const navigation = new schema.Entity('navigations', {}, opt);

const upgrade = new schema.Entity('upgrades', {
    requirements: [requirement],
    varMods: [varMod]
}, optFixVarMods);
const option = new schema.Entity('options', {
    upgrades: [upgrade],
    requirements: [requirement],
    varMods: [varMod]
}, optFixVarMods);
const choice = new schema.Entity('choices', {
    options: [option],
    replacements: [replacement],
    requirements: [requirement],
    varMods: [varMod]
}, optFixVarMods);
const scene = new schema.Entity('scenes', {
    choices: [choice],
    replacements: [replacement],
    requirements: [requirement],
    varMods: [varMod],
    navigation: {scenes: [navigation]}
}, optFixScene);
const cyoa = new schema.Entity('cyoas', {
    scenes: [scene],
    replacements: [replacement],
    varDefs: [varDef]
}, optFixVarDefs);

export default {option, choice, scene, cyoa};
