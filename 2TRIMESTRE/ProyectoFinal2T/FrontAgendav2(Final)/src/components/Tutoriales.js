import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Tutoriales.css"; 
import { Container, Table, Button, Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    const { location } = this.props;
    // Verificar si hay tutoriales pasados desde la ruta
    if (location.state && location.state.tutoriales) {
      this.setState({ tutorials: location.state.tutoriales });
    } else {
      this.retrieveTutorials();
    }
  }

  onChangeSearchTitle = (e) => {
    this.setState({ searchTitle: e.target.value });
  };

  retrieveTutorials = () => {
    TutorialDataService.getAllTutorials()
      .then(response => {
        this.setState({ tutorials: response.data });
      })
      .catch(e => console.log(e));
  };

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

  setActiveTutorial = (tutorial, index) => {
    this.setState({
      currentTutorial: this.state.currentIndex === index ? null : tutorial,
      currentIndex: this.state.currentIndex === index ? -1 : index
    });
  };

  render() {
    const { searchTitle, tutorials, currentIndex } = this.state;

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

        {/* Aquí si no tenemos tutoriales asociados se muestra ese mensaje, sino si se muestra la lista asociada */} 
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
      </Container>
    );
  }
}
