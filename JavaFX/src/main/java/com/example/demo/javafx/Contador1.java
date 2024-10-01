package com.example.demo.javafx;

import javafx.application.Application;
import javafx.stage.Stage;

public class Contador1  extends Application {

    @Override
    public void start(Stage escenarioPrincipal) {

        try {
            Stage escenario2= new Stage();
            Contador2 c1= new Contador2();
            Contador2 c2= new Contador2();

            c1.setStage(escenarioPrincipal);
            c2.setStage(escenario2);

            c1.numPulsaciones.bindBidirectional(c2.numPulsaciones);

            escenarioPrincipal.show();
            escenario2.show();

        } catch(Exception e) {
            e.printStackTrace();
        }
    }


}