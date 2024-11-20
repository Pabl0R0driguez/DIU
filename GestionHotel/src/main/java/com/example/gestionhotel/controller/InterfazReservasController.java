package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.view.Cliente;
import com.example.gestionhotel.view.Reserva;
import eu.hansolo.toolbox.observables.ObservableList;
import javafx.collections.FXCollections;
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
            llegadaLabel.setText(String.valueOf(reserva.getFechaLlegada2()));
            numeroHabLabel.setText(String.valueOf(reserva.getNumeroHabitaciones2()));
            tipoHabLabel.setText(String.valueOf(reserva.getTipoHabitacion2()));
            fuamadorLabel.setText(String.valueOf(reserva.isFumador2()));
            regimenLabel.setText(String.valueOf(reserva.getRegimenAlojamiento2()));



        } else {
            // Si el objeto Cliente es nulo, borra todo el texto.
            salidaLabel.setText("");
            llegadaLabel.setText("");
            numeroHabLabel.setText("");
            tipoHabLabel.setText("");
            fuamadorLabel.setText("");
            regimenLabel.setText("");

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
        tablaReservas.setItems(mainApp.getReservasData());

    }
    public void setDialogStage(Stage dialogStage) {
    }



    public void setReserva(Reserva reserva) {
        this.reserva = reserva;


    }
    }

