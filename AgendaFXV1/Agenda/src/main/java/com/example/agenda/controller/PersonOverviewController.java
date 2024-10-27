package com.example.agenda.controller;
import com.example.agenda.MainApp;
import com.example.agenda.model.ExcepcionPersona;
import com.example.agenda.model.PersonaVO;
import com.example.agenda.model.repository.impl.PersonaRepositoryImpl;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;

import com.example.agenda.view.Person;
import util.DateUtil;
import util.PersonUtil;

import java.util.ArrayList;
import java.util.List;

public class PersonOverviewController {
    @FXML
    private TableView<Person> personTable;
    @FXML
    private TableColumn<Person, String> firstNameColumn;
    @FXML
    private TableColumn<Person, String> lastNameColumn;

    @FXML
    private Label firstNameLabel;
    @FXML
    private Label lastNameLabel;
    @FXML
    private Label streetLabel;
    @FXML
    private Label postalCodeLabel;
    @FXML
    private Label cityLabel;
    @FXML
    private Label birthdayLabel;

    // Reference to the main application.
    private MainApp mainApp;

    /**
     * The constructor.
     * The constructor is called before the initialize() method.
     */
    public PersonOverviewController() {
    }

    /**
     * Initializes the controller class. This method is automatically called
     * after the fxml file has been loaded.
     */
    @FXML
    private void initialize() {
        // Initialize the person table with the two columns.
        firstNameColumn.setCellValueFactory(cellData -> cellData.getValue().firstNameProperty());
        lastNameColumn.setCellValueFactory(cellData -> cellData.getValue().lastNameProperty());

        showPersonDetails(null);

        // Listen for selection changes and show the person details when changed.
        personTable.getSelectionModel().selectedItemProperty().addListener(
                (observable, oldValue, newValue) -> showPersonDetails(newValue));

    }


    private void showPersonDetails(Person person) {
        if (person != null) {
            // Fill the labels with info from the person object.
            firstNameLabel.setText(person.getFirstName());
            lastNameLabel.setText(person.getLastName());
            streetLabel.setText(person.getStreet());
            postalCodeLabel.setText(Integer.toString(person.getPostalCode()));
            cityLabel.setText(person.getCity());
            birthdayLabel.setText(DateUtil.format(person.getBirthday()));

        } else {
            // Person is null, remove all the text.
            firstNameLabel.setText("");
            lastNameLabel.setText("");
            streetLabel.setText("");
            postalCodeLabel.setText("");
            cityLabel.setText("");
            birthdayLabel.setText("");
        }
    }

    @FXML
    private void handleDeletePerson() {
        int selectedIndex = personTable.getSelectionModel().getSelectedIndex();
        if (selectedIndex >= 0) {
            personTable.getItems().remove(selectedIndex);
        } else {
            Alert alert = new Alert(Alert.AlertType.WARNING);
            alert.setTitle("No Seleccionado");
            alert.setHeaderText("No hay persona seleccionada");
            alert.setContentText("Porfavor selecciona una persona en la tabla");
            alert.showAndWait();
        }
    }


	@FXML
	private void handleNewPerson() {
		// 1. Crea un objeto temporal Person
		Person tempPerson = new Person();

		// 2. Abre un diálogo de edición de persona
		boolean okClicked = mainApp.showPersonEditDialog(tempPerson);

		// 3. Añade el objeto Person a la lista de personas del controlador
		mainApp.getPersonData().add(tempPerson);

		// 4. Convertir a PersonaVO usando PersonUtil y agregar a la base de datos
		try {
			// Convierte el objeto Person a PersonaVO
			PersonaVO nuevaPersonaVO = PersonUtil.parse2(new ArrayList<>(List.of(tempPerson))).get(0);

			// Crea una instancia del repositorio
			PersonaRepositoryImpl personaRepository = new PersonaRepositoryImpl();
			System.out.println("Añadiendo persona: " + nuevaPersonaVO);

			// Intenta añadir la nueva persona a la base de datos
			personaRepository.addPersona(nuevaPersonaVO);
		} catch (ExcepcionPersona e) {

			// Manejo de errores: muestra un mensaje si ocurre una excepción
			Alert alert = new Alert(Alert.AlertType.ERROR);
			alert.setTitle("Error al añadir persona");
			alert.setHeaderText("No se pudo añadir la persona");
			alert.setContentText(e.getMessage());
			alert.showAndWait();
		}

		// 5. (Este bloque nunca se alcanzará si ocurre una excepción en el bloque try)
		if (okClicked) {
			mainApp.getPersonData().add(tempPerson);
		}
	}


	/**
     * Called when the user clicks the edit button. Opens a dialog to edit
     * details for the selected person.
     */
    @FXML
    private void handleEditPerson() {
        Person selectedPerson = personTable.getSelectionModel().getSelectedItem();
        if (selectedPerson != null) {
            boolean okClicked = mainApp.showPersonEditDialog(selectedPerson);
            if (okClicked) {
				try{
					ArrayList<PersonaVO> nuevaPersonaVO = PersonUtil.parse2(new ArrayList<>(List.of(selectedPerson)));
					PersonaVO nuevaPersona = nuevaPersonaVO.get(0); // Obtener el primer elemento
					PersonaRepositoryImpl personaRepository = new PersonaRepositoryImpl();
					personaRepository.editPersona(nuevaPersona);
				} catch (ExcepcionPersona e) {
					Alert alert = new Alert(Alert.AlertType.ERROR);
					alert.setTitle("Error");
					alert.setHeaderText("No se pudo editar la persona");
					alert.setContentText(e.getMessage());
					alert.showAndWait();
					throw new RuntimeException(e);
				}
				showPersonDetails(selectedPerson);
            }

        } else {
            // Nothing selected.
            Alert alert = new Alert(Alert.AlertType.WARNING);
            alert.setTitle("No seleccionado");
            alert.setHeaderText("Persona no selccionada");
            alert.setContentText("Porfavor selecciona una persona de la tabla");
            alert.showAndWait();
        }
    }
    /**
     * Is called by the main application to give a reference back to itself.
     *
     * @param mainApp
     */
    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;

        // Add observable list data to the table
        personTable.setItems(mainApp.getPersonData());
    }
}