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
    public void reserva(ActionEvent event) throws ExcepcionCliente, IOException {
        Cliente clienteSeleccionado = tablaPersonas.getSelectionModel().getSelectedItem();

        System.out.println(clienteSeleccionado.toString());
        boolean onClicked = mainApp.mostrarReservas(clienteSeleccionado);
        if(onClicked){
            mainApp.mostrarReservas(clienteSeleccionado);
        }

    }

    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;

        // Add observable list data to the table
        tablaPersonas.setItems(mainApp.getClientesData());
    }

}
