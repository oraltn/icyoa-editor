import immutable from "object-path-immutable"
import {bake} from "./jsonloader.js"
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
