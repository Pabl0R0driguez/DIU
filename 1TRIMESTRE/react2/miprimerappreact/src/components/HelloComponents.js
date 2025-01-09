import { Component } from "react";
export default class HelloComponents extends Component {
    render() {
        return (
            <div>
                <h1>Pablo{this.props.nombre}</h1>
            </div>
        );
    }
}
