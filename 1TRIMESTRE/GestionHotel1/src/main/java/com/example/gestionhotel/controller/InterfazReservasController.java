package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.util.ReservaUtil;
import com.example.gestionhotel.view.Cliente;
import com.example.gestionhotel.view.Reserva;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
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
    private TableColumn<Reserva, LocalDate> fechaLlegada1;

    @FXML
    private TableColumn<Reserva, LocalDate> fechaSalida2;

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
    private Stage dialogstage;


    @FXML
    private void initialize() {
        fechaLlegada1.setCellValueFactory(cellData -> cellData.getValue().fechaLlegadaProperty());
        fechaSalida2.setCellValueFactory(cellData -> cellData.getValue().fechaSalidaProperty());

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

            // Cambiamos los valores de la tabla observable
            switch (reserva.getTipoHabitacion2().toString()) {
                case "DOBLE":
                    tipoHabLabel.setText("Doble");
                    break;
                case "SUITE":
                    tipoHabLabel.setText("Suite");
                    break;
                case "JUNIORSUITE":
                    tipoHabLabel.setText("Junior Suite");
                    break;
                case "DOBLEUSOINDIVIDUAL":
                    tipoHabLabel.setText("Doble uso Individual");
                    break;
            }

            // Cambiar texto si es o no fumador
            if(reserva.isFumador2()== true){
                fuamadorLabel.setText("Fumador");
            }else{
                fuamadorLabel.setText("No fumador");
            }


            switch (reserva.getRegimenAlojamiento2().toString()) {
                case "ALOJAMIENTO_DESAYUNO":
                    regimenLabel.setText("Alojamiento y desayuno");
                    break;
                case "MEDIAPENSION":
                    regimenLabel.setText("Media pensión");
                    break;
                case "PENSIONCOMPLETA":
                    regimenLabel.setText("Pensión completa");
                    break;
                default:
                    System.out.println("Régimen no reconocido");

            }




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
        // Obtener el cliente previamente seleccionado
        Cliente clienteSeleccionado = mainApp.getClienteSeleccionado(); // Este debe ser el cliente previamente seleccionado
        if (clienteSeleccionado != null) {
            // Si el cliente está seleccionado, entonces puedes asociarlo con la reserva
            System.out.println("Cliente seleccionado: " + clienteSeleccionado);

            // Crea una nueva reserva VACIA y añade el cliente a la reserva
            Reserva reservaTemporal = new Reserva();
            reservaTemporal.setDNI(clienteSeleccionado.getDniProperty().get()); // Asocia el DNI del cliente a la reserva

            // Mostrar las reservas y agregar la nueva reserva
            boolean onClicked = mainApp.mostrarReservas(reservaTemporal);   //se pasa la referencia de reservaTemporal. Antes se pasaba clienteSeleccionado
            if (onClicked) {   //CAMBIO: se vuelve a poner aquí el añadirReserva.
                mainApp.getReservasData().add(reservaTemporal);   // se añadir la reserva a la lista observable
                tablaReservas.setItems(mainApp.getReservasData());   // se añadir a la interfaz gráfica a tablaReservas
                mainApp.getHotelModelo().getReservaRepository().añadirReserva(ReservaUtil.parseToReservaVO(reservaTemporal));   // se añade a la base de datos
            }
        } else {
            // Si no hay cliente seleccionado, mostrar un mensaje o advertencia
            System.out.println("No se ha seleccionado un cliente");
        }
    }



    @FXML
    void btModificar (ActionEvent event) throws IOException {

        Reserva reservaSeleccionada = tablaReservas.getSelectionModel().getSelectedItem();

        //Si la reserva no es nula y la fecha de salida es despues o igual que ahora se puede modificar
        if (reservaSeleccionada != null &&
                (reservaSeleccionada.getFechaSalida2().isAfter(LocalDate.now()) || reservaSeleccionada.getFechaSalida2().isEqual(LocalDate.now()))) {
            // Si una reserva ha sido seleccionada, procedemos con la modificación
            boolean onClick = mainApp.mostrarReservas(reservaSeleccionada);  // Llamada para mostrar la interfaz de reservas
            if (onClick) {
                // Mostrar los detalles de la reserva seleccionada en la interfaz

                showReservasDetails(reservaSeleccionada);
                System.out.println("Interfaz reserva controller:" + reservaSeleccionada);
                // Modificar el registro de la reserva en la base de datos
                mainApp.getHotelModelo().getReservaRepository().modificarReserva(ReservaUtil.parseToReservaVO(reservaSeleccionada));
            }
        } else {
            // Si no se ha seleccionado ninguna reserva, mostrar un mensaje de advertencia
            Alert alert = new Alert(Alert.AlertType.WARNING);
            alert.setTitle("No seleccionado");
            alert.setHeaderText("No hay reserva seleccionada");
            alert.setContentText("Por favor, selecciona una reserva en la tabla.");
            alert.showAndWait();
        }
    }



    @FXML
    void btBorrar (ActionEvent event){
        int indexSeleccionado = tablaReservas.getSelectionModel().getSelectedIndex();

        int codigo_reserva = tablaReservas.getSelectionModel().getSelectedItem().getIdReserva2();
        if(indexSeleccionado >= 0){
            tablaReservas.getItems().remove(indexSeleccionado);
            mainApp.getHotelModelo().getReservaRepository().eliminarReserva(codigo_reserva);

        } else {
            Alert alert = new Alert(Alert.AlertType.WARNING);
            alert.setTitle("No Seleccionado");
            alert.setHeaderText("No hay persona seleccionada");
            alert.setContentText("Porfavor selecciona una persona en la tabla");
            alert.showAndWait();
        }

    }



    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;
        tablaReservas.setItems(mainApp.getReservasData());

    }
    public void setDialogStage(Stage dialogStage) {
        this.dialogstage = dialogStage;
    }



    public void setReserva(Reserva reserva) {
        this.reserva = reserva;


    }
}

