package com.example.agenda;

import com.example.agenda.controller.PersonEditDialogController;
import com.example.agenda.controller.Person_Overview_Controller;
import com.example.agenda.model.AgendaModelo;
import com.example.agenda.model.ExcepcionPersona;
import com.example.agenda.model.PersonaVO;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import com.example.agenda.controller.BirthdayStatisticsController;
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
	private AgendaModelo agenda;

	// Eliminar static de primaryStage
	private static Stage primaryStage;
	private BorderPane rootLayout;



	/**
	 * Constructor
	 * Agrega instancias de Person a la lista personData.
	 */
	public MainApp() {
		PersonaRepositoryImpl agendaRepository = new PersonaRepositoryImpl();
		agenda = new AgendaModelo();

		try {
			agenda.setPersonaRepository(agendaRepository);
<<<<<<< HEAD
			personData.addAll(agenda.setPerson()); // Añadimos los datos a la lista observable transformados a Person
=======
			personData.addAll(agenda.setPerson()); // Cambiar `setPerson` a `getPerson` si es necesario
>>>>>>> 8c78aaa64f22ecb9a434bfabf6689615cbec3a9e
		} catch (ExcepcionPersona e) {
			throw new RuntimeException(e);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

	// Metodo para obtener la lista de personas
	public ObservableList<Person> getPersonData() {
		return personData;
	}


	public AgendaModelo getAgenda() {
		return agenda;
	}

	@Override
	public void start(Stage primaryStage) {
		// Guardamos la referencia del escenario principal
		this.primaryStage = primaryStage;
		this.primaryStage.setTitle("Agenda");

		// Inicializamos el diseño raíz
		initRootLayout();

		// Muestra la vista de las personas

		showPersonOverview();
	}

	// Inicializamos el diseño raíz cargando el archivo FXML correspondiente
	public void initRootLayout() {
		try {
			// Cargamos el diseño raíz desde un archivo FXML
			FXMLLoader loader = new FXMLLoader();
			loader.setLocation(MainApp.class.getResource("/com/example/agenda/Root_Layout.fxml"));
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
			Person_Overview_Controller controller = loader.getController();
			controller.setMainApp(this);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// Muestra un diálogo para editar una persona
	public boolean showPersonEditDialog(Person person) {
		try {
			FXMLLoader loader = new FXMLLoader();
			loader.setLocation(MainApp.class.getResource("/com/example/agenda/PersonEditDialog.fxml"));
			AnchorPane page = (AnchorPane) loader.load();

			Stage dialogStage = new Stage();
			dialogStage.setTitle("Editar Persona");
			dialogStage.initModality(Modality.NONE); // pTE PROBAR
			dialogStage.initOwner(primaryStage);
			Scene scene = new Scene(page);
			dialogStage.setScene(scene);

			PersonEditDialogController controller = loader.getController();
			controller.setDialogStage(dialogStage);
			controller.setPerson(person);

			//Editar barra progreso
			controller.setProgreso((double)Person.getContadorPersonas() / (double)Person.getTotalPersonas());
			controller.setProgresoIndicador((double)Person.getContadorPersonas() / (double)Person.getTotalPersonas());



			dialogStage.showAndWait();
			return controller.isOkClicked();
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}

	// Muestra estadísticas de cumpleaños (sin `static`)
	public static void showBirthdayStatistics() {
		try {
			FXMLLoader loader = new FXMLLoader();
			loader.setLocation(MainApp.class.getResource("/com/example/agenda/BirthdayStatistics.fxml"));
			AnchorPane page = (AnchorPane) loader.load();

			Stage dialogStage = new Stage();
			dialogStage.setTitle("Estadísticas de Cumpleaños");
			dialogStage.initModality(Modality.WINDOW_MODAL);
			dialogStage.initOwner(primaryStage);
			Scene scene = new Scene(page);
			dialogStage.setScene(scene);

			BirthdayStatisticsController controller = loader.getController();
			controller.setPersonData(personData);

			dialogStage.show();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// Metodo principal de la aplicación
	public static void main(String[] args) throws SQLException, ExcepcionPersona {
		launch(args);
	}


}
