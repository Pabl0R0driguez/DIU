import React, { useState, useEffect, useContext } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import { Form, Button, Card, Col, Row, Container, ProgressBar, Table } from "react-bootstrap";
import "../styles/tutorials.styles.css";
import { ProgressContext } from "../context/ProgressContext";

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const { progress, setProgress } = useContext(ProgressContext);

  useEffect(() => {
    retrieveTutorials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setTutorials(response.data);
        updateProgress(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateProgress = (tutorialsData) => {
    const maxTutorials = 10;
    const currentProgress = (tutorialsData.length / maxTutorials) * 100;
    const newProgress = Math.min(currentProgress, 100);
    setProgress(newProgress);
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeTutorial = (tutorial) => {
    if (!tutorial) return;
    TutorialDataService.deleteTutorial(tutorial.id)
      .then(() => {
        refreshList();
      })
      .catch((e) => {
        console.error("Error al eliminar el tutorial:", e);
      });
  };

  const searchTitleFunc = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then((response) => {
        setTutorials(response.data);
        updateProgress(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container fluid className="contenedor" style={{ marginTop: "70px" }}>
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
                  placeholder="Buscar"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                  className="form-control-lg"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Button variant="primary" onClick={searchTitleFunc} size="lg" className="w-100">
                Search
              </Button>
            </Col>
          </Row>
        </Col>

        {/* Fila de lista de tutoriales y detalles */}
        <Col md={12} className="mb-4">
          <Row>
            {/* Columna de la tabla de tutoriales */}
            <Col md={7}>
              <h4 className="mb-4">Tutorials List</h4>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Título</th>
                  </tr>
                </thead>
                <tbody>
                  {tutorials &&
                    tutorials.map((tutorial, index) => (
                      <tr
                        key={index}
                        onClick={() => setActiveTutorial(tutorial, index)}
                        style={{ cursor: "pointer" }}
                        className={index === currentIndex ? "table-primary" : ""}
                      >
                        <td>{index + 1}</td>
                        <td>{tutorial.title}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Button
                variant="danger"
                className="mt-4 w-100"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTutorial(tutorials[currentIndex]);
                }}
                disabled={currentIndex === -1}
              >
                Eliminar
              </Button>
            </Col>

            {/* Columna de detalles del tutorial */}
            <Col md={5}>
              {currentTutorial ? (
                <>
                  <h2>Detalles del Tutorial</h2>
                  <Card>
                    <Card.Body>
                      <Card.Title>{currentTutorial.title}</Card.Title>
                      <Card.Text>
                        <strong>Descripción:</strong> {currentTutorial.description}
                      </Card.Text>
                      <Card.Text>
                        <strong>Estado:</strong> {currentTutorial.published ? "Published" : "Pending"}
                      </Card.Text>
                      <Link to={`/tutorials/${currentTutorial.id}`} className="btn btn-warning btn-lg w-100">
                        Edit
                      </Link>
                    </Card.Body>
                  </Card>
                </>
              ) : (
                <h6>Selecciona un tutorial para mostrar la información</h6>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TutorialsList;
