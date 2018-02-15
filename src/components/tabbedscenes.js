import React from "react"
import {connect} from "react-redux"
import Scene from "./scene.js"
import AddButton from "./addbutton.js"
import CloseButton from "./closebutton.js"

class TabbedScenes extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {currSceneIdx: 0};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(idx, e) {
        this.setState({currSceneIdx: idx});
        e.preventDefault();
    }

    componentWillReceiveProps(nextProps) {
        const length = nextProps.list.length;
        if (length == 0) {
            this.setState({currSceneIdx: 0});
        }
        else if (this.state.currSceneIdx >= length) {
            this.setState({currSceneIdx: length - 1});
        }
    }

    render() {
        const {currSceneIdx} = this.state;
        const tabs = this.props.list.map((scene, idx) =>
            <li key={scene} className="nav-item">
                <a onClick={(e) => this.handleClick(idx, e)}
                    className={`nav-link ${currSceneIdx == idx ? "active" : ""}`}
                    href="#">
                    {this.props.sceneNames[idx]}
                    <CloseButton delete={this.props.delete}
                        id={this.props.list[idx]} />
                </a>
            </li>
        );
        return <div>
            <ul className="nav nav-tabs">
                {tabs}
                <li className="nav-item">
                    <a onClick={this.props.add}
                        className="nav-link"
                        href="#"
                    >
                        <i className="material-icons">add</i>
                    </a>
                </li>
            </ul>
            {this.props.list.length > 0
                ? <Scene id={this.props.list[this.state.currSceneIdx]} />
                : <div />
            }
        </div>;
    }
}
TabbedScenes = connect(
    (state, ownProps) => ({
        sceneNames: ownProps.list.map(id => state.scenes[id].content.title)
    })
)(TabbedScenes);

export default TabbedScenes;
