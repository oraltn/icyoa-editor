import React from "react"
import Button from "./button.js"

export default class Collapse extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {show: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.cel.className === "collapsing") return;
        const show = this.state.show;
        this.setState(({show}) => ({show:!show}));
        window.$(this.cel).collapse('toggle');
    }

    render() {
        return <div>
            <div className="form-row collapsehead">
                {this.props.label
                    ?
                        <div className="col-auto">
                            <label>{this.props.label}</label>
                        </div>
                    : []
                }
                <div className="col-auto">
                    <Button className="btn-sm"
                        onClick={this.handleClick}
                    >
                        {this.state.show ? <span>Hide</span> : <span>Show</span>}
                    </Button>
                </div>
            </div>
            <div className="collapse"
                ref={(el) => {this.cel = el}}>
                {this.props.children}
            </div>
        </div>;
    }
}
