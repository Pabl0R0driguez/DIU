package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import javafx.fxml.FXML;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.ProgressIndicator;
import javafx.scene.image.ImageView;
import javafx.stage.Stage;

public class Doble {

    MainApp mainApp;
    Stage stage;

    @FXML
    private ImageView imageView;

    @FXML
    private ProgressBar progressBar;

    @FXML
    private ProgressIndicator progressIndicator;

//    private static int numeroHabitacionesDobles = 50;
//    private static double contadorHabitaciones = 0;
//
//
//
//
//    public static void setNumeroHabitacionesDobles(double contadorHabitaciones) {
//        DobleIndividualController.contadorHabitaciones = contadorHabitaciones;
//    }
//
//
//    public static void setContadorHabitacionesDobles(double contadorHabitaciones) {
//        DobleIndividualController.contadorHabitaciones = contadorHabitaciones;
//    }
//
//    public static int getNumeroHabitacionesDobles() {
//        return numeroHabitacionesDobles;
//    }
//
//    public static double getContadorHabitaciones() {
//        return contadorHabitaciones;
//    }


    @FXML
    public void initialize() {

    }
    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;
    }

    public void setDialogStage(Stage dialogStage) {
        this.stage = dialogStage;
    }

}