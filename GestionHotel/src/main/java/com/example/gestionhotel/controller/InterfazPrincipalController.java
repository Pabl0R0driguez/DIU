package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.model.HotelModelo;
import com.example.gestionhotel.util.ClienteUtil;
import com.example.gestionhotel.view.Cliente;
import com.sun.tools.javac.Main;
import javafx.fxml.FXML;
import javafx.event.ActionEvent; // <-- Asegúrate de usar javafx.event.ActionEvent
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;

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
    void btModificar(ActionEvent event) {


    }


    @FXML
    void btBorrar(ActionEvent event) {
        int selectedIndex = tablaPersonas.getSelectionModel().getSelectedIndex();

        // Obtener el id de la persona a borrar
        System.out.println("indice: " + selectedIndex);

    }

    @FXML
    void btAñadir() throws SQLException {
    Cliente clienteTemporal = new Cliente();
    boolean onClicked = mainApp.mostrarInteraccionPersona(clienteTemporal);
    if(onClicked){
    mainApp.getHotelModelo().getClienteRepository().addPersona(ClienteUtil.parseToClienteVO(clienteTemporal));
    }

    }


    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;

        // Add observable list data to the table
        tablaPersonas.setItems(mainApp.getClienteLista());
    }

}
