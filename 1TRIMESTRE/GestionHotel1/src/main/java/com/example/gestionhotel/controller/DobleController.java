package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.fxml.FXML;
import javafx.geometry.Insets;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.ProgressIndicator;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;
import javafx.util.Duration;

import java.util.ArrayList;
import java.util.List;

public class DobleController {

    MainApp mainApp;
    Stage stage;

    private List<Image> imageList;
    private int contadorImagenes = 0;

    @FXML
    private ImageView imageView;

    @FXML
    private ProgressBar progressBar;

    @FXML
    private ProgressIndicator progressIndicator;


    public ProgressBar getProgressBar() {
        return progressBar;
    }
    public void setProgressBar(double progressBar) {
        this.progressBar.setProgress(progressBar);
    }


    public void setProgressIndicator(double progressIndicator) {
        this.progressIndicator.setProgress(progressIndicator);
    }

    @FXML
    public void initialize() {
        // Crear una lista con todas las imágenes
        imageList = new ArrayList<>();
        imageList.add(new Image(getClass().getResource("/com/example/gestionhotel/images/a1.jpg").toString()));
        imageList.add(new Image(getClass().getResource("/com/example/gestionhotel/images/a2.jpg").toString()));
        imageList.add(new Image(getClass().getResource("/com/example/gestionhotel/images/a3.jpg").toString()));

        // Mostrar la primera imagen
        imageView.setImage(imageList.get(contadorImagenes));
        // Configurar el tamaño del ImageView
        imageView.setFitWidth(350);  // Ancho deseado
        imageView.setFitHeight(250); // Alto deseado
        imageView.setPreserveRatio(true); // Mantener la relación de aspecto
        imageView.setSmooth(true); // Suavizar la imagen al redimensionarla
        StackPane.setMargin(imageView, new Insets(100, 0, 0, 0)); // Arriba: 50px

        // Crear un Timeline para alternar imágenes automáticamente
        Timeline timeline = new Timeline(new KeyFrame(Duration.seconds(2), event -> {
            // Incrementar el índice y reiniciar si llegamos al final
            contadorImagenes = (contadorImagenes + 1) % imageList.size();
            // Cambiar la imagen en el ImageView
            imageView.setImage(imageList.get(contadorImagenes));
        }));

        // Configurar el Timeline para que se repita indefinidamente
        timeline.setCycleCount(Timeline.INDEFINITE);
        timeline.play();
    }
    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;
    }

    public void setDialogStage(Stage dialogStage) {
        this.stage = dialogStage;
    }

}