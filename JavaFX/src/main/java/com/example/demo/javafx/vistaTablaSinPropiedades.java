package com.example.demo.javafx;

import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.SelectionMode;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class vistaTablaSinPropiedades extends Application {

    public static class Personaje {
        private String nombre;
        private String apellidos;

        private Personaje(String nombre, String apellidos) {
            this.nombre = nombre;
            this.apellidos = apellidos;
        }

        public String getNombre() {
            return nombre;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }

        public String getApellidos() {
            return apellidos;
        }

        public void setApellidos(String apellidos) {
            this.apellidos = apellidos;
        }

    }

    private TableView<Personaje> tvPersonajes;
    final ObservableList<Personaje> personajes = FXCollections.observableArrayList(
            new Personaje("Pepito", "Grillo"),
            new Personaje("Bob", "Esponja"),
            new Personaje("Juan", "Sin Miedo"),
            new Personaje("Perico", "De Los Palotes"),
            new Personaje("Juana", "La Loca"));

    TableColumn<Personaje, String> columnaNombre = new TableColumn<Personaje, String>("Nombre");
    TableColumn<Personaje, String> columnaApellidos = new TableColumn<Personaje, String>("Apellidos");

    @Override
    public void start(Stage escenarioPrincipal) {
        try {
            VBox raiz = new VBox();
            raiz.setPadding(new Insets(40));
            raiz.setSpacing(10);

            Label lbPersonajes = new Label("Personajes:");
            tvPersonajes = new TableView<Personaje>();
            tvPersonajes.getColumns().add(columnaNombre);
            tvPersonajes.getColumns().add(columnaApellidos);
            tvPersonajes.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE);
            tvPersonajes.setEditable(true);
            columnaNombre.setMinWidth(100);
            columnaNombre.setCellValueFactory(new PropertyValueFactory<Personaje, String>("nombre"));
            columnaApellidos.setMinWidth(100);
            columnaApellidos.setCellValueFactory(new PropertyValueFactory<Personaje, String>("apellidos"));

            tvPersonajes.setItems(personajes);

            raiz.getChildren().addAll(lbPersonajes, tvPersonajes);

            Scene escena = new Scene(raiz, 300, 250);
            escenarioPrincipal.setTitle("Vista de tabla");
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