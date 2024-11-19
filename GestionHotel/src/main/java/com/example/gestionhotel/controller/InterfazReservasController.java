package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.view.Cliente;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.event.ActionEvent; // Importación correcta para los eventos


public class InterfazReservasController {

    @FXML
    private Label salidaLabel;

    @FXML
    private Label numeroHabLabel;

    @FXML
    private TableColumn<?, ?> nombreColumna;

    @FXML
    private TableView<?> tablaPersonas;

    @FXML
    private Label regimenLabel;

    @FXML
    private Label llegadaLabel;

    @FXML
    private Label tipoHabLabel;

    @FXML
    private Label fuamadorLabel;

    MainApp mainApp;
    Cliente cliente;

        @FXML
        void btAñadir(ActionEvent event) {


        }

        @FXML
        void btModificar (ActionEvent event){

        }

        @FXML
        void btBorrar (ActionEvent event){

        }

    }

