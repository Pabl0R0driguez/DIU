package com.example.demo.javafxml2;

import com.example.demo.javafxml2.controller.HelloController;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class HelloApplication extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(HelloApplication.class.getResource("hello-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load());
        stage.setTitle("Hello!");
        stage.setScene(scene);
        stage.show();

        FXMLLoader fxmlLoader2 = new FXMLLoader(HelloApplication.class.getResource("hello-view.fxml"));
        Stage stage2 = new Stage();
        Scene scene2 = new Scene(fxmlLoader2.load());


        stage2.setTitle("Hello!");
        stage2.setScene(scene2);
        stage2.show();

        HelloController clase1 = fxmlLoader.getController();
        HelloController clase2 = fxmlLoader.getController();

        clase2.pulsaciones.bindBidirectional(clase1.pulsaciones);





    }


    public static void main(String[] args) {
        launch();
    }
}