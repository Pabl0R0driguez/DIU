package com.example.gestionhotel;

import com.example.gestionhotel.controller.InterfazPrincipalController;
import com.example.gestionhotel.model.ClienteVO;
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
import java.util.ArrayList;

public class MainApp extends Application {

    private static ObservableList<Cliente> clienteLista = FXCollections.observableArrayList();
    private HotelModelo hotelModelo;

    private Stage primaryStage;
    private BorderPane rootLayout;

    @Override
    public void start(Stage stage) throws IOException {
        primaryStage = stage;
        FXMLLoader fxmlLoader = new FXMLLoader(MainApp.class.getResource("InterfazDatos.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 320, 240);
        stage.setTitle("Hello!");
        stage.setScene(scene);
        stage.show();

        initRootLayout();
        showPersonOverview();
    }

    public MainApp() throws SQLException {
        ClienteRepositoryImpl clienteRepository = new ClienteRepositoryImpl();

        ArrayList<ClienteVO> lista = clienteRepository.ObtenerListaPersonas();
        for(ClienteVO cliente : lista) {
            System.out.println("Cliente: " + cliente.getNombre() + " " + cliente.getApellidos());
        }
//        hotelModelo = new HotelModelo();
//
//        try {
//            hotelModelo.setClienteRepository(clienteRepository);
//            clienteLista.addAll(hotelModelo.setCliente());
//        } catch (SQLException e) {
//            System.err.println("Error al establecer la lista de clientes: " + e.getMessage());
//            e.printStackTrace();
//        }
    }

    public HotelModelo getHotelModelo() {
        return hotelModelo;
    }

    public ObservableList<Cliente> getClienteLista() {
        return clienteLista;
    }

    public void initRootLayout() {
        try {
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/gestionhotel/InterfazPrincipal.fxml"));
            rootLayout = (BorderPane) loader.load();

            Scene scene = new Scene(rootLayout);
            primaryStage.setScene(scene);
            primaryStage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void showPersonOverview() {
        try {
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/gestionhotel/InterfazDatos.fxml"));

            AnchorPane personOverview = (AnchorPane) loader.load();

            rootLayout.setCenter(personOverview);

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
