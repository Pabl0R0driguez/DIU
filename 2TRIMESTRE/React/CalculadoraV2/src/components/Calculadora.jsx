// src/Calculator.js
import React, { Component } from 'react';
import axios from 'axios';

class Calculadora extends Component {
    constructor() {
        super();
        this.state = {
            expression: '',
            result: '',
        };
    }

    handleChange = (event) => {
        this.setState({ expression: event.target.value });
    };

    handleCalculate = async (event) => {
        event.preventDefault();
        try {
            // Realizamos una solicitud POST a la API de mathjs
            const response = await axios.post('http://api.mathjs.org/v4/', {
                expr: this.state.expression,
            });

            // Imprime la respuesta en la consola para depuración
            console.log(response.data); // Agrega esta línea para verificar la respuesta

            // Verifica si la respuesta contiene un resultado y un error
            if (response.data.result) {
                this.setState({ result: response.data.result });
            } else {
                this.setState({ result: 'Error: ' + response.data.error });
            }
        } catch (error) {
            console.error(error); // Imprime el error en la consola para depuración
            this.setState({ result: 'Error en la solicitud' });
        }
    };

    render() {
        return (
            <div>
                <h1>Calculadora</h1>
                <form onSubmit={this.handleCalculate}>
                    <input
                        type="text"
                        value={this.state.expression}
                        onChange={this.handleChange}
                        placeholder="Introduce tu expresión"
                        required
                    />
                    <button type="submit">Calcular</button>
                </form>
                <h2>Resultado: {this.state.result !== '' ? this.state.result : 'Sin resultado'}</h2>
            </div>
        );
    }
}

export default Calculadora;
