import React from "react"

function tryParseNumber(x) {
    if (x === "") return x;
    let n = Number(x);
    return Number.isNaN(n) ? x : n;
}

export default class NumberField extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(tryParseNumber(e.target.value));
    }

    render() {
        const width = Math.max(this.props.value.toString().length+6, 9);
        const style = {
            width: `${width}ch`
        };
        return <input type="number"
            className={`form-control NumberField ${this.props.className}`}
            style={style}
            value={this.props.value}
            onChange={this.handleChange} />
        ;
    }
}

NumberField.defaultProps = {
    className: "",
    value: "",
    onChange: () => {}
}
