import React from "react"
import AddButton from "./addbutton.js"

const list = (label, s) => Component => { return function List(props) {
    const colClass = (props.singleColumn || s)
        ? "col-12"
        : "col-lg-auto";
    return <div>
        <div className="row align-items-end">
            <div className="col-auto">
                <label>{label}</label>
            </div>
            <div className="col-auto">
                <AddButton onClick={props.add} />
            </div>
        </div>
        <div className="row">
            {props.list.map(id =>
                <div className={`${colClass}`} key={id}>
                    <Component key={id} id={id} delete={props.delete} />
                </div>
            )}
        </div>
    </div>;
}}

export default list;
