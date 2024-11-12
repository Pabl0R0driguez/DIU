package com.example.gestionhotel;

import com.example.gestionhotel.controller.InterfazPrincipalController;
import com.example.gestionhotel.controller.PersonEditDialogController;
import com.example.gestionhotel.model.ClienteVO;
import com.example.gestionhotel.model.ExcepcionCliente;
import com.example.gestionhotel.model.HotelModelo;
import com.example.gestionhotel.model.repository.impl.ClienteRepositoryImpl;
import com.example.gestionhotel.view.Cliente;
import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Modality;
import javafx.stage.Stage;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

public class MainApp extends Application {

    private static ObservableList<Cliente> clienteLista = FXCollections.observableArrayList();
    private HotelModelo hotelModelo;

    private Stage primaryStage;
    private BorderPane rootLayout;


    public MainApp() throws SQLException, ExcepcionCliente {
        ClienteRepositoryImpl clienteRepository = new ClienteRepositoryImpl();

        //Obterner lista de personas en la base de datos
        ArrayList<ClienteVO> lista = clienteRepository.ObtenerListaPersonas();
        for(ClienteVO cliente : lista) {
            System.out.println("Cliente: " + cliente.getNombre() + " " + cliente.getApellidos());
        }

        hotelModelo = new HotelModelo();
        try {
            hotelModelo.setClienteRepository(clienteRepository);
            clienteLista.addAll(hotelModelo.setCliente());
        } catch (SQLException e) {
            System.err.println("Error al establecer la lista de clientes: " + e.getMessage());
            e.printStackTrace();
        } catch (ExcepcionCliente e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    public void start(Stage stage) throws IOException {
        // Guardamos la referencia del escenario principal
        this.primaryStage = stage;
        this.primaryStage.setTitle("Gestión Hotel");

        // Inicializamos el diseño raíz
        iniciarDiseñoRaiz();

        // Muestra la vista de las personas
        mostrarInterfazPrincipal();



    }

    //Metodo para recuperar lista de clientes
    public ObservableList<Cliente> getClientesData(){
        return clienteLista;
    }


    public HotelModelo getHotelModelo() {
        return hotelModelo;
    }


    public void iniciarDiseñoRaiz() {
        try {
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/gestionhotel/DiseñoRaiz.fxml"));
            rootLayout = (BorderPane) loader.load();

            Scene scene = new Scene(rootLayout);
            primaryStage.setScene(scene);
            primaryStage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //La usaré a la hora de añadir clientes en InterfazPrincipalController
    public void mostrarInterfazPrincipal() {
        try {
            FXMLLoader loader = new FXMLLoader(MainApp.class.getResource("/com/example/gestionhotel/InterfazPrincipal.fxml"));

            AnchorPane personOverview = (AnchorPane) loader.load();

            // Establece la vista de personas en el centro del diseño raíz
            rootLayout.setCenter(personOverview);

            // Proporciona acceso al controlador a la instancia de MainApp
            InterfazPrincipalController controller = loader.getController();
            controller.setMainApp(this);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    // Muestra un diálogo para editar un cliente
    public boolean mostrarInteraccionPersona(Cliente cliente) {
        try {
            // Cargar la interfaz FXML para la edición del cliente
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/gestionhotel/InteraccionPersona.fxml"));
            AnchorPane page = (AnchorPane) loader.load();

            // Crear una nueva ventana (Stage) para el diálogo
            Stage dialogStage = new Stage();
            dialogStage.setTitle("Editar Cliente");
            dialogStage.initModality(Modality.NONE);  // Puedes probar con Modality.APPLICATION_MODAL si lo deseas
            dialogStage.initOwner(primaryStage);
            Scene scene = new Scene(page);
            dialogStage.setScene(scene);

            // Obtener el controlador de la vista y configurarlo
            PersonEditDialogController controller = loader.getController();
            controller.setDialogStage(dialogStage);
            controller.setCliente(cliente);

            // Mostrar la ventana del diálogo y esperar a que se cierre
            dialogStage.showAndWait();

            // Devolver si el usuario hizo clic en el botón "OK" en el diálogo
            return controller.isOkClicked();

        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }




    public static void main(String[] args) {
        launch();
    }
}
