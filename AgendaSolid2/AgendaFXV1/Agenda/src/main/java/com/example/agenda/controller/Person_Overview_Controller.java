package com.example.agenda.controller;
import com.example.agenda.MainApp;
import com.example.agenda.model.AgendaModelo;
import com.example.agenda.model.ExcepcionPersona;
import javafx.fxml.FXML;
import javafx.scene.control.*;

import com.example.agenda.view.Person;
import com.example.agenda.util.DateUtil;
import com.example.agenda.util.PersonUtil;

public class Person_Overview_Controller {
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
	private AgendaModelo modeloAgenda;

	/**
	 * The constructor.
	 * The constructor is called before the initialize() method.
	 */
	public void setAgendaModelo(AgendaModelo modeloAgenda) {
		if (modeloAgenda != null) {
			this.modeloAgenda = modeloAgenda;
		} else {
			throw new IllegalArgumentException("modeloAgenda no puede ser nulo");
		}
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



	/**
	 * Metodo para actualizar las etiquetas de detalles de la persona.
	 *  Este metodo recibe un objeto Person y actualiza las etiquetas con la información de esa persona.
	 * @param person
	 */
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
			//Si la persona es nula borra todo el texto
			firstNameLabel.setText("");
			lastNameLabel.setText("");
			streetLabel.setText("");
			postalCodeLabel.setText("");
			cityLabel.setText("");
			birthdayLabel.setText("");
		}
	}

	//C

	/**
	 * cuando pulsas el boton de borrar se eliminara la persona de la lista
	 * @throws ExcepcionPersona
	 */

	@FXML
	private void handleDeletePerson() throws ExcepcionPersona {
		// Obtener índice de la lista observable de la persona a borrar
		int selectedIndex = personTable.getSelectionModel().getSelectedIndex();

		// Obtener el id de la persona a borrar
		int idPersona = personTable.getSelectionModel().getSelectedItem().getCodigo();

		System.out.println("indice: " + selectedIndex);
		System.out.println("código de la persona: " + idPersona);


		if (selectedIndex >= 0) {
			// Eliminar de la lista observable
			personTable.getItems().remove(selectedIndex);

			// eliminar de la base de datos
			mainApp.getAgenda().getPersonaRepository().deletePersona(idPersona);
		} else {
			Alert alert = new Alert(Alert.AlertType.WARNING);
			alert.setTitle("No Seleccionado");
			alert.setHeaderText("No hay persona seleccionada");
			alert.setContentText("Porfavor selecciona una persona en la tabla");
			alert.showAndWait();
		}
	}


	/**
	 * 	Cuando pulsas el boton de añadir se abrirá el editDialog
	 * @throws ExcepcionPersona
	 */
	@FXML
	private void handleNewPerson() throws ExcepcionPersona {
		Person tempPerson = new Person();


		boolean okClicked = mainApp.showPersonEditDialog(tempPerson);
		if (okClicked) {
			// añadir a la lista observable
			mainApp.getPersonData().add(tempPerson);
			// guardar en la base de datos
			mainApp.getAgenda().getPersonaRepository().addPersona(PersonUtil.parseToPersonVO(tempPerson));
		}
	}

	/**
	 * 	Cuando pulsas el boton de añadir se abrirá el editDialog
	 * @throws ExcepcionPersona
	 */

	@FXML
	private void handleEditPerson() throws ExcepcionPersona {
		Person selectedPerson = personTable.getSelectionModel().getSelectedItem();
		if (selectedPerson != null) {
			boolean okClicked = mainApp.showPersonEditDialog(selectedPerson);


			if (okClicked) {
				// Actualiza la persona en la lista observable
				showPersonDetails(selectedPerson);
				// actualiza la base de datos
				mainApp.getAgenda().getPersonaRepository().editPersona(PersonUtil.parseToPersonVO(selectedPerson));
			}

		} else {
			// Nothing selected.
			Alert alert = new Alert(Alert.AlertType.WARNING);
			alert.setTitle("No seleccionado");
			alert.setHeaderText("No hay persona seleccionada");
			alert.setContentText("Porfavor selecciona una persona en la tabla");
			alert.showAndWait();
		}
	}

	/**
	 * Referencia a la clase
	 *
	 * @param mainApp
	 */
	public void setMainApp(MainApp mainApp) {
		this.mainApp = mainApp;

		// Add observable list data to the table
		personTable.setItems(mainApp.getPersonData());
	}


}