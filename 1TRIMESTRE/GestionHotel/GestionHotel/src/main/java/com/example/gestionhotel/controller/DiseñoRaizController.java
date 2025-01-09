package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import javafx.fxml.FXML;
import javafx.scene.control.TextInputDialog;

import java.util.Optional;


public class DiseñoRaizController {
    private MainApp mainApp;




    @FXML
    public void buscarDNI() {
        TextInputDialog dialog = new TextInputDialog();
        dialog.setTitle("Ingreso de DNI");
        dialog.setHeaderText("Por favor, ingrese el DNI del cliente.");
        dialog.setContentText("DNI:");

        Optional<String> result = dialog.showAndWait();

        result.ifPresent(dni -> { mainApp.setDniSeleccionado(dni);

            InterfazPrincipalController interfazPrincipalController = mainApp.getInterfazPrincipalController();
            interfazPrincipalController.seleccionarClientePorDni(dni);
        });
    }
    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;
    }


    }


