package com.example.conversor;

import Modelo.ExcepcionMoneda;
import Modelo.repository.impl.MonedaRepositoryImpl;
import com.example.conversor.controller.ConversorController;
import com.example.conversor.model.ConversorModelo;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.stage.Stage;

import java.io.IOException;

public class Main extends Application {
    
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("Conversor_View.fxml"));

		stage.setWidth(600);
		stage.setHeight(300);

        Scene conversor = new Scene(fxmlLoader.load(), 320, 240);
        try{
            ConversorController conversorController = fxmlLoader.getController();
            ConversorModelo  conversorModelo= new ConversorModelo();
            conversorModelo.setMonedaRepository(new MonedaRepositoryImpl());
            conversorController.setModelo(conversorModelo);
            conversorController.caja_cambio();

        }catch (ExcepcionMoneda e) {
            Alert alert = new Alert(Alert.AlertType.WARNING);
            alert.setTitle("Fallo");
            alert.setHeaderText("Fallo");
            alert.setContentText("Error");
            alert.showAndWait();
        }


        stage.setTitle("Conversor Monedas");
        stage.setScene(conversor);
        stage.show();


    }

    public static void main(String[] args) {
        launch(args);


    }
}
