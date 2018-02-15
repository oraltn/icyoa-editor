import React from "react"
import TextareaAutosize from "react-autosize-textarea"

export default class TextEntry extends React.PureComponent {
        constructor(props) {
                super(props);
                this.handleChange = this.handleChange.bind(this);
        }

        handleChange(e) {
                this.props.onChange(e.target.value);
        }

        render() {
                return <TextareaAutosize
                        className={`form-control ${this.props.className}`}
                        value={this.props.value}
                        onChange={this.handleChange} />
                ;
        }
}
