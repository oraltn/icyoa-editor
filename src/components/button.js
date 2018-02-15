import React from "react"

class Button extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onClick();
    }

    render() {
        return <button type="button"
            className={`btn ${this.props.className}`}
            onClick={this.handleClick}>
                {this.props.children}
            </button>
        ;
    }
}

export default Button;
