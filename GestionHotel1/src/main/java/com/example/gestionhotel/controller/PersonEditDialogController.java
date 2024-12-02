package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.model.ClienteVO;
import com.example.gestionhotel.model.ExcepcionCliente;
import com.example.gestionhotel.view.Cliente;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.ProgressIndicator;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.sql.SQLException;
import java.util.ArrayList;

public class PersonEditDialogController {

    @FXML
    private TextField dniField;
    @FXML
    private TextField nombreField;
    @FXML
    private TextField apellidosField;
    @FXML
    private TextField direccionField;
    @FXML
    private TextField localidadField;
    @FXML
    private TextField provinciaField;
    @FXML
    private ProgressIndicator barraIndicador;
    @FXML
    private ProgressBar barraProgreso;

    private Stage dialogStage;
    private Cliente cliente;
    private boolean okClicked = false;
    private MainApp mainApp;
    private static final String LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";

    private boolean isEditMode; // Variable para determinar si estamos en modo edición

    public void setBarraIndicador(double progreso) {
        barraProgreso.setProgress(progreso);
    }

    public void setBarraProgreso(double barraProgreso) {
        barraIndicador.setProgress(barraProgreso);
    }

    @FXML
    private void initialize() {
        dniField.setEditable(!isEditMode); // Establecer la editabilidad del campo DNI
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

    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;
    }

    public void setEditMode(boolean editMode) {
        this.isEditMode = editMode;
    }

    @FXML
    public void botonOk() throws ExcepcionCliente, SQLException {
        if (isInputValid()) {
            if (!validarDNI(dniField.getText())) {
                showAlert("DNI no válido", "Error de datos", "Lo siento, el DNI no es válido");
                return;
            }

            if (dniExistente(dniField.getText())) {
                showAlert("DNI ya existente", "Error de datos", "Lo siento, el DNI ya está registrado");
                return;
            }

            // Asignar valores a las propiedades del cliente
            cliente.setNombreProperty(nombreField.getText());
            cliente.setApellidosProperty(apellidosField.getText());
            cliente.setDireccionProperty(direccionField.getText());
            cliente.setLocalidadProperty(localidadField.getText());
            cliente.setProvinicaProperty(provinciaField.getText());
            cliente.setDniProperty(dniField.getText());

            okClicked = true;
            dialogStage.close();
        }
    }

    @FXML
    public void botonCancelar() {
        dialogStage.close();
    }

    public static boolean validarDNI(String dni) {
        if (dni == null || dni.length() != 9) {
            return false;
        }

        String numeroDNI = dni.substring(0, 8);
        char letraDNI = Character.toUpperCase(dni.charAt(8));

        if (!numeroDNI.matches("\\d+")) {
            return false;
        }

        int numero = Integer.parseInt(numeroDNI);
        char letraEsperada = LETRAS_DNI.charAt(numero % 23);
        return letraDNI == letraEsperada;
    }

    public boolean dniExistente(String dni) throws ExcepcionCliente, SQLException {
        ArrayList<ClienteVO> listaPersonas = mainApp.getHotelModelo().getClienteRepository().ObtenerListaPersonas();
        for (ClienteVO cliente : listaPersonas) {
            if (cliente.getDNI().equals(dni)) {
                return true;
            }
        }
        return false;
    }

    private boolean isInputValid() {
        String errorMessage = "";

        if (dniField.getText() == null || dniField.getText().length() == 0) {
            errorMessage += "DNI inválido!\n";
        }
        if (nombreField.getText() == null || nombreField.getText().length() == 0) {
            errorMessage += "Nombre inválido!\n";
        }
        if (apellidosField.getText() == null || apellidosField.getText().length() == 0) {
            errorMessage += "Apellidos inválidos!\n";
        }
        if (direccionField.getText() == null || direccionField.getText().length() == 0) {
            errorMessage += "Dirección inválida!\n";
        }
        if (localidadField.getText() == null || localidadField.getText().length() == 0) {
            errorMessage += "Localidad inválida!\n";
        }
        if (provinciaField.getText() == null || provinciaField.getText().length() == 0) {
            errorMessage += "Provincia inválida!\n";
        }

        if (errorMessage.length() == 0) {
            return true;
        } else {
            showAlert("Campos inválidos", "Por favor, introduce campos correctos", errorMessage);
            return false;
        }
    }

    private void showAlert(String title, String header, String content) {
        Alert alert = new Alert(Alert.AlertType.ERROR);
        alert.setTitle(title);
        alert.setHeaderText(header);
        alert.setContentText(content);
        alert.showAndWait();
    }
}
