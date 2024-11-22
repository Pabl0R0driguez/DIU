package com.example.examendiu;


import com.example.examendiu.controller.articulos_controller;
import com.example.examendiu.controller.modificar_articulos_controller;
import com.example.examendiu.model.ArticuloModelo;
import com.example.examendiu.model.repository.impl.ArticuloRepositoryImpl;
import com.example.examendiu.view.Articulo;
import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Modality;
import javafx.stage.Stage;

import java.io.IOException;
import java.sql.SQLException;

public class MainApp extends Application {

    // Eliminar static de primaryStage
    private static Stage primaryStage;
    private BorderPane rootLayout;
    ArticuloModelo articuloModelo;
    ObservableList<Articulo> listaArticulos = FXCollections.observableArrayList();

    // Constructor vacío
    public MainApp() {

        ArticuloRepositoryImpl articuloRepository = new ArticuloRepositoryImpl();
        articuloModelo = new ArticuloModelo();

        try{
            articuloModelo.setArticuloRepository(articuloRepository);
            listaArticulos.addAll(articuloModelo.setArticulo());



        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void start(Stage primaryStage) {
        this.primaryStage = primaryStage;
        this.primaryStage.setTitle("Catalogo");
        initRootLayout();
        showPersonOverview();

    }

    public void setCatalogoModel(ArticuloModelo articuloModelo) {
        this.articuloModelo = articuloModelo;
    }

    public ObservableList<Articulo> getListaArticulos() {
        return listaArticulos;
    }

    public ArticuloModelo getArticuloModelo() {
        return articuloModelo;
    }

    // Inicializamos el diseño raíz cargando el archivo FXML correspondiente
    public void initRootLayout() {
        try {
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/examendiu/diseno_raiz.fxml"));
            rootLayout = (BorderPane) loader.load();

            Scene scene = new Scene(rootLayout);
            primaryStage.setScene(scene);
            primaryStage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    // Vista de las personas dentro del diseño raíz
    public boolean showPersonOverview() {
        try {
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/examendiu/articulos.fxml"));
            AnchorPane personOverview = (AnchorPane) loader.load();
            rootLayout.setCenter(personOverview);

            articulos_controller controller = loader.getController();
            controller.setMainApp(this);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return false;
    }

    // Muestra estadísticas de cumpleaños
    public boolean showArticulos(Articulo articulo) throws IOException {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(MainApp.class.getResource("/com/example/examendiu/modificar_articulos.fxml"));
        AnchorPane page = (AnchorPane) loader.load();

        Stage dialogStage = new Stage();
        dialogStage.setTitle("Editar Artículo");
        dialogStage.initModality(Modality.NONE);
        dialogStage.initOwner(primaryStage);
        Scene scene = new Scene(page);
        dialogStage.setScene(scene);

        modificar_articulos_controller controller = loader.getController();
        controller.setDialogStage(dialogStage);
        controller.setArticulo(articulo);

        controller.setArticuloModelo(articuloModelo);

        //Editar barra progreso
        System.out.println("porcentaje articulos: " + (double)Articulo.getContadorArticulos() / (double)Articulo.getTotalArticulos());
        controller.setProgreso((double)Articulo.getContadorArticulos() / (double)Articulo.getTotalArticulos());

        dialogStage.showAndWait();
        return controller.isOkClicked();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
