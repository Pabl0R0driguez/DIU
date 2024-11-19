package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.view.Cliente;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.TextInputDialog;
import javafx.collections.ObservableList;

import java.util.Optional;

public class DiseñoRaizController {
    private MainApp mainApp;
    private InterfazPrincipalController interfazPrincipalController; // Controlador principal
    private ObservableList<Cliente> clientes; // Lista de clientes

    // Establecer el controlador principal y la lista de clientes
    public void setInterfazPrincipalController(InterfazPrincipalController interfazPrincipalController) {
        this.interfazPrincipalController = interfazPrincipalController;
        this.clientes = interfazPrincipalController.getClientes();  // Obtener lista de clientes del controlador principal
    }

    @FXML
    public void buscarDNI() {
        // Crear el cuadro de texto para ingresar el DNI
        TextInputDialog dialog = new TextInputDialog();
        dialog.setTitle("Ingreso de DNI");
        dialog.setHeaderText("Por favor, ingrese el DNI del cliente.");
        dialog.setContentText("DNI:");

        Optional<String> result = dialog.showAndWait();

        result.ifPresent(dni -> {
            // Llamar al método de búsqueda
            buscarClientePorDNI(dni);
        });
    }

    // Método para buscar el cliente por DNI en la lista
    private void buscarClientePorDNI(String dni) {
        Cliente clienteEncontrado = null;

        // Recorrer la lista de clientes para buscar el DNI
        for (Cliente cliente : clientes) {
            if (cliente.getDni().equals(dni)) {
                clienteEncontrado = cliente;
                break;
            }
        }

        // Si se encuentra el cliente, lo mostramos
        if (clienteEncontrado != null) {
            // Mostrar el cliente en la UI (puedes hacerlo a través de la tabla o de los campos correspondientes)
            interfazPrincipalController.mostrarCliente(clienteEncontrado);  // Método que selecciona el cliente en la tabla
        } else {
            // Si no se encuentra, mostramos un mensaje de error
            Alert alert = new Alert(AlertType.ERROR);
            alert.setTitle("Cliente no encontrado");
            alert.setHeaderText(null);
            alert.setContentText("No se ha encontrado ningún cliente con el DNI ingresado.");
            alert.showAndWait();
        }
    }
}
