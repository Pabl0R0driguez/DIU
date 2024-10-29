package com.example.agenda.controller;
import com.example.agenda.model.AgendaModelo;
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
	private Person c;
	private boolean okClicked = false;
	private AgendaModelo agendaModelo;

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

	public void setAgendaModelo(AgendaModelo m){
		this.agendaModelo=m;
	}

	/**
	 * Sets the person to be edited in the dialog.
	 *
	 */
	public void setPerson(Person c) {
		this.c = c;

		firstNameField.setText(c.getFirstName());
		lastNameField.setText(c.getLastName());
		streetField.setText(c.getStreet());
		postalCodeField.setText(Integer.toString(c.getPostalCode()));
		cityField.setText(c.getCity());
		birthdayField.setText(DateUtil.format(c.getBirthday()));
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
	private void handleOk() {
		if (isInputValid()) {
			c.setFirstName(firstNameField.getText());
			c.setLastName(lastNameField.getText());
			c.setStreet(streetField.getText());
			c.setPostalCode(Integer.parseInt(postalCodeField.getText()));
			c.setCity(cityField.getText());
			c.setBirthday(DateUtil.parse(birthdayField.getText()));

			okClicked = true;
			dialogStage.close();
		}
	}

	/**
	 * Called when the user clicks cancel.
	 */
	@FXML
	private void handleCancel() {
		dialogStage.close();
	}

	/**
	 * Validates the user input in the text fields.
	 *
	 * @return true if the input is valid
	 */
	private boolean isInputValid() {
		String errorMessage = "";

		if (firstNameField.getText() == null || firstNameField.getText().isEmpty()) {
			errorMessage += "No valid first name!\n";
		}
		if (lastNameField.getText() == null || lastNameField.getText().isEmpty()) {
			errorMessage += "No valid last name!\n";
		}
		if (streetField.getText() == null || streetField.getText().isEmpty()) {
			errorMessage += "No valid street!\n";
		}

		if (postalCodeField.getText() == null || postalCodeField.getText().isEmpty()) {
			errorMessage += "No valid postal code!\n";
		} else {
			// try to parse the postal code into an int.
			try {
				Integer.parseInt(postalCodeField.getText());
			} catch (NumberFormatException e) {
				errorMessage += "No valid postal code (must be an integer)!\n";
			}
		}

		if (cityField.getText() == null || cityField.getText().isEmpty()) {
			errorMessage += "No valid city!\n";
		}

		if (birthdayField.getText() == null || birthdayField.getText().isEmpty()) {
			errorMessage += "No valid birthday!\n";
		} else {
			if (!DateUtil.validDate(birthdayField.getText())) {
				errorMessage += "No valid birthday. Use the format dd.mm.yyyy!\n";
			}
		}

		if (errorMessage.length() == 0) {
			return true;
		} else {
			// Show the error message.
			Alert alert = new Alert(Alert.AlertType.ERROR);
			alert.setTitle("Invalid Fields");
			alert.setHeaderText("Please correct invalid fields");
			alert.setContentText(errorMessage);
			alert.showAndWait();

			return false;
		}
	}
}