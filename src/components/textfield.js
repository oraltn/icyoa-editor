import React from "react"

export default class TextField extends React.PureComponent {
        constructor(props) {
                super(props);
                this.handleChange = this.handleChange.bind(this);
        }

        handleChange(e) {
                this.props.onChange(e.target.value);
        }

        render() {
                return <input type="text"
                        className={`form-control ${this.props.className}`}
                        value={this.props.value}
                        onChange={this.handleChange} />
                ;
        }
}

TextField.defaultProps = {
        className: "",
        value: "",
        onChange: () => {}
}
