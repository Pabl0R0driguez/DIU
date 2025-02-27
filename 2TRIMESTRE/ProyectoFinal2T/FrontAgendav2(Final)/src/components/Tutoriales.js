import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Tutoriales.css";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorials: [], // Lista de tutoriales
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      showModal: false, // Controla la visibilidad del modal
      selectedTutorial: null, // Guarda el tutorial seleccionado para mostrar en el modal
    };
  }

  // Cuando el componente se monta, recibe los tutoriales pasados en el state o hace la consulta
  componentDidMount() {
    const { location } = this.props;
    if (location.state && location.state.tutoriales) {
      console.log("Tutoriales recibidos en TutorialsList:", location.state.tutoriales);
      this.setState({ tutorials: location.state.tutoriales });
    } else {
      console.log("No se recibieron tutoriales en state.");
      this.retrieveTutorials(); // Si no se reciben, hace la consulta
    }
  }

  // Cambiar el valor de la búsqueda
  onChangeSearchTitle = (e) => {
    this.setState({ searchTitle: e.target.value });
  };

  // Llamada al servicio para recuperar todos los tutoriales
  retrieveTutorials = () => {
    TutorialDataService.getAllTutorials()
      .then(response => {
        this.setState({ tutorials: response.data });
      })
      .catch(e => console.log(e));
  };

  // Función de búsqueda por título
  searchTitle = () => {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data,
          currentTutorial: null,
          currentIndex: -1
        });
      })
      .catch(e => console.log(e));
  };

  // Establecer tutorial activo
  setActiveTutorial = (tutorial, index) => {
    this.setState({
      currentTutorial: this.state.currentIndex === index ? null : tutorial,
      currentIndex: this.state.currentIndex === index ? -1 : index,
    });
  };

  // Mostrar información más detallada en el modal
  showMoreInfo = (tutorial) => {
    this.setState({
      showModal: true,
      selectedTutorial: tutorial,
    });
  };

  // Cerrar el modal
  handleCloseModal = () => {
    this.setState({
      showModal: false,
      selectedTutorial: null,
    });
  };

  render() {
    const { searchTitle, tutorials, currentIndex, showModal, selectedTutorial } = this.state;

    return (
      <Container className="mt-5">
        {/* Buscador */}
        <div className="mb-4 d-flex align-items-center search-container">
          <Form.Control
            type="text"
            placeholder="Buscar por título..."
            value={searchTitle}
            onChange={this.onChangeSearchTitle}
            className="search-input"
          />
          <Button variant="primary" className="ms-2 search-btn" onClick={this.searchTitle}>
            Buscar
          </Button>
        </div>

        {tutorials.length === 0 ? (
          <div className="text-center">
            <h5>No hay tutoriales disponibles.</h5>
          </div>
        ) : (
          <Table borderless className="modern-table">
            <thead>
              <tr>
                <th>Título</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map((tutorial, index) => (
                <React.Fragment key={tutorial.id}>
                  <tr
                    onClick={() => this.setActiveTutorial(tutorial, index)}
                    className="table-row"
                  >
                    <td>{tutorial.title}</td>
                  </tr>
                  <AnimatePresence>
                    {currentIndex === index && (
                      <motion.tr
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="detail-row"
                      >
                        <td colSpan="2">
                          <div className="detail-content">
                            <p><strong>Descripción:</strong> {tutorial.description}</p>
                            <p>
                              <strong>Estado:</strong>{" "}
                              {tutorial.published ? "Publicado" : "Pendiente"}
                            </p>
                            
                            {/* Botón Ver más */}
                            <Button 
                              variant="link" 
                              onClick={() => this.showMoreInfo(tutorial)} 
                              className="mt-2"
                            >
                              Ver más
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        )}

        {/* Modal para mostrar la información detallada */}
        <Modal
          show={showModal}
          onHide={this.handleCloseModal}
          size="sm"   // Modal más pequeño
          centered
          className="custom-modal"  // Clase adicional para personalizar más el tamaño
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedTutorial ? selectedTutorial.title : ''}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTutorial && (
              <div>
                <div className="detail-item">
                  {selectedTutorial.url && (
                    <img 
                      src={selectedTutorial.url} 
                      alt="Imagen del tutorial" 
                      className="tutorial-image" 
                    />
                  )}
                </div>
                <div className="detail-item">
                  <strong>Impartido por:</strong> {selectedTutorial.persona || "No disponible"}
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
