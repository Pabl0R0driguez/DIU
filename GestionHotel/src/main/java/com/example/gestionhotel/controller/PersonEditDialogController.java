package com.example.gestionhotel.controller;

import com.example.gestionhotel.view.Cliente;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.ProgressIndicator;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.awt.event.ActionEvent;

public class PersonEditDialogController {

    @FXML
    private TextField dniField;



    @FXML
    private TextField apellidosField;

    @FXML
    private ProgressIndicator barraIndicador;

    @FXML
    private TextField localidadField;

    @FXML
    private ProgressBar barraProgreso;

    @FXML
    private TextField direccionField;

    @FXML
    private TextField provinciaField;

    @FXML
    private TextField nombreField;

    private Stage dialogStage;
    private Cliente cliente;
    private boolean okClicked = false;


    public void setBarraIndicador(Stage dialogStage) {
     this.dialogStage = dialogStage;
    }

    public void setBarraProgreso(double barraProgreso) {
        this.barraIndicador.setProgress(barraProgreso);    }

    @FXML
    private void initialize() {
    }

    public void setDialogStage(Stage dialogStage) {
        this.dialogStage = dialogStage;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;

        dniField.setText(cliente.getDni());
        nombreField.setText(cliente.getNombre());
        apellidosField.setText(cliente.getApellidos());
        direccionField.setText(cliente.getDireccion());
        localidadField.setText(cliente.getLocalidad());
        provinciaField.setText(cliente.getProvinica());

    }

    public boolean isOkClicked() {
        return okClicked;
    }


    @FXML
    public void botonOk() {
        if(isInputValid()) {
            cliente.setNombreProperty(nombreField.getText());
            cliente.setApellidosProperty(apellidosField.getText());
            cliente.setDireccionProperty(direccionField.getText());
            cliente.setLocalidadProperty(localidadField.getText());
            cliente.setProvinicaProperty(provinciaField.getText());
            cliente.setDniProperty(dniField.getText());

        }
        okClicked = true;
        dialogStage.close();

    }

    @FXML
    public void botonCancelar() {
        dialogStage.close();

    }

    private boolean isInputValid() {
        String errorMessage = "";

        // Validación del DNI
        String dni = dniField.getText();
        if (dni == null || dni.length() == 0) {
            errorMessage += "DNI inválido!\n";
        } else {
            // Validación del formato del DNI (8 números y una letra)
            if (!dni.matches("\\d{8}[A-Za-z]")) {
                errorMessage += "DNI debe tener 8 dígitos seguidos de una letra!\n";
            }
        }

        // Validación del nombre
        String nombre = nombreField.getText();
        if (nombre == null || nombre.length() == 0) {
            errorMessage += "Nombre inválido!\n";
        }

        // Validación de los apellidos
        String apellidos = apellidosField.getText();
        if (apellidos == null || apellidos.length() == 0) {
            errorMessage += "Apellidos inválidos!\n";
        }

        // Validación de la localidad
        String localidad = direccionField.getText();
        if (localidad == null || localidad.length() == 0) {
            errorMessage += "Localidad inválida!\n";
        }

        // Validación de la provincia
        String provincia = localidadField.getText();
        if (provincia == null || provincia.length() == 0) {
            errorMessage += "Provincia inválida!\n";
        }

        // Validación de la dirección
        String direccion = provinciaField.getText();
        if (direccion == null || direccion.length() == 0) {
            errorMessage += "Dirección inválida!\n";
        }

        // Si no hay errores, la entrada es válida
        if (errorMessage.length() == 0) {
            return true;
        } else {
            // Mostrar mensaje de advertencia si hay campos inválidos
            Alert alert = new Alert(Alert.AlertType.WARNING);
            alert.setTitle("Campos inválidos");
            alert.setHeaderText("Por favor, introduce campos correctos");
            alert.setContentText(errorMessage);
            alert.showAndWait();
            return false;
        }
    }


}
