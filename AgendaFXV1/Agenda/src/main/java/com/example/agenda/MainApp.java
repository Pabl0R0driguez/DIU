package com.example.agenda;

import com.example.agenda.model.AgendaModelo;
import com.example.agenda.model.ExcepcionPersona;
import com.example.agenda.model.repository.PersonaRepository;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import com.example.agenda.controller.BirthdayStatisticsController;
import com.example.agenda.controller.PersonEditDialogController;
import com.example.agenda.controller.PersonOverviewController;
import com.example.agenda.model.repository.impl.ConexionBD;
import com.example.agenda.model.repository.impl.PersonaRepositoryImpl;
import com.example.agenda.view.Person;
import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Modality;
import javafx.stage.Stage;

public class MainApp extends Application {

	// Lista observable de objetos Person que es accesible desde otros controladores
	private static ObservableList<Person> personData = FXCollections.observableArrayList();

	/**
	 * Constructor
	 * Agrega instancias de Person a la lista personData.
	 */
	public MainApp() {
		personData.add(new Person("Pepe", "Mejías"));
		personData.add(new Person("Rubén", "Castro"));
		personData.add(new Person("Leo", "Pepsi"));
		personData.add(new Person("Daniel", "Carvajal"));
		personData.add(new Person("Cristiano", "Ronaldo"));
		personData.add(new Person("Nico", "Williams"));
		personData.add(new Person("Lisandro", "Martínez"));
		personData.add(new Person("Radamel", "Falcao"));
		personData.add(new Person("Pedro", "Neto"));
	}

	// Metodo para obtener la lista de personas
	public ObservableList<Person> getPersonData() {
		return personData;
	}

	// Variables para el escenario y el diseño raíz
	private static Stage primaryStage;
	private BorderPane rootLayout;

	@Override
	public void start(Stage primaryStage) {
		// Guardamos la referencia del escenario principal
		this.primaryStage = primaryStage;
		this.primaryStage.setTitle("Agenda");
		// Inicializamos  el diseño raíz
		initRootLayout();
		// Muestra la vista de las personas
		showPersonOverview();
	}


	//Inicializamos el diseño raíz cargando el archivo FXML correspondiente.

	public void initRootLayout() {
		try {
			// Cargamos el diseño raíz desde un archivo FXML
			FXMLLoader loader = new FXMLLoader();
			loader.setLocation(MainApp.class.getResource("/com/example/agenda/Root_Layout.fxml"));
			rootLayout = (BorderPane) loader.load();


			Scene scene = new Scene(rootLayout);
			primaryStage.setScene(scene);
			primaryStage.show(); // Muestra el escenario
		} catch (IOException e) {
			e.printStackTrace(); // Maneja excepciones de entrada/salida
		}
	}


	  //VIsta de las personas dentro del diseño raíz.

	public void showPersonOverview() {
		try {

			FXMLLoader loader = new FXMLLoader();
			loader.setLocation(MainApp.class.getResource("/com/example/agenda/Person_Overview.fxml"));
			AnchorPane personOverview = (AnchorPane) loader.load();

			// Establece la vista de personas en el centro del diseño raíz
			rootLayout.setCenter(personOverview);

			// Proporciona acceso al controlador a la instancia de MainApp
			PersonOverviewController controller = loader.getController();
			controller.setMainApp(this);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}


	 //Muestra un diálogo para editar una persona.

	public boolean showPersonEditDialog(Person person) {
		try {
			// Carga el archivo FXML y crea un nuevo escenario para el diálogo
			FXMLLoader loader = new FXMLLoader();
			loader.setLocation(MainApp.class.getResource("/com/example/agenda/PersonEditDialog.fxml"));
			AnchorPane page = (AnchorPane) loader.load();

			// Crea el escenario del diálogo
			Stage dialogStage = new Stage();
			dialogStage.setTitle("Editar Persona");
			dialogStage.initModality(Modality.WINDOW_MODAL);
			dialogStage.initOwner(primaryStage);
			Scene scene = new Scene(page);
			dialogStage.setScene(scene);

			// Establece la persona en el controlador del diálogo
			PersonEditDialogController controller = loader.getController();
			controller.setDialogStage(dialogStage);
			controller.setPerson(person);

			// Muestra el diálogo y espera a que el usuario lo cierre
			dialogStage.showAndWait();
			// Retorna si se hizo clic en "OK"
			return controller.isOkClicked();
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}


	//Muestra estadísticas de cumpleaños.

	public static void showBirthdayStatistics() {
		try {
			// Carga el archivo FXML y crea un nuevo escenario para el diálogo de estadísticas
			FXMLLoader loader = new FXMLLoader();
			loader.setLocation(MainApp.class.getResource("/com/example/agenda/BirthdayStatistics.fxml"));
			AnchorPane page = (AnchorPane) loader.load();
			Stage dialogStage = new Stage();
			dialogStage.setTitle("Estadísticas de Cumpleaños");
			dialogStage.initModality(Modality.WINDOW_MODAL);
			dialogStage.initOwner(primaryStage);
			Scene scene = new Scene(page);
			dialogStage.setScene(scene);

			// Establece los datos de las personas en el controlador
			BirthdayStatisticsController controller = loader.getController();
			controller.setPersonData(personData);

			dialogStage.show(); // Muestra el diálogo

		} catch (IOException e) {
			e.printStackTrace(); // Maneja excepciones de entrada/salida
		}
	}

	// Metodo para obtener el escenario principal
	public Stage getPrimaryStage() {
		return primaryStage;
	}

	// Metodo principal de la aplicación
	public static void main(String[] args) throws SQLException, ExcepcionPersona {

		PersonaRepositoryImpl personaRepository = new PersonaRepositoryImpl();
		personaRepository.ObtenerListaPersonas();

		AgendaModelo agendaModelo = new AgendaModelo();
		agendaModelo.setPersonaRepository(new PersonaRepositoryImpl());



		launch(args); // Inicia la aplicación JavaFX
	}
}
