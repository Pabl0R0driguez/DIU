package com.example.demo.ejerciciojavafx;

import javafx.application.Application;
import javafx.stage.Stage;

public class ContadorEscena extends Application {

    ContadorDoble c1 = new ContadorDoble();
    ContadorDoble c2 = new ContadorDoble();

    @Override
    public void start(Stage escena) {
        Stage escena2 = new Stage();

        // Establecemos el Stage para ambas instancias
        c1.setStage(escena);
        c2.setStage(escena2);

        // Enlazamos las propiedades de los contadores bidireccionalmente
        c1.numpulsaciones.bindBidirectional(c2.numpulsaciones);


        escena.show();
        escena2.show();
    }


}


