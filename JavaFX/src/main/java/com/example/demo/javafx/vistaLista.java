package com.example.demo.javafx;

import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.scene.control.SelectionMode;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class vistaLista extends Application {

    @Override
    public void start(Stage escenarioPrincipal) {
        try {
            VBox raiz = new VBox();
            raiz.setPadding(new Insets(40));
            raiz.setSpacing(10);

            Label lbSelecciona = new Label("Seleccina");
            ListView<String> lvComplementos = new ListView<String>(FXCollections.observableArrayList(
                    "Pendientes"));
            lvComplementos.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE);

            raiz.getChildren().addAll(lbSelecciona, lvComplementos);

            Scene escena = new Scene(raiz, 300, 200);
            escenarioPrincipal.setTitle("Vista de lista");
            escenarioPrincipal.setScene(escena);
            escenarioPrincipal.show();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        launch(args);
    }

}