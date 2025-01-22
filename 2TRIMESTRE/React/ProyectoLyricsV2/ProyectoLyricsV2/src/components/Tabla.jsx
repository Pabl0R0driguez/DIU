
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class Tabla extends Component {
    constructor() {
        super()
        this.state = {
            letra: [] // Inicializa como un arreglo vacío
          };
    }

    /**En el componente de la tabla (TablaComponent), se utiliza letra.texto porque 
     * letra es un objeto dentro del arreglo que estás pasando como prop (letra). 
     * Este objeto contiene la propiedad texto, que guarda la letra de la canción. */
    renderData(letra, index) {
        return (
            <tr>
                <td>{letra.texto}</td>
            </tr>
        )
    }

    render() {
        return (
            <Table responsive striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Letra</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.letra.map(this.renderData)}
                </tbody>
            </Table>)
    }
}

export default Tabla;
