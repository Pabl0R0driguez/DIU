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

import java.time.LocalDate;

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
    private ToggleGroup grupoRegimen;

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



        grupoRegimen = new ToggleGroup();
        aloj_des.setToggleGroup(grupoRegimen);
        media.setToggleGroup(grupoRegimen);
        completa.setToggleGroup(grupoRegimen);


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
        fechaLlegada.setValue(fechaLlegada.getValue());
        fechaSalida.setValue(fechaSalida.getValue());
        fumador.setSelected(false);
        numeroHabitaciones.getValueFactory().setValue(1);
        tipoHabitacion.setItems(tipoHabitacion.getItems());
        fumador.setSelected(true);
        grupoRegimen.selectToggle(grupoRegimen.getSelectedToggle());

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


        while(    !(fechaLlegada.getValue().isBefore(fechaSalida.getValue())  || fechaLlegada.getValue().isEqual(fechaSalida.getValue())  )  &&
                   (fechaLlegada.getValue().isBefore(LocalDate.now())   ||       fechaLlegada.getValue().isEqual(LocalDate.now())   )   &&
                   (fechaSalida.getValue().isAfter(LocalDate.now())  ||          fechaSalida.getValue().isEqual(LocalDate.now())) ) {
            Alert alert = new Alert(Alert.AlertType.ERROR); // Crear un cuadro de diálogo de tipo ERROR
            alert.setTitle("Fecha errónea");                   // Título del diálogo
            alert.setContentText("Introduzca una fecha válida ");           // Mensaje principal
            alert.showAndWait();                     // Mostrar el diálogo y esperar acción del usuario
            alert.close();
        }
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

        reserva.setFumador(fumador.isSelected());
        // Verificar que hay un ToggleButton seleccionado
        if (grupoRegimen.getSelectedToggle() != null) {
            // Obtener el valor de userData
            String regimenSeleccionado = grupoRegimen.getSelectedToggle().getUserData().toString();

            // Asegurarse de que el régimen seleccionado no sea null
            if (regimenSeleccionado != null) {
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
                    default:
                        System.out.println("Régimen no reconocido");
                }
            }
        } else {
            // Si no hay ningún ToggleButton seleccionado
            System.out.println("No se ha seleccionado ningún régimen.");
        }
        // Confirmamos el estado de haber añadido la reserva
        OKClicked=true;
        dialogStage.close();
    }



    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;


    }

}

