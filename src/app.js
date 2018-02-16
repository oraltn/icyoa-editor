
let testCyoa = {
    "cyoa":{
        "content":{
            "title" : "The Default CYOA Title",
            "author" : "The CYOA author"
        },
        "variables":{
                "var1": 43,
                "var2": 2
        },
        "replacements":{},
        "settings":{
            "currentScene": 0
        },
        "scenes":[
            {
                "content":{
                    "title": "The Default Scene Title"
                },
                "variables":{ "var2": -1},
                "replacements":[
                    {
                        "searchString":"",
                        "replaceString":"",
                        "requirements": [
                            {
                                "variable" : "",
                                "comparison" : "",
                                "value" : 0,
                                "condition" : ""
                            }
                        ]
                    }
                ],
                "navigation":{
                    "scenes":[
                        {
                            "text" : "",
                            "sceneNumber" : ""
                        }
                    ]
                },
                "requirements":[
                    {
                        "variable" : "",
                        "comparison" : "",
                        "value" : 0,
                        "condition" : ""
                    }
                ],
                "settings":{},
                "choices":[
                    {
                        "content":{
                            "title": "The Default Choice Title",
                            "text": "The Default Choice Text"
                        },
                        "variables":{},
                        "replacements":{},
                        "requirements":[],
                        "settings":{},
                        "options":[
                            {
                                "content":{
                                    "title": "The Default Option Title 1",
                                    "text": "The Default Option Text",
                                    "image": ""
                                },
                                "variables":{},
                                "requirements":[],
                                "settings":{},
                                "upgrades":[
                                    {
                                        "content":{
                                            "title": "The Default Upgrade Title",
                                            "text": "The Default Upgrade Text"
                                        },
                                        "variables":{},
                                        "requirements":[],
                                        "settings":{}
                                    },
                                    {
                                        "content":{
                                            "title": "The Default Upgrade Title",
                                            "text": "The Default Upgrade Text"
                                        },
                                        "variables":{},
                                        "requirements":[],
                                        "settings":{}
                                    }
                                ]
                            },
                            {
                                "content":{
                                    "title": "The Default Option Title 2",
                                    "text": "The Default Option Text",
                                    "image": ""
                                },
                                "variables":{},
                                "requirements":[],
                                "settings":{},
                                "upgrades":[
                                    {
                                        "content":{
                                            "title": "The Default Upgrade Title",
                                            "text": "The Default Upgrade Text"
                                        },
                                        "variables":{},
                                        "requirements":[],
                                        "settings":{}
                                    }
                                ]
                            },
                            {
                                "content":{
                                    "title": "The Default Option Title 3",
                                    "text": "The Default Option Text",
                                    "image": ""
                                },
                                "variables":{},
                                "requirements":[],
                                "settings":{},
                                "upgrades":[
                                    {
                                        "content":{
                                            "title": "The Default Upgrade Title",
                                            "text": "The Default Upgrade Text"
                                        },
                                        "variables":{},
                                        "requirements":[],
                                        "settings":{}
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

import React from "react"
import ReactDOM from "react-dom"
import {createStore} from "redux"
import {Provider} from "react-redux"
import cyoaApp from "./reducers.js"
import {unbake, bake} from "./jsonloader.js"
import {save} from "./save.js"

const reducer = module.hot
        ? (state, action) => { return cyoaApp(state, action); }
        : cyoaApp
;
const normalizedData = unbake(testCyoa);
let store = createStore(reducer, normalizedData);

window.store = store;

function pure(WrappedComponent) {
        return class extends React.PureComponent {
                render() {
                        return <WrappedComponent {...this.props} />;
                }
        }
}

window.bake = () => bake(store.getState());

window.unbake = (cyoa) => {
        store.dispatch({type: 'CYOA_LOAD', cyoa});
};

window.save = () => save(store.getState());

import Cyoa from "./components/cyoa.js"

ReactDOM.render(
        <Provider store={store}>
                <Cyoa id={"root"} />
        </Provider>,
        document.getElementById('root')
);

if(module.hot) {
        module.hot.accept('./components/cyoa.js', () => {
                ReactDOM.render(
                        <Provider store={store}>
                                <Cyoa id={"root"} />
                        </Provider>,
                        document.getElementById('root')
                );
        });
        module.hot.accept('./reducers.js');
        module.hot.accept('./save.js', () => {
                window.save = () => save(store.getState());
        })
}
