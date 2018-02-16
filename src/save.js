import immutable from "object-path-immutable"
import {bake, unbake} from "./jsonloader.js"
import {mapValues} from "./util.js"

import JSZip from "jszip"
import FileSaver from "file-saver"

export function save(state) {
    const images = [];
    let counter = 0;

    const optionList = [].concat(...[].concat(...
        state.cyoas["root"].scenes.map(
            scene => state.scenes[scene].choices.map(
                choice => state.choices[choice].options
            )
        )
    ));
    let _updatedState = immutable(state);

    optionList.forEach(id => {
        const fileName = `${counter++}.png`
        images.push({fileName, data: state.options[id].content.image.split(",")[1]});
        _updatedState = _updatedState.set(`options.${id}.content.image`, fileName);
    });

    const updatedState = _updatedState.value();

    const zip = new JSZip();
    const img = zip.folder("images");
    images.forEach(i => img.file(i.fileName, i.data, {base64: true}));

    zip.file("cyoa.json", JSON.stringify(bake(updatedState)));

    zip.generateAsync({type:"blob"}).then(blob => FileSaver.saveAs(blob, "cyoa.zip"));
}

export async function load(blob) {
    const zip = await JSZip.loadAsync(blob, {createFolders: true});
    const img = zip.folder("images");
    const imageData = {};
    const imagePromises = [];
    img.forEach((relativePath, file) => {
        imagePromises.push(file.async('base64').then(data => {
            imageData[relativePath] = 'data:image/png;base64,' + data;
        }));
    });
    const cyoaData = JSON.parse(await zip.file("cyoa.json").async('string'));
    let state = unbake(cyoaData);
    await Promise.all(imagePromises);
    return immutable.update(state, 'options', options => mapValues(options, option => {
        return immutable.set(option, 'content.image', imageData[option.content.image]);
    }));
}
