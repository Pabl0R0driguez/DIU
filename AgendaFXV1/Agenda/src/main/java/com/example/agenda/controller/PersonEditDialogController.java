package com.example.agenda.controller;
import com.example.agenda.model.PersonaVO;
import javafx.fxml.FXML;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import com.example.agenda.view.Person;
import util.DateUtil;
import javafx.scene.control.Alert;
import util.PersonUtil;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


/**
 * Dialog to edit details of a person.
 *
 * @author Marco Jakob
 */
public class PersonEditDialogController {

	@FXML
	private TextField firstNameField;
	@FXML
	private TextField lastNameField;
	@FXML
	private TextField streetField;
	@FXML
	private TextField postalCodeField;
	@FXML
	private TextField cityField;
	@FXML
	private TextField birthdayField;


	private Stage dialogStage;
	private Person person;
	private boolean okClicked = false;

	/**
	 * Initializes the controller class. This method is automatically called
	 * after the fxml file has been loaded.
	 */
	@FXML
	private void initialize() {
	}

	/**
	 * Sets the stage of this dialog.
	 *
	 * @param dialogStage
	 */
	public void setDialogStage(Stage dialogStage) {
		this.dialogStage = dialogStage;
	}

	/**
	 * Sets the person to be edited in the dialog.
	 *
	 * @param person
	 */
	public void setPerson(Person person) {

		Person tempPerson = new Person();
		PersonaVO nuevaPersonaVO = PersonUtil.parse2(new ArrayList<>(List.of(tempPerson))).get(0);


		firstNameField.setText(tempPerson.setFirstName(String.valueOf(nuevaPersonaVO.getNombre())));
		lastNameField.setText(tempPerson.setLastName(String.valueOf(nuevaPersonaVO)));
		streetField.setText(tempPerson.setStreet(String.valueOf(nuevaPersonaVO.getCalle())));
		postalCodeField.setText(Integer.toString(nuevaPersonaVO.getCodigoPostal()));
		cityField.setText(tempPerson.setLastName(String.valueOf(nuevaPersonaVO)));
		// Formatear y establecer la fecha de cumpleaños
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
		birthdayField.setText(nuevaPersonaVO.getFechaNacimiento().format(formatter));

		// Establecer el texto del prompt
		birthdayField.setPromptText("dd.mm.yyyy");
	}

	/**
	 * Returns true if the user clicked OK, false otherwise.
	 *
	 * @return
	 */
	public boolean isOkClicked() {
		return okClicked;
	}

	/**
	 * Called when the user clicks ok.
	 */
	@FXML
	private void handleEditOk() {
		if (isInputValid()) {
			person.setFirstName(firstNameField.getText());
			person.setLastName(lastNameField.getText());
			person.setStreet(streetField.getText());
			person.setPostalCode(Integer.parseInt(postalCodeField.getText()));
			person.setCity(cityField.getText());
			person.setBirthday(DateUtil.parse(birthdayField.getText()));

			okClicked = true;
			dialogStage.close();
		}
	}


	/**
	 * Called when the user clicks cancel.
	 */
	@FXML
	private void handleEditCancel() {
		dialogStage.close();
	}

	/**
	 * Validates the user input in the text fields.
	 *
	 * @return true if the input is valid
	 */
	private boolean isInputValid() {
		String errorMessage = "";

		if (firstNameField.getText() == null || firstNameField.getText().length() == 0) {
			errorMessage += "Nombre incorrecto!\n";
		}
		if (lastNameField.getText() == null || lastNameField.getText().length() == 0) {
			errorMessage += "Apellido incorrecto!\n";
		}
		if (streetField.getText() == null || streetField.getText().length() == 0) {
			errorMessage += "Calle incorrecta!\n";
		}

		if (postalCodeField.getText() == null || postalCodeField.getText().length() == 0) {
			errorMessage += "Código Postal incorrecto!\n";
		} else {
			// try to parse the postal code into an int.
			try {
				Integer.parseInt(postalCodeField.getText());
			} catch (NumberFormatException e) {
				errorMessage += "Código Postal incorrecto (debe ser un integer)!\n";
			}
		}

		if (cityField.getText() == null || cityField.getText().length() == 0) {
			errorMessage += "Ciudad incorrecta!\n";
		}

		if (birthdayField.getText() == null || birthdayField.getText().length() == 0) {
			errorMessage += "Fecha de Nacimiento incorrecta!\n";
		} else {
			if (!DateUtil.validDate(birthdayField.getText())) {
				errorMessage += "Fecha de Nacimiento incorrecta. Usa el formato dd.mm.yyyy!\n";
			}
		}

		if (errorMessage.length() == 0) {
			return true;
		} else {
			// Show the error message.
			Alert alert = new Alert(Alert.AlertType.WARNING);
			alert.setTitle("Campos incorrectos");
			alert.setHeaderText("Porfavor introduce campos correctos");
			alert.setContentText("Campos incorrectos");
			alert.showAndWait();
			return false;
		}
	}
}