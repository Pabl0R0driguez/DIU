package com.example.gestionhotel;

import com.example.gestionhotel.MainApp;
import javafx.fxml.FXML;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.ProgressIndicator;
import javafx.stage.Stage;

public class DobleController {

    MainApp mainApp;
    Stage stage;

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

    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;
    }

    public void setDialogStage(Stage dialogStage) {
        this.stage = dialogStage;
    }

}
