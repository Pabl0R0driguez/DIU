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
    MainApp mainApp;
    private static final String LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";



    public void setBarraIndicador(double progreso) {
    barraProgreso.setProgress(progreso);
    }

    public void setBarraProgreso(double barraProgreso) {
      barraIndicador.setProgress(barraProgreso);    }

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
    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;
    }



    @FXML
    public void botonOk() throws ExcepcionCliente, SQLException {
        try {
            if (!(validarDNI(dniField.getText()))) {
                Alert alert = new Alert(Alert.AlertType.ERROR);
                alert.setTitle("DNI no valido");
                alert.setHeaderText("Error de datos");
                alert.setContentText("Lo siento, el DNI no es valido");
                alert.showAndWait();
            } else {
                if (dniExistente(dniField.getText())) {
                    Alert alert = new Alert(Alert.AlertType.ERROR);
                    alert.setTitle("DNI ya existente");
                    alert.setHeaderText("Error de datos");
                    alert.setContentText("Lo siento, el DNI ya esta registrado");
                    alert.showAndWait();
                } else {
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
        } catch (Exception e) {
            e.printStackTrace();

        }
    }
    @FXML
    public void botonCancelar() {
        dialogStage.close();

    }
    public static boolean validarDNI(String dni) {
        // Verifica que el DNI tenga 9 caracteres
        if (dni == null || dni.length() != 9) {
            return false;
        }

        // Divide la parte numérica y la letra
        String numeroDNI = dni.substring(0, 8); // Los primeros 8 caracteres
        char letraDNI = Character.toUpperCase(dni.charAt(8)); // El último carácter

        // Verifica que los 8 primeros caracteres sean números
        if (!numeroDNI.matches("\\d+")) {
            return false;
        }

        // Calcula la letra esperada según los números
        int numero = Integer.parseInt(numeroDNI);
        char letraEsperada = LETRAS_DNI.charAt(numero % 23);

        // Compara la letra calculada con la proporcionada
        return letraDNI == letraEsperada;
    }

    public boolean dniExistente(String dni) throws ExcepcionCliente, SQLException {
        ArrayList<ClienteVO> listaPersonas=mainApp.getHotelModelo().getClienteRepository().ObtenerListaPersonas();
        boolean existe=false;
        for (ClienteVO cliente : listaPersonas) {
            if(cliente.getDNI().equals(dni)) {
                existe=true;
                break;
            }
        }
        return existe;
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
