package com.example.gestionhotel;

import com.example.gestionhotel.controller.*;
import com.example.gestionhotel.model.ClienteVO;
import com.example.gestionhotel.model.ExcepcionCliente;
import com.example.gestionhotel.model.HotelModelo;
import com.example.gestionhotel.model.ReservaVO;
import com.example.gestionhotel.model.repository.ReservaRepository;
import com.example.gestionhotel.model.repository.impl.ClienteRepositoryImpl;
import com.example.gestionhotel.model.repository.impl.ReservaRepositoryImpl;
import com.example.gestionhotel.view.Cliente;
import com.example.gestionhotel.view.Reserva;
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
    private static ObservableList<Reserva> reservaLista = FXCollections.observableArrayList();
    private ReservaRepository reservaRepository;

    private Stage primaryStage;
    private BorderPane rootLayout;
    InterfazPrincipalController interfazPrincipalController;
    Cliente cliente;
    Reserva reserva;



    public MainApp() throws SQLException, ExcepcionCliente {
        //Instanciamos los dos IMpl para conectar con la base de datos
        ClienteRepositoryImpl clienteRepository = new ClienteRepositoryImpl();
        ReservaRepositoryImpl reservaRepository = new ReservaRepositoryImpl();


        //Obterner lista de personas en la base de datos
        ArrayList<ClienteVO> lista = clienteRepository.ObtenerListaPersonas();
        for (ClienteVO cliente : lista) {
            System.out.println("Cliente: " + cliente.getNombre() + " " + cliente.getApellidos());
        }

        hotelModelo = new HotelModelo();

        try {

            hotelModelo.setClienteRepository(clienteRepository);
            clienteLista.addAll(hotelModelo.setCliente());

            hotelModelo.setReservaRepository(reservaRepository);

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
    public ObservableList<Cliente> getClientesData() {
        return clienteLista;
    }
    public ObservableList<Reserva> getReservasData() {
        return reservaLista;
    }


    public HotelModelo getHotelModelo() {
        return hotelModelo;
    }


    private String dniSeleccionado;

    public void setDniSeleccionado(String dniSeleccionado) {
        this.dniSeleccionado = dniSeleccionado;
    }

    public InterfazPrincipalController getInterfazPrincipalController() {
        return interfazPrincipalController;
    }
    // Metodo para obtener el cliente seleccionado

    public Cliente getClienteSeleccionado() {
        return cliente;
    }

    public Cliente setClienteSeleccionado(Cliente cliente) {
        return cliente;
    }



    public void iniciarDiseñoRaiz() {
        try {
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/gestionhotel/DiseñoRaiz.fxml"));
            rootLayout = (BorderPane) loader.load();

            DiseñoRaizController controller = loader.getController();
            controller.setMainApp(this);

            Scene scene = new Scene(rootLayout);
            primaryStage.setScene(scene);
            primaryStage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public void mostrarInterfazPrincipal() {
        try {
            // Cargar el archivo FXML de la interfaz principal
            FXMLLoader loader = new FXMLLoader(MainApp.class.getResource("/com/example/gestionhotel/InterfazPrincipal.fxml"));
            AnchorPane personOverview = (AnchorPane) loader.load();

            // Establecer la vista de personas en el centro del diseño raíz
            rootLayout.setCenter(personOverview);

            // Proporcionar acceso al controlador a la instancia de MainApp
            InterfazPrincipalController controller = loader.getController();
            controller.setMainApp(this);

            // Cambiar el tamaño de la ventana principal
            primaryStage.setWidth(850);  // Establece el ancho de la ventana principal
            primaryStage.setHeight(480); // Establece el alto de la ventana principal

            // Opcional: Configurar si la ventana principal es redimensionable
            primaryStage.setResizable(true);  // Puede ser false si no deseas que el usuario redimensione la ventana

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
            primaryStage.setWidth(850);  // Establece el ancho de la ventana principal
            primaryStage.setHeight(480); // Establece el alto de la ventana
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

    public boolean mostrarReservas(Cliente cliente) throws IOException {
        try {
            // Cargar la interfaz FXML para la edición de la reserva
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/gestionhotel/Reserva.fxml"));
            AnchorPane page = (AnchorPane) loader.load();

            // Crear una nueva ventana (Stage) para el diálogo
            Stage dialogStage = new Stage();
            dialogStage.setTitle("Reservas");
            dialogStage.initModality(Modality.NONE);  // Puedes probar con Modality.APPLICATION_MODAL si lo deseas
            dialogStage.initOwner(primaryStage);
            primaryStage.setWidth(850);  // Establece el ancho de la ventana principal
            primaryStage.setHeight(480);
            Scene scene = new Scene(page);
            dialogStage.setScene(scene);

            ReservaController controller = loader.getController();
            controller.setMainApp(this);
            controller.setDialogStage(dialogStage);


            // Creamos el objeto reserva para guardar los datos de la interfaz
            Reserva reserva = new Reserva(cliente.getDni());
            controller.setReserva(reserva);
            System.out.println(reserva);


            // Mostrar la ventana del diálogo y esperar a que se cierre
            dialogStage.showAndWait();

            // Devolver si el usuario hizo clic en el botón "OK" en el diálogo
            return controller.isOkClicked();


        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean mostrarInterfazReservas(Cliente cliente) throws IOException {
        try {

            //Limpia la lista cuando cierra la pantalla
            reservaLista.clear();

            // Cargar la interfaz FXML para la edición de la reserva
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/gestionhotel/InterfazReservas.fxml"));

            AnchorPane page = (AnchorPane) loader.load();

            // Crear una nueva ventana (Stage) para el diálogo
            Stage dialogStage = new Stage();
            dialogStage.setTitle("Reservas");
            dialogStage.initModality(Modality.NONE);  // Puedes probar con Modality.APPLICATION_MODAL si lo deseas
            dialogStage.initOwner(primaryStage);
            primaryStage.setWidth(850);  // Establece el ancho de la ventana principal
            primaryStage.setHeight(480);
            Scene scene = new Scene(page);
            dialogStage.setScene(scene);

            InterfazReservasController controller = loader.getController();
            controller.setMainApp(this);
            controller.setDialogStage(dialogStage);


//            ArrayList<ReservaVO> listaReserva = hotelModelo.getReservaRepository().listarReservas(cliente.getDni());
//            System.out.println(listaReserva);
            // Creamos el objeto reserva para guardar los datos de la interfaz
            Reserva reserva = new Reserva(cliente.getDni());
            controller.setReserva(reserva);
            System.out.println(reserva);
            reservaLista.addAll(hotelModelo.setReserva(cliente));


            // Mostrar la ventana del diálogo y esperar a que se cierre
            dialogStage.showAndWait();

            // Devolver si el usuario hizo clic en el botón "OK" en el diálogo


        } catch (IOException e) {
            e.printStackTrace();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


        return false;
    }




    public static void main(String[] args) {
        launch();
    }
}
