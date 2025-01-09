package com.example.agenda;

import java.io.IOException;

import com.example.agenda.controller.BirthdayStatisticsController;
import com.example.agenda.controller.PersonEditDialogController;
import com.example.agenda.model.AgendaModel;
import com.example.agenda.model.ExcepcionPerson;
import com.example.agenda.model.repository.impl.PersonRepositoryImpl;
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
import com.example.agenda.controller.Person_Overview_Controller;


public class MainApp extends Application {

    /*Vamos a crear una lista de objetos de tipo Person dentro de la clase principal MainApp.
    El resto de controladores obtendrá luego acceso a esa lista central dentro de MainApp. */

    private static ObservableList<Person> personData = FXCollections.observableArrayList();
    AgendaModel agendaModel;
    /**
     * Constructor
     */
    public MainApp() {
        PersonRepositoryImpl agendaRepository = new PersonRepositoryImpl();
        agendaModel = new AgendaModel();

        try {
            agendaModel.setPersonaRepository(agendaRepository);
            personData.addAll(agendaModel.setPersonas());
        } catch (ExcepcionPerson e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Returns the data as an observable list of Persons.
     * @return
     */

    public ObservableList<Person> getPersonData() {
        return personData;
    }

//Hasta aquí la creación de la lista

    private static Stage primaryStage;
    private BorderPane rootLayout;

    @Override
    public void start(Stage primaryStage) {
        this.primaryStage = primaryStage;
        this.primaryStage.setTitle("Agenda");
        initRootLayout();

        showPersonOverview();


    }

    /**
     * Initializes the root layout.
     */
    public void initRootLayout() {
        try {
            // Load root layout from fxml file.
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/agenda/Root_Layout.fxml"));
            rootLayout = (BorderPane) loader.load();

            // Show the scene containing the root layout.
            Scene scene = new Scene(rootLayout);
            primaryStage.setScene(scene);
            primaryStage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Shows the person overview inside the root layout.
     */
    public void showPersonOverview() {
        try {
            // Load person overview.
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/agenda/Person_Overview.fxml"));
            AnchorPane personOverview = (AnchorPane) loader.load();

            // Set person overview into the center of root layout.
            rootLayout.setCenter(personOverview);

            // Give the controller access to the main app.
            Person_Overview_Controller controller = loader.getController();
            controller.setMainApp(this);
            controller.setAgendaModelo(agendaModel);

        } catch (IOException e) {
            e.printStackTrace();
        } catch (ExcepcionPerson e) {
            throw new RuntimeException(e);
        }
    }

    public boolean showPersonEditDialog(Person person) {
        try {
            // Load the fxml file and create a new stage for the popup dialog.
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/agenda/PersonEditDialog.fxml"));
            AnchorPane page = (AnchorPane) loader.load();

            // Create the dialog Stage.
            Stage dialogStage = new Stage();
            dialogStage.setTitle("Edit Person");
            dialogStage.initModality(Modality.WINDOW_MODAL);
            dialogStage.initOwner(primaryStage);
            Scene scene = new Scene(page);
            dialogStage.setScene(scene);

            // Set the person into the controller.
            PersonEditDialogController controller = loader.getController();
            controller.setDialogStage(dialogStage);
            controller.setPerson(person);

            // Show the dialog and wait until the user closes it
            dialogStage.showAndWait();

            return controller.isOkClicked();
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }



    public static void showBirthdayStatistics() {
        try {
            // Load the fxml file and create a new stage for the popup.
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/agenda/BirthdayStatistics.fxml"));
            AnchorPane page = (AnchorPane) loader.load();
            Stage dialogStage = new Stage();
            dialogStage.setTitle("Birthday Statistics");
            dialogStage.initModality(Modality.WINDOW_MODAL);
            dialogStage.initOwner(primaryStage);
            Scene scene = new Scene(page);
            dialogStage.setScene(scene);

            // Set the persons into the controller.
            BirthdayStatisticsController controller = loader.getController();
            controller.setPersonData(personData);

            dialogStage.show();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }





    public Stage getPrimaryStage() {
        return primaryStage;
    }



    public static void main(String[] args) {


        launch(args);

    }
}