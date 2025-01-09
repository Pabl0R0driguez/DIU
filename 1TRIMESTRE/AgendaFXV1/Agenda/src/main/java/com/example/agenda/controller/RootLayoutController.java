package com.example.agenda.controller;

import com.example.agenda.MainApp;
import javafx.fxml.FXML;

public class RootLayoutController {
    private MainApp mainApp;

    /**
     * Is called by the main application to give a reference back to itself.
     *
     * @param mainApp
     */
    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;
    }




    @FXML
    private void handleShowBirthdayStatistics() {
        MainApp.showBirthdayStatistics();
    }
}
