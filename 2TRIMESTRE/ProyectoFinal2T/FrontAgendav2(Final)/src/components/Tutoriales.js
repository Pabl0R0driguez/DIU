import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import "../styles/Tutoriales.css";  // Asegúrate de importar el CSS

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  // Cargar tutoriales al montar el componente
  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    TutorialDataService.getAllTutorials()
      .then(response => {
        setTutorials(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const searchTitleHandler = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setTutorials(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.deleteAll()
      .then(response => {
        retrieveTutorials();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="tutorials-list-container">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />
        <button className="search-btn" onClick={searchTitleHandler}>
          Search
        </button>
      </div>

      <div className="tutorials">
        <h4 className="tutorials-title">Tutorials List</h4>
        <ul className="tutorials-list">
          {tutorials.map((tutorial, index) => (
            <li
              key={index}
              className={`tutorial-item ${index === currentIndex ? "active" : ""}`}
              onClick={() => setActiveTutorial(tutorial, index)}
            >
              {tutorial.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="tutorial-detail">
        {currentTutorial ? (
          <div>
            <h4>Details</h4>
            <div><strong>Title:</strong> {currentTutorial.title}</div>
            <div><strong>Description:</strong> {currentTutorial.description}</div>
            <div><strong>Status:</strong> {currentTutorial.published ? "Published" : "Pending"}</div>
            <Link to={`/tutorials/${currentTutorial.id}`} className="edit-btn">
              Edit
            </Link>
          </div>
        ) : (
          <div className="no-tutorial">
            <p>Please click on a tutorial...</p>
          </div>
        )}
      </div>

      <button className="remove-all-btn" onClick={removeAllTutorials}>
        Remove All Tutorials
      </button>
    </div>
  );
};

export default TutorialsList;
