package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.util.ReservaUtil;
import com.example.gestionhotel.view.Cliente;
import com.example.gestionhotel.view.RegimenAlojamiento;
import com.example.gestionhotel.view.Reserva;
import com.example.gestionhotel.view.TipoHabitacion;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.stage.Stage;

import javafx.event.ActionEvent;

public class ReservaController {
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

    @FXML
    private ToggleGroup grupo;

    @FXML
    private RadioButton aloj_des;

    @FXML
    private RadioButton media;

    @FXML
    private RadioButton completa;


    private Reserva reserva;

    private MainApp mainApp;

    // CAMBIO: añadir vble booleana para controlar si se pulsa el botón de Aceptar.
    private boolean OKClicked;

    private Stage dialogStage;




    @FXML
    private void initialize() {
        // Asegúrate de que el ComboBox contenga los valores de enum
        tipoHabitacion.getItems().addAll(
                "Doble" , "Suite" , "Junior Suite" , "Doble uso Individual"
        );

        grupo = new ToggleGroup();
        aloj_des.setToggleGroup(grupo);
        media.setToggleGroup(grupo);
        completa.setToggleGroup(grupo);


    }



    public void setDialogStage(Stage dialogStage) {
        this.dialogStage=dialogStage;
    }


    public boolean isOkClicked() {
        //return false;
        // Cambio
        return OKClicked;
    }

    public void setReserva(Reserva reserva) {
        // Se pasa la referencia del objeto reserva creado en el controlador InterfazReservasController
        this.reserva =reserva;

        // Se carga en la interfaz gráfica los valores del objeto

//        System.out.println("setReserva " + reserva);
        fechaLlegada.setValue(fechaSalida.getValue());
        fechaSalida.setValue(fechaLlegada.getValue());
        fumador.setSelected(false);
        numeroHabitaciones.getValueFactory().setValue(1);
        tipoHabitacion.setItems(tipoHabitacion.getItems());

    }

    @FXML
    public void Limpiar(ActionEvent event) {

    }

    @FXML
    void Cancelar(ActionEvent event) {
        OKClicked=false;
    }

    @FXML
    void Aceptar(ActionEvent event) {
        // Primero, asegurarte de que la reserva está completa
        System.out.println("reserva antes " + reserva.toString());

        // Rellenar los campos de la reserva que se hubieran recogido en la interfaz gráfica
        reserva.setFechaSalida(fechaSalida.getValue());
        reserva.setFechaLlegada(fechaLlegada.getValue());
        reserva.setFumador(fumador.isSelected());
        reserva.setNumeroHabitaciones(numeroHabitaciones.getValue());

        // Obtener el tipo de habitación seleccionado y asignarlo a la reserva
        String tipoSeleccionado = tipoHabitacion.getValue();
        if (tipoSeleccionado != null) {
            switch (tipoSeleccionado) {
                case "Doble":
                    reserva.setTipoHabitacion(TipoHabitacion.DOBLE);
                    break;
                case "Suite":
                    reserva.setTipoHabitacion(TipoHabitacion.SUITE);
                    break;
                case "Junior Suite":
                    reserva.setTipoHabitacion(TipoHabitacion.JUNIORSUITE);
                    break;
                case "Doble uso Individual":
                    reserva.setTipoHabitacion(TipoHabitacion.DOBLEUSOINDIVIDUAL);
                    break;
            }
        }

        // Asocia la reserva al cliente
        Cliente clienteSeleccionado = mainApp.getClienteSeleccionado(); // Obtén el cliente seleccionado
        if (clienteSeleccionado != null) {
            reserva.setDNI(clienteSeleccionado.getDniProperty().get()); // Asocia el DNI del cliente a la reserva
        }

        // Guardar la nueva reserva en la base de datos   CAMBIO, se guarda en InterfazReservaController en btAñadir
//        mainApp.getHotelModelo().getReservaRepository().añadirReserva(ReservaUtil.parseToReservaVO(reserva));

        // Asegúrate de actualizar la interfaz con la nueva reserva
        System.out.println("reserva al aceptar " + reserva.toString());

        // Confirmamos el estado de haber añadido la reserva
        OKClicked=true;
        dialogStage.close();
    }



    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;

    }

}

