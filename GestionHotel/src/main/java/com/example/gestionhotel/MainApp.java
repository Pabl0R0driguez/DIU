package com.example.gestionhotel;

import com.example.gestionhotel.controller.InterfazPrincipalController;
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
import javafx.stage.Stage;

import java.io.IOException;
import java.sql.SQLException;

public class MainApp extends Application {

    private static ObservableList<Cliente> clienteLista = FXCollections.observableArrayList();
    private HotelModelo hotelModelo;

    // Eliminar static de primaryStage
    private static Stage primaryStage;
    private BorderPane rootLayout;

    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(MainApp.class.getResource("InterfazDatos.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 320, 240);
        stage.setTitle("Hello!");
        stage.setScene(scene);
        stage.show();
    }

    public MainApp(){
        ClienteRepositoryImpl clienteRepository = new ClienteRepositoryImpl();
        hotelModelo = new HotelModelo();

        try{
            hotelModelo.setClienteRepository(clienteRepository);
            clienteLista.addAll(hotelModelo.setCliente());
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public HotelModelo getHotelModelo() {
        return hotelModelo;
    }

    public ObservableList<Cliente> getClienteLista() {
        return clienteLista;
    }

    // Inicializamos el diseño raíz cargando el archivo FXML correspondiente
    public void initRootLayout() {
        try {
            // Cargamos el diseño raíz desde un archivo FXML
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/agenda/InterfazPrincipal.fxml"));
            rootLayout = (BorderPane) loader.load();

            Scene scene = new Scene(rootLayout);
            primaryStage.setScene(scene);
            primaryStage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Vista de las personas dentro del diseño raíz
    public void showPersonOverview() {
        try {
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/agenda/Person_Overview.fxml"));

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




    public static void main(String[] args) {
        launch();
    }
}