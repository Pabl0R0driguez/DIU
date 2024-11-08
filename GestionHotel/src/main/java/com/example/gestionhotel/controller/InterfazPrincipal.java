package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.view.Cliente;
import javafx.fxml.FXML;
import javafx.event.ActionEvent; // <-- Asegúrate de usar javafx.event.ActionEvent
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;

public class InterfazPrincipal {

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

    @FXML
    private void initialize() {
        // Initialize the person table with the two columns.
        nombreColumna.setCellValueFactory(cellData -> cellData.getValue().nombreProperty());
        apellidoColumna.setCellValueFactory(cellData -> cellData.getValue().apellidosProperty());

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
            provinciaLabel.setText(cliente.getProvincia());
            dniLabel.setText(cliente.getDNI());

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
        int idPersona = Integer.parseInt(tablaPersonas.getSelectionModel().getSelectedItem().getDNI());

        System.out.println("indice: " + selectedIndex);
        System.out.println("código de la persona: " + idPersona);

    }

    @FXML
    void btAñadir(ActionEvent event) {

    }

}
