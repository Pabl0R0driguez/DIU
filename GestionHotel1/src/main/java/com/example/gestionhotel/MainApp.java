package com.example.gestionhotel;

import com.example.gestionhotel.controller.*;
import com.example.gestionhotel.model.ClienteVO;
import com.example.gestionhotel.model.ExcepcionCliente;
import com.example.gestionhotel.model.HotelModelo;
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
import javafx.scene.control.TextInputDialog;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Modality;
import javafx.stage.Stage;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Optional;

public class MainApp extends Application {

    private static ObservableList<Cliente> clienteLista = FXCollections.observableArrayList();
    private HotelModelo hotelModelo;
    private static ObservableList<Reserva> reservaLista = FXCollections.observableArrayList();
    private ReservaRepository reservaRepository;

    private Stage primaryStage;
    private BorderPane rootLayout;
    InterfazPrincipalController interfazPrincipalController;
    Cliente cliente;
    // Reserva reserva;
    PersonEditDialogController personEditDialogController;


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

    // Usamos el init antes del start, para inicializar el contador de clientes y el de tipo de habitación
    @Override
    public void init() throws Exception {

        // Guardamos en un entero el numero de clientes totales que hay en nuestra bd
        int totalClientes = getHotelModelo().getClienteRepository().contarClientes();
        Cliente.setContadorClientes(totalClientes);

        getHotelModelo().getReservaRepository().contarTotalReservas();
        System.out.println("Total reservas dobles: " + Reserva.getContadorHabitacionDobles());

        System.out.println("Total reservas doble uso individual: " + Reserva.getContadorHabitacionesDoblesIndividual());

        System.out.println("Total reservas junior: " + Reserva.getContadorHabitacionesJunior());

        System.out.println("Total reservas junior suite: " + Reserva.getContadorHabitacionesJuniorSuite());


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


    private String dniSeleccionado = "";

    //Guardamos el nuevo DNI
    public void setDniSeleccionado(String dniSeleccionado) {
        this.dniSeleccionado = dniSeleccionado;
    }

    //Recogemos el nuevo DNI
    public String getDniSeleccionado() {
        return dniSeleccionado;
    }

    public InterfazPrincipalController getInterfazPrincipalController() {
        return interfazPrincipalController;
    }
    // Metodo para obtener el cliente seleccionado

    public Cliente getClienteSeleccionado() {
        return cliente;
    }

    //CAMBIO
    public void setClienteSeleccionado(Cliente cliente) {
        this.cliente = cliente;
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
            rootLayout.setCenter(personOverview); //f

            // Proporcionar acceso al controlador a la instancia de MainApp
            InterfazPrincipalController controller = loader.getController();
            controller.setMainApp(this);

            // Guardamos la referencia del controlador(error de null)
            this.interfazPrincipalController = controller;

            // Cambiar el tamaño de la ventana principal
            primaryStage.setWidth(850);  // Establece el ancho de la ventana principal
            primaryStage.setHeight(480); // Establece el alto de la ventana principal

            // Opcional: Configurar si la ventana principal es redimensionable
            primaryStage.setResizable(true);  // Puede ser false si no deseas que el usuario redimensione la ventana

        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public boolean mostrarBuscarDNI() {
        TextInputDialog dialog = new TextInputDialog();
        dialog.setTitle("Escribe un DNI");
        dialog.setHeaderText("Ingrese el DNI del cliente");
        dialog.setContentText("DNI:");

        // Espera a que el usuario le de al botón de aceptar
        Optional<String> result = dialog.showAndWait();

        result.ifPresent(DNI -> {
            setDniSeleccionado(DNI);
            System.out.println("DNI FFFF: " + DNI);
//            InterfazPrincipalController interfazPrincipalController = getInterfazPrincipalController();
//            interfazPrincipalController.seleccionarReservaPorDNI(DNI);
        });

        // Si el DNI introducido no es cadena vacia, devuelve true, en DRC podemos seguir
        if (!dniSeleccionado.equals(""))
            return true;
        else
            return false;

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
            controller.setMainApp(this);

            controller.setBarraIndicador((double) Cliente.getContadorClientes() / (double) Cliente.getTotalClientes());

            // Mostrar la ventana del diálogo y esperar a que se cierre
            dialogStage.showAndWait();

            // Devolver si el usuario hizo clic en el botón "OK" en el diálogo
            return controller.isOkClicked();

        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean mostrarReservas(Reserva reserva) throws IOException {
        try {

            System.out.println("cliente para la gestion de reserva: " + cliente.toString());
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


            System.out.println("Mostrar reserva: " + reserva);

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

    public boolean mostrarInterfazReservas() throws IOException {
        try {
//            System.out.println("cliente: " + cliente.toString());


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

            // cambio: sobra porque MainAPP ya tiene una vble cliente con los datos del cliente seleccionado
//            Reserva reserva = new Reserva(cliente.getDni());
//            controller.setReserva(reserva);
            // System.out.println(reserva);

            //carga la lista de reservas del cliente.
            reservaLista.addAll(hotelModelo.setReserva(cliente));


            // Mostrar la ventana del diálogo y esperar a que se cierre
            dialogStage.showAndWait();

            // Devolver si el usuario hizo clic en el botón "OK" en el diálogo


        } catch (IOException e) {
            e.printStackTrace();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        //cambio
        return true;
    }

    public boolean mostrarDobleIndividual() throws IOException {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(MainApp.class.getResource("/com/example/gestionhotel/DobleIndividual.fxml"));

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


        DobleIndividualController controller = loader.getController();
        controller.setMainApp(this);
        controller.setDialogStage(dialogStage);


        System.out.println("Total main:" + Reserva.getNumeroHabitacionesDobles());

        System.out.println("Contador main:" + Reserva.getContadorHabitacionDobles());
        controller.setProgressBar(Reserva.getContadorHabitacionesDoblesIndividual() / (double) Reserva.getNumeroHabitacionesDoblesIndividual());
        controller.setProgressIndicator(Reserva.getContadorHabitacionesDoblesIndividual() / (double) Reserva.getNumeroHabitacionesDoblesIndividual());
        dialogStage.showAndWait();

        return true;
    }

    public boolean mostrarDoble() throws IOException {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(MainApp.class.getResource("/com/example/gestionhotel/Doble.fxml"));

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


        DobleController controller = loader.getController();
        controller.setMainApp(this);
        controller.setDialogStage(dialogStage);


        controller.setProgressBar(Reserva.getContadorHabitacionDobles() / (double) Reserva.getNumeroHabitacionesDobles());
        controller.setProgressIndicator(Reserva.getContadorHabitacionDobles() / (double) Reserva.getNumeroHabitacionesDobles());
        dialogStage.showAndWait();

        return true;
    }

    public boolean mostrarJuniorSuite() throws IOException {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(MainApp.class.getResource("/com/example/gestionhotel/JuniorSuite.fxml"));

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


        JuniorSuiteController controller = loader.getController();
        controller.setMainApp(this);
        controller.setDialogStage(dialogStage);


        controller.setProgressBar(Reserva.getContadorHabitacionesJuniorSuite() / (double) Reserva.getNumeroHabitacionesJuniorSuite());
        controller.setProgressIndicator(Reserva.getContadorHabitacionesJuniorSuite() / (double) Reserva.getNumeroHabitacionesJuniorSuite());
        dialogStage.showAndWait();

        return true;
    }

    public boolean mostrarSuite() throws IOException {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(MainApp.class.getResource("/com/example/gestionhotel/Suite.fxml"));

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


        SuiteController controller = loader.getController();
        controller.setMainApp(this);
        controller.setDialogStage(dialogStage);


        controller.setProgressBar(Reserva.getContadorHabitacionesJunior() / (double) Reserva.getNumeroHabitacionesJunior());
        controller.setProgressIndicator(Reserva.getContadorHabitacionesJunior() / (double) Reserva.getNumeroHabitacionesJunior());
        dialogStage.showAndWait();

        return true;
    }

//    public boolean mostrarEstadisticas() throws IOException {
//        FXMLLoader loader = new FXMLLoader();
//        loader.setLocation(MainApp.class.getResource("/com/example/gestionhotel/EstadisticasReservas.fxml"));
//
//        AnchorPane page = (AnchorPane) loader.load();
//
//        // Crear una nueva ventana (Stage) para el diálogo
//        Stage dialogStage = new Stage();
//        dialogStage.setTitle("Reservas");
//        dialogStage.initModality(Modality.NONE);  // Puedes probar con Modality.APPLICATION_MODAL si lo deseas
//        dialogStage.initOwner(primaryStage);
//        primaryStage.setWidth(850);  // Establece el ancho de la ventana principal
//        primaryStage.setHeight(480);
//        Scene scene = new Scene(page);
//        dialogStage.setScene(scene);
//
//
//        ReservaEstadisticasController controller = loader.getController();
//        controller.setMainApp(this);
//        controller.setDialogStage(dialogStage);
//
//        dialogStage.showAndWait();
//
//        return true;
//    }

    public boolean mostrarWebView() throws IOException {


            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/gestionhotel/webView.fxml"));

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

            WebViewController controller = loader.getController();
            controller.setMainApp(this);
            controller.setDialogStage(dialogStage);

            dialogStage.showAndWait();
            return true;

    }

    public static void main(String[] args) {
        launch();
    }
}
