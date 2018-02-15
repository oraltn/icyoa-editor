import React from "react"

export default class Dropdown extends React.PureComponent {
        constructor(props) {
                super(props);

                this.handleChange = this.handleChange.bind(this);
        }

        handleChange(e) {
                this.props.onChange(e.target.value);
        }

        render() {
                return <select value={this.props.value}
                        onChange={this.handleChange}
                        className={`form-control ${this.props.className}`}
                >
                        {this.props.children}
                </select>;
        }
}

Dropdown.defaultProps = {
        onChange: () => {},
        className: ""
}
