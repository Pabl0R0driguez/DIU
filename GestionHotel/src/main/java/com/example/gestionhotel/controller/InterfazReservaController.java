package com.example.gestionhotel.controller;

import com.example.gestionhotel.view.Cliente;
import javafx.fxml.FXML;
import javafx.scene.control.CheckBox;
import javafx.scene.control.ComboBox;
import javafx.scene.control.DatePicker;
import javafx.scene.control.Spinner;
import javafx.stage.Stage;

import java.awt.event.ActionEvent;

public class InterfazReservaController {
    @FXML
    private DatePicker fechaLlegada;
    @FXML
    private DatePicker fechaSalida;
    @FXML
    private CheckBox fumador;
    @FXML
    private Spinner<Integer> numeroHabitaciones;
    @FXML
    private ComboBox<String> tipoHabitacion;


    public void setDialogStage(Stage dialogStage) {
    }

    public void setCliente(Cliente cliente) {
    }

    public boolean isOkClicked() {
        return false;
    }

    @FXML
   public void Limpiar(ActionEvent event) {

    }

    @FXML
    void Cancelar(ActionEvent event) {

    }

    @FXML
    void Aceptar(ActionEvent event) {

    }

    }

