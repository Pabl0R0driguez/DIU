package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.model.ExcepcionCliente;
import javafx.fxml.FXML;
import javafx.stage.Stage;

import java.io.IOException;


public class DiseñoRaizController {
    private MainApp mainApp;
    String dni;
    InterfazPrincipalController interfazPrincipalController;
    boolean onClicked = true;
    Stage stage;

    @FXML
    public void buscarDNI() throws ExcepcionCliente, IOException {
        // La ventana de diálogo se abre desde mainApp para seguir el patrón MVC.
        boolean OnClick = mainApp.mostrarBuscarDNI();
        System.out.println("DNI: " + mainApp.getDniSeleccionado());

        // si se ha tecleado un DNI pasamos a buscar clientes que tuvieran ese DNI. En caso contrario, no se hace nada
        if (OnClick) {
            String dniSeleccionado = mainApp.getDniSeleccionado();
            mainApp.getInterfazPrincipalController().seleccionarReservaPorDNI(dniSeleccionado);  // la acción se realiza en el controlador de clientess.Dise
        }

    }


    @FXML
    public void dobleIndividual() throws IOException {
        if (onClicked) {
            mainApp.mostrarDobleIndividual();
        }
    }



    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;
    }


    }


