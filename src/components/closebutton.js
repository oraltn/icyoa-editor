import React from "react"
import Button from "./button.js"

export default class CloseButton extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(e) {
        this.props.delete(this.props.id);
    }

    render() {
        return <button type="button" className="close" onClick={this.handleClose}>
            <i className="material-icons">close</i>
        </button>;
    }
}
