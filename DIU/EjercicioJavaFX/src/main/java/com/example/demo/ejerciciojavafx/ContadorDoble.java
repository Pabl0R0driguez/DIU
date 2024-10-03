package com.example.demo.ejerciciojavafx;

import javafx.beans.property.SimpleIntegerProperty;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.Slider;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.text.Font;
import javafx.stage.Stage;

public class ContadorDoble {

    Label l1; // Label para esta instancia

    //Se utiliza para que otros objetos pueden "escuchar" los cambios en esta propiedad y reaccionar a ellos.
    SimpleIntegerProperty numpulsaciones = new SimpleIntegerProperty(0); // Contador como propiedad

    public void botonTernario(int numero) {
        // Actualiza el contador
        numpulsaciones.set((numero == 0) ? 0 : numpulsaciones.get() + numero);
    }

    public void setStage(Stage escenarioPrincipal) {
        try {
            HBox raiz = new HBox(10);
            raiz.setPadding(new Insets(10));
            raiz.setMinSize(20, 20);
            raiz.setAlignment(Pos.TOP_CENTER);

            Button bt1 = new Button("+");
            Button bt2 = new Button("-");
            Button bt3 = new Button("0");

            // Acciones de los botones
            bt1.setOnAction(e -> botonTernario(1));
            bt2.setOnAction(e -> botonTernario(-1));
            bt3.setOnAction(e -> botonTernario(0));

            raiz.getChildren().addAll(bt1, bt2, bt3);

            l1 = new Label("0");
            l1.setFont(Font.font(30));
            l1.setId("text");

            // Actualiza el Label cuando cambia el valor
            //Para poder cambiar el numpulcaciones
            //Estructura: obs(representa numpulsaciones), oldvalor(valor antes del cambio) y newValue(despues)
            numpulsaciones.addListener((obs, oldValue, newValue) -> {
                l1.setText(String.valueOf(newValue));});


            VBox raiz2 = new VBox();
            raiz2.setPadding(new Insets(10));
            raiz2.setAlignment(Pos.TOP_CENTER);
            raiz2.getChildren().addAll(raiz, l1);
            raiz2.setId("raiz2");
            raiz2.getStylesheets().add(getClass().getResource("/styles/estilosContador.css").toExternalForm());

            Scene escena = new Scene(raiz2, 300, 200);
            escenarioPrincipal.setTitle("Panel horizontal");
            escenarioPrincipal.setScene(escena);
            escenarioPrincipal.show();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}