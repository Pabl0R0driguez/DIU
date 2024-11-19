package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.view.Cliente;
import com.example.gestionhotel.view.Reserva;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.event.ActionEvent; // Importación correcta para los eventos
import javafx.stage.Stage;

import java.io.IOException;
import java.time.LocalDate;


public class InterfazReservasController {

    @FXML
    private Label salidaLabel;

    @FXML
    private Label numeroHabLabel;

    @FXML
    private TableColumn<Reserva, LocalDate> fechaLlegada;

    @FXML
    private TableColumn<Reserva, LocalDate> fechaSalida;

    @FXML
    private TableView<Reserva> tablaReservas;

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
    Reserva reserva;



    @FXML
    private void initialize() {
        fechaLlegada.setCellValueFactory(cellData -> cellData.getValue().fechaLlegadaProperty());
        fechaSalida.setCellValueFactory(cellData -> cellData.getValue().fechaSalidaProperty());

        showReservasDetails(null);
        // Listen for selection changes and show the person details when changed.
        tablaReservas.getSelectionModel().selectedItemProperty().addListener(
                (observable, oldValue, newValue) -> showReservasDetails(newValue));

    }

    private void showReservasDetails(Reserva reserva) {
        if (reserva != null) {
            // Rellena las etiquetas con información del objeto Reserva.
            salidaLabel.setText(String.valueOf(reserva.getFechaSalida2()));
            llegadaLabel.setText(String.valueOf(reserva.getFechaSalida2()));


        } else {
            // Si el objeto Cliente es nulo, borra todo el texto.
            salidaLabel.setText("");
            llegadaLabel.setText("");
            }
    }

        @FXML
        void btAñadir(ActionEvent event) throws IOException {
           mainApp.mostrarReservas(cliente);

        }

        @FXML
        void btModificar (ActionEvent event){

        }

        @FXML
        void btBorrar (ActionEvent event){

        }

    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;

    }
    public void setDialogStage(Stage dialogStage) {
    }



    public void setReserva(Reserva reserva) {
        this.reserva = reserva;


    }
    }

