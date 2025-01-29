import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class EditTutorial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateTutorial = this.updateTutorial.bind(this);
    }

    // Método que se llama cuando el componente se monta
    componentDidMount() {
        const { id } = this.props.match.params; // Obtener el ID del tutorial de los parámetros
        this.getTutorial(id); // Obtener los datos del tutorial
    }

    // Obtener el tutorial seleccionado por su ID
    getTutorial(id) {
        TutorialDataService.get(id)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published
                });
            })
            .catch(error => {
                console.error("Error al obtener el tutorial:", error.response ? error.response.data : error.message);
            });
    }

    // Manejar el cambio de los inputs
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    // Actualizar el tutorial en la lista principal
    updateTutorial(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const { id, title, description, published } = this.state;

        // Actualizar el tutorial en el servicio
        TutorialDataService.update(id, {
            title : title,
            description: description,
            published: published
        })
            .then(response => {
                console.log("Tutorial actualizado:", response.data);
                // Redirigir a la lista de tutoriales después de la actualización
                this.props.history.push("/tutorials"); // Cambia esto a la ruta de tu lista de tutoriales
            })
            .catch(error => {
                // Manejo de errores detallado
                console.error("Error al actualizar el tutorial:", error.response ? error.response.data : error.message);
            });
    }

    render() {
        const { title, description, published } = this.state; // Obtener el estado
        return (
            <div>
                <h1>Editar Tutorial</h1>
                <form onSubmit={this.updateTutorial}>
                    <div>
                        <label>Título:</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Publicado:</label>
                        <input
                            type="radio"
                            name="published"
                            checked={published}
                            onChange={() => this.setState({ published: true })}
                        /> Publicado

                        <input
                            type="radio"
                            name="published"
                            checked={!published}
                            onChange={() => this.setState({ published: false })}
                        /> No Publicado
                    </div>

                    <button type="submit">Actualizar Tutorial</button>
                </form>
            </div>
        );
    }
}
