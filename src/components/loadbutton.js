import React from "react"
import {connect} from "react-redux"
import {load} from "../save.js"

class LoadButton extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        load(e.target.files[0]).then(state => this.props.load(state));
    }

    render() {
        return <input type="file" className="form-control-file"
            onChange={this.handleChange}
        />;
    }
}
LoadButton = connect(undefined, (dispatch, ownProps) => ({
    load: state => dispatch({type: 'CYOA_LOAD_DIRECT', state})
}))(LoadButton);

export default LoadButton;
