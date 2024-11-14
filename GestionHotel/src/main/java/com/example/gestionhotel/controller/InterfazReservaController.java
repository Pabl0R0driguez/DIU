package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.util.ReservaUtil;
import com.example.gestionhotel.view.Cliente;
import com.example.gestionhotel.view.Reserva;
import com.example.gestionhotel.view.TipoHabitacion;
import javafx.fxml.FXML;
import javafx.scene.control.CheckBox;
import javafx.scene.control.ComboBox;
import javafx.scene.control.DatePicker;
import javafx.scene.control.Spinner;
import javafx.stage.Stage;

import javafx.event.ActionEvent;

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


   private Reserva reserva;
    private MainApp mainApp;

    @FXML
    private void initialize() {
        // Asegúrate de que el ComboBox contenga los valores de enum
        tipoHabitacion.getItems().addAll(
                TipoHabitacion.DOBLE.name(),
                TipoHabitacion.SUITE.name(),
                TipoHabitacion.JUNIOR_SUITE.name(),
                TipoHabitacion.DOBLE_USO_INDIVIDUAL.name()
        );
    }



    public void setDialogStage(Stage dialogStage) {
    }


    public boolean isOkClicked() {
        return false;
    }

    public void setReserva(Reserva reserva) {
        this.reserva =reserva;



//        System.out.println("setReserva " + reserva);
//        fechaLlegada.setValue(fechaSalida.getValue());
//        fechaSalida.setValue(fechaLlegada.getValue());
//        fumador.setSelected(false);
//        numeroHabitaciones.getValueFactory().setValue(1);
//        tipoHabitacion.setItems(tipoHabitacion.getItems());

    }

    @FXML
   public void Limpiar(ActionEvent event) {

    }

    @FXML
    void Cancelar(ActionEvent event) {

    }

    @FXML
    void Aceptar(ActionEvent event) {

        System.out.println("reserva antes " + reserva.toString());

        reserva.setFechaSalida(fechaSalida.getValue());
        reserva.setFechaLlegada(fechaLlegada.getValue());
        reserva.setFumador(fumador.isSelected());
        reserva.setNumeroHabitaciones(numeroHabitaciones.getValue());
        // Obtén el tipo de habitación seleccionado y conviértelo a TipoHabitacion
        String tipoSeleccionado = tipoHabitacion.getValue();
        if (tipoSeleccionado != null) {
            reserva.setTipoHabitacion(TipoHabitacion.valueOf(tipoSeleccionado));
        }
        System.out.println("reserva al aceptar " + reserva.toString());
        mainApp.getHotelModelo().getReservaRepository().añadirReserva(ReservaUtil.parseToReservaVO(reserva));



        }

    }

