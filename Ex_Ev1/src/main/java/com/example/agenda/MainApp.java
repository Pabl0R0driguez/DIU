package com.example.agenda;

import java.io.IOException;

import com.example.agenda.controller.Nuevo_Articulo_Controller;
import com.example.agenda.model.CatalogoModel;
import com.example.agenda.model.ExcepcionArticulo;
import com.example.agenda.model.repository.impl.ArticuloRepositoryImpl;
import com.example.agenda.view.Articulo;
import javafx.application.Application;
import javafx.beans.binding.Bindings;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.collections.FXCollections;
import javafx.collections.ListChangeListener;
import javafx.collections.ObservableList;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.ProgressBar;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.stage.Modality;
import javafx.stage.Stage;
import com.example.agenda.controller.Catalogo_Controller;

public class MainApp extends Application {

    private static ObservableList<Articulo> articuloData = FXCollections.observableArrayList();

    private static Stage primaryStage;
    private BorderPane rootLayout;
    private CatalogoModel catalogoModel;

    // Propiedad para la barra de progreso
    private final SimpleDoubleProperty progressProperty = new SimpleDoubleProperty(0);

    public MainApp() {
        catalogoModel = new CatalogoModel();
        ArticuloRepositoryImpl agendaRepository = new ArticuloRepositoryImpl();
        try {
            catalogoModel.setArticuloRepository(agendaRepository);
            articuloData.addAll(catalogoModel.setArticulos());
            // Establecer el progreso inicial
            updateProgress();

            articuloData.addListener((ListChangeListener<Articulo>) change -> {
                while (change.next()) {
                    updateProgress();
                }
            });


        } catch (ExcepcionArticulo e) {
            Alert alert = new Alert(Alert.AlertType.WARNING);
            alert.setTitle("ERROR");
            alert.setHeaderText("No se ha conectar a la base de datos para la agenda");
            alert.setContentText("Por favor, inicie el servidor con la base de datos");
            alert.showAndWait();
            throw new RuntimeException(e);
        }
    }

    public ObservableList<Articulo> getPersonData() {
        return articuloData;
    }

    @Override
    public void start(Stage primaryStage) {
        this.primaryStage = primaryStage;
        this.primaryStage.setTitle("Catalogo");
        initRootLayout();
        showCatalogo();
    }

    public void initRootLayout() {
        try {
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/agenda/Root_Layout.fxml"));
            rootLayout = (BorderPane) loader.load();

            Scene scene = new Scene(rootLayout);
            primaryStage.setScene(scene);
            primaryStage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void showCatalogo() {
        try {
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/agenda/Catalogo.fxml"));
            AnchorPane personOverview = (AnchorPane) loader.load();
            rootLayout.setCenter(personOverview);

            Catalogo_Controller controller = loader.getController();
            controller.setMainApp(this);
            controller.setCatalogoModel(catalogoModel);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public boolean showPersonEditDialog(Articulo articulo) {
        try {
            FXMLLoader loader = new FXMLLoader();
            loader.setLocation(MainApp.class.getResource("/com/example/agenda/Nuevo_Articulo.fxml"));
            AnchorPane page = (AnchorPane) loader.load();

            Stage dialogStage = new Stage();
            dialogStage.setTitle("Edit Artículo");
            dialogStage.initModality(Modality.NONE);
            dialogStage.initOwner(primaryStage);
            Scene scene = new Scene(page);
            dialogStage.setScene(scene);

            Nuevo_Articulo_Controller controller = loader.getController();
            controller.setDialogStage(dialogStage);
            controller.setArticulo(articulo);
            controller.setCatalogoModel(catalogoModel);
            controller.setTotalProductos();


            // Vincular la barra de progreso al progreso de contactos
            ProgressBar progressBar = (ProgressBar) page.lookup("#barra");
            if (progressBar != null) {
                Bindings.bindBidirectional(progressBar.progressProperty(), progressProperty);
            }

            dialogStage.showAndWait();

            return controller.isOkClicked();
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    private void updateProgress() {
        // Actualizar el valor de progreso basado en el tamaño de personData
        double progress = (double) articuloData.size() / 50; // 50 es el máximo
        progressProperty.set(progress);
    }

    public static void main(String[] args) {
        launch(args);
    }
}