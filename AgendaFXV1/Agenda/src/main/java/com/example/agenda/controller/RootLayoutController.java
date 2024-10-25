package com.example.agenda.controller;

import com.example.agenda.MainApp;
import javafx.fxml.FXML;

public class RootLayoutController {
    private MainApp mainApp;
    @FXML
    private void handleShowBirthdayStatistics() {
        MainApp.showBirthdayStatistics();
    }
}
