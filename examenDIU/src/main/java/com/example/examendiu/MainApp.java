package com.example.examendiu;


import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

public class MainApp extends Application {

    // Eliminar static de primaryStage
    private static Stage primaryStage;
    private BorderPane rootLayout;

    // Constructor vacío
    public MainApp() {
    }

    @Override
    public void start(Stage primaryStage) {

    }

    // Inicializamos el diseño raíz cargando el archivo FXML correspondiente
    public void initRootLayout() {
    }

    // Vista de las personas dentro del diseño raíz
    public void showPersonOverview() {
    }

    // Muestra estadísticas de cumpleaños
    public static void showBirthdayStatistics() {
    }


    public static void main(String[] args) {
        launch(args);
    }
}
