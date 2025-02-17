import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Tutoriales.css";  // Asegúrate de importar el CSS
import { Card, Button, Container, Row, Col, Form, Collapse } from "react-bootstrap";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.toggleTutorialDetails = this.toggleTutorialDetails.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      expandedIndex: null,
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({ searchTitle });
  }

  toggleTutorialDetails(index) {
    this.setState({
      expandedIndex: this.state.expandedIndex === index ? null : index,
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAllTutorials()
      .then(response => {
        this.setState({
          tutorials: response.data,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  render() {
    const { searchTitle, tutorials, currentIndex, expandedIndex } = this.state;

    return (
      <Container className="mt-5">
        <Row className="mb-3 align-items-center buscador-container">
          <Col md={12}>
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Buscar por título"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
                className="buscador-input"
              />
              <Button
                variant="primary"
                size="sm"
                className="buscador-btn"
                onClick={this.searchTitle}
              >
                Buscar
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mt-2 cartas-container">
          {tutorials && tutorials.map((tutorial, index) => (
            <Col md={5} lg={3} className="mb-3" key={tutorial.id}>
              <Card
                className={`h-100 p-3 ${currentIndex === index ? "border-primary" : ""}`}
                onClick={() => this.setActiveTutorial(tutorial, index)}
                style={{
                  cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif",
                  minHeight: "250px",
                  textAlign: "center",
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100%" }}>
                  <Card.Title style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>
                    {tutorial.title}
                  </Card.Title>

                  <Button
                    variant="info"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.toggleTutorialDetails(index);
                    }}
                  >
                    {expandedIndex === index ? "Ocultar Detalles" : "Ver Detalles"}
                  </Button>

                  <Collapse in={expandedIndex === index}>
                    <div className="mt-3">
                      <div className="detail-item">
                        <strong>Descripción:</strong> {tutorial.description}
                      </div>
                      <div className="detail-item">
                        <strong>Estado:</strong> {tutorial.published ? "Publicado" : "Pendiente"}
                      </div>
                      <Link to={`/tutorials/${tutorial.id}`} className="btn btn-sm mt-2">
                        Editar
                      </Link>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
