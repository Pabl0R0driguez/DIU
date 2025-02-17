import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import { Form, Button, ListGroup, Card, Col, Row, Container, ProgressBar } from "react-bootstrap";
import '../styles/tutorials.styles.css'; // Importar estilos personalizados

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeTutorial = this.removeTutorial.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      progress: 0,  
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data,
        }, () => {
          this.updateProgress();
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProgress() {
    const maxTutorials = 10; 
    const currentProgress = (this.state.tutorials.length / maxTutorials) * 100;
    this.setState({
      progress: Math.min(currentProgress, 100), // Para asegurarse de no superar el 100%
    });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeTutorial(tutorial) {
    if (!tutorial) return;
    TutorialDataService.deleteTutorial(tutorial.id)
      .then((response) => {
        this.refreshList();
      })
      .catch((e) => {
        console.error("Error al eliminar el tutorial:", e);
      });
  }

  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex, progress } = this.state;

    return (
      <>
        {/* Barra de Progreso */}
        <Container fluid className="contenedor">
          <Row className="mb-4">
            <Col md={12}>
              <h4 className="text-center">Progreso de Tutoriales</h4>
              <ProgressBar animated now={progress} label={`${Math.round(progress)}%`} />
            </Col>
          </Row>

          <Row>
            {/* Fila de búsqueda */}
            <Col md={12} className="mb-4">
              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Search by title"
                      value={searchTitle}
                      onChange={this.onChangeSearchTitle}
                      className="form-control-lg"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Button
                    variant="primary"
                    onClick={this.searchTitle}
                    size="lg"
                    className="w-100"
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Col>

            {/* Fila de lista de tutoriales y detalles */}
            <Col md={12} className="mb-4">
              <Row>
                {/* Columna de la lista de tutoriales */}
                <Col md={5}>
                  <h4 className="mb-4">Tutorials List</h4>
                  <ListGroup>
                    {tutorials &&
                      tutorials.map((tutorial, index) => (
                        <ListGroup.Item
                          action
                          active={index === currentIndex}
                          onClick={() => this.setActiveTutorial(tutorial, index)}
                          key={index}
                          className="list-group-item-lg"
                        >
                          {tutorial.title}
                        </ListGroup.Item>
                      ))}
                  </ListGroup>

                  <Button
                    variant="danger"
                    className="mt-4 w-100"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.removeTutorial(tutorials[currentIndex]); // Eliminar el tutorial seleccionado
                    }}
                  >
                    Eliminar
                  </Button>
                </Col>

                {/* Columna de detalles del tutorial */}
                <Col md={7}> 
                {currentTutorial ? (<h2>Detalles del elemento</h2> ) : ("")}
                  {currentTutorial ? (
                    <Card>
                      <Card.Body>
                        <Card.Title>{currentTutorial.title}</Card.Title>
                        <Card.Text>
                          <strong>Description:</strong> {currentTutorial.description}
                        </Card.Text>
                        <Card.Text>
                          <strong>Status:</strong> {currentTutorial.published ? "Published" : "Pending"}
                        </Card.Text>
                        <Link to={"/tutorials/" + currentTutorial.id} className="btn btn-warning btn-lg w-100">
                          Edit
                        </Link>
                      </Card.Body>
                    </Card>
                  ) : (
                    <h6>Selecciona un tutorial para mostrar la información</h6>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
