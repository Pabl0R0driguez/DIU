package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.model.ExcepcionCliente;
import com.example.gestionhotel.model.HotelModelo;
import com.example.gestionhotel.util.ClienteUtil;
import com.example.gestionhotel.view.Cliente;
import com.example.gestionhotel.view.Reserva;
import javafx.fxml.FXML;
import javafx.event.ActionEvent; // <-- Asegúrate de usar javafx.event.ActionEvent
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;

import java.io.IOException;
import java.sql.SQLException;

public class InterfazPrincipalController {

    @FXML
    private TableColumn<Cliente, String> apellidoColumna;

    @FXML
    private TableColumn<Cliente, String> nombreColumna;

    @FXML
    private TableView<Cliente> tablaPersonas;

    @FXML
    private Label dniLabel;

    @FXML
    private Label nombreLabel;

    @FXML
    private Label apellidosLabel;

    @FXML
    private Label direccionLabel;

    @FXML
    private Label localidadLabel;

    @FXML
    private Label provinciaLabel;


    private MainApp mainApp;
    private HotelModelo hotelModelo;

    @FXML
    private void initialize() {
        // Initialize the person table with the two columns.
        nombreColumna.setCellValueFactory(cellData -> cellData.getValue().getNombreProperty());
        apellidoColumna.setCellValueFactory(cellData -> cellData.getValue().getApellidosProperty());

        showClienteDetails(null);
        // Listen for selection changes and show the person details when changed.
        tablaPersonas.getSelectionModel().selectedItemProperty().addListener(
                (observable, oldValue, newValue) -> showClienteDetails(newValue));

    }

    private void showClienteDetails(Cliente cliente) {
        if (cliente != null) {
            // Rellena las etiquetas con información del objeto Cliente.
            nombreLabel.setText(cliente.getNombre());
            apellidosLabel.setText(cliente.getApellidos());
            direccionLabel.setText(cliente.getDireccion());
            localidadLabel.setText(cliente.getLocalidad());
            provinciaLabel.setText(cliente.getProvinica());
            dniLabel.setText(cliente.getDni());

        } else {
            // Si el objeto Cliente es nulo, borra todo el texto.
            nombreLabel.setText("");
            apellidosLabel.setText("");
            direccionLabel.setText("");
            localidadLabel.setText("");
            provinciaLabel.setText("");
            dniLabel.setText("");
        }
    }

    @FXML
    private void btAñadir() throws ExcepcionCliente {
        Cliente clienteTemporal = new Cliente();
        boolean onClicked = mainApp.mostrarInteraccionPersona(clienteTemporal);
        if(onClicked){
            //Interfaz
            mainApp.getClientesData().add(clienteTemporal);
            mainApp.getHotelModelo().getClienteRepository().addPersona(ClienteUtil.parseToClienteVO(clienteTemporal));
        }

    }

    @FXML
    void btModificar(ActionEvent event) throws ExcepcionCliente {
        Cliente clienteSeleccionado = tablaPersonas.getSelectionModel().getSelectedItem();
        if (clienteSeleccionado != null) {
            boolean onClick = mainApp.mostrarInteraccionPersona(clienteSeleccionado);
            if (onClick) {
                //Actualizamos el cliente en nuestra lista observable
                showClienteDetails(clienteSeleccionado);
                //Actualizamos registro en la base de datos
                mainApp.getHotelModelo().getClienteRepository().editPersona(ClienteUtil.parseToClienteVO(clienteSeleccionado));
            } else {
                // Nothing selected.
                Alert alert = new Alert(Alert.AlertType.WARNING);
                alert.setTitle("No seleccionado");
                alert.setHeaderText("No hay cliente seleccionado");
                alert.setContentText("Porfavor selecciona un cliente de la tabla");
                alert.showAndWait();
            }

        }
    }


    @FXML
    void btBorrar(ActionEvent event) throws SQLException, ExcepcionCliente {

        int indexSeleccionado = tablaPersonas.getSelectionModel().getSelectedIndex();

            String dniPersona = tablaPersonas.getSelectionModel().getSelectedItem().getDni();
             if(indexSeleccionado >= 0){
                 tablaPersonas.getItems().remove(indexSeleccionado);
                 mainApp.getHotelModelo().getClienteRepository().deletePersona(dniPersona);

             } else {
                 Alert alert = new Alert(Alert.AlertType.WARNING);
                 alert.setTitle("No Seleccionado");
                 alert.setHeaderText("No hay persona seleccionada");
                 alert.setContentText("Porfavor selecciona una persona en la tabla");
                 alert.showAndWait();
             }



    }




    @FXML
    public void reserva(ActionEvent event) throws ExcepcionCliente, IOException {
        // Obtenemos el cliente seleccionado de la tabla
        Cliente clienteSeleccionado = tablaPersonas.getSelectionModel().getSelectedItem();

        // Verificamos que un cliente haya sido seleccionado
        if (clienteSeleccionado != null) {
            System.out.println("Cliente seleccionado: " + clienteSeleccionado.toString());

            // Guardamos el cliente seleccionado en la variable cliente en el mainApp
            mainApp.setClienteSeleccionado(clienteSeleccionado);
            boolean onClicked = mainApp.mostrarInterfazReservas();  // Se elimina clienteSeleccionado como arg porque éste se puede recoger desde mainApp
            System.out.println("onClicked: " + onClicked);
            // Ahora, pasamos el cliente seleccionado a la interfaz de reservas
        } else {
            // Si no se ha seleccionado un cliente, mostramos un mensaje de error o advertencia
            System.out.println("Por favor, seleccione un cliente de la lista.");
        }
    }



    public void seleccionarClientePorDni(String dni) {
        boolean bandera = false;
        for (Cliente cliente : tablaPersonas.getItems()) {
            if (cliente.getDni().equals(dni)) {
                tablaPersonas.getSelectionModel().select(cliente);
                showClienteDetails(cliente);
                bandera = true;
                break;
            }
        }

        if (!bandera) {
            Alert alert = new Alert(Alert.AlertType.WARNING);
            alert.setTitle("DNI no encontrado");
            alert.setHeaderText("Por favor, inténtelo de nuevo");
            alert.setContentText("No existe un cliente con el siguiente DNI: " + dni);
            alert.showAndWait();
        }
    }


    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;

        // Añadimos la lista observable a la interfaz
        tablaPersonas.setItems(mainApp.getClientesData());

    }

}
