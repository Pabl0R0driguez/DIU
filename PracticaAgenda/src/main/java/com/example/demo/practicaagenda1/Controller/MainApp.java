package com.example.demo.practicaagenda1.Controller;

import java.io.IOException;

import com.example.demo.practicaagenda1.Model.Person;
import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

public class MainApp extends Application {
    //Lista de Personas
    private ObservableList<Person> personData = FXCollections.observableArrayList();


    //Añadimos a la lista
    public MainApp() {
        // Add some sample data
        personData.add(new Person("Juan", "Cuesta"));
        personData.add(new Person("Hector", "Bellerín"));
        personData.add(new Person("Daniel", "Caravajal"));
        personData.add(new Person("Leo", "Messi"));
        personData.add(new Person("Rubén", "Castro"));
        personData.add(new Person("Benito", "Mussolini"));
        personData.add(new Person("Marc", "Cucurella"));
        personData.add(new Person("Gareth", "Bale"));
        personData.add(new Person("Eduardo", "Camavinga"));
    }


    public ObservableList<Person> getPersonData() {
        return personData;
    }
    private Stage primaryStage;
    private BorderPane rootLayout;

    @Override
    public void start(Stage primaryStage) {
        this.primaryStage = primaryStage;
        this.primaryStage.setTitle("AddressApp");

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
            loader.setLocation(MainApp.class.getResource("/com/example/demo/practicaagenda1/RootLayout.fxml"));
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
            loader.setLocation(MainApp.class.getResource("/com/example/demo/practicaagenda1/Person_Overview.fxml"
            ));
            AnchorPane personOverview = (AnchorPane) loader.load();

            // Set person overview into the center of root layout.
            rootLayout.setCenter(personOverview);

            // Give the controller access to the main app.
            PersonOverviewController controller = loader.getController();
            controller.setMainApp(this);

        } catch (IOException e) {
            e.printStackTrace();
        }


    }
    /**
     * Returns the main stage.
     * @return
     */
    public Stage getPrimaryStage() {
        return primaryStage;
    }

    public static void main(String[] args) {
        launch(args);
    }
}