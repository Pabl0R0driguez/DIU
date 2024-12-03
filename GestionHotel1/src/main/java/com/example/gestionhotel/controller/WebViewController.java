package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import javafx.fxml.FXML;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;

public class WebViewController {
     MainApp mainApp;
     Stage stage;

    @FXML
    WebView webView;

    @FXML
    public void initialize() {
        // Obtener el WebEngine del WebView
        WebEngine webEngine = webView.getEngine();

        // Cargar la página web del hotel
        String hotelUrl = "https://www.google.es"; // Cambia esta URL por la de tu hotel.
        webEngine.load(hotelUrl);
    }

    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;
    }

    public void setDialogStage(Stage dialogStage) {
        this.stage = dialogStage;
    }
}
