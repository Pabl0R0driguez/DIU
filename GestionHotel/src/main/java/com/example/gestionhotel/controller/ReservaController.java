package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.util.ReservaUtil;
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
        System.out.println("tipo hab seleccionado: " + tipoSeleccionado);
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

            RadioButton seleccionado = (RadioButton) grupo.getSelectedToggle();
            if (seleccionado != null) {
                String regimenSeleccionado = seleccionado.getText();
                System.out.println("tipo seleccionado" + regimenSeleccionado);

                switch (regimenSeleccionado) {
                    case "Alojamiento y desayuno":
                        reserva.setRegimenAlojamiento(RegimenAlojamiento.ALOJAMIENTO_DESAYUNO);
                        break;
                    case "Media pension":
                        reserva.setRegimenAlojamiento(RegimenAlojamiento.MEDIAPENSION);
                        break;
                    case "Pension completa":
                        reserva.setRegimenAlojamiento(RegimenAlojamiento.PENSIONCOMPLETA);
                        break;
                }

            }


            System.out.println("reserva al aceptar " + reserva.toString());
            mainApp.getHotelModelo().getReservaRepository().añadirReserva(ReservaUtil.parseToReservaVO(reserva));


        }


    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;

    }

    }

