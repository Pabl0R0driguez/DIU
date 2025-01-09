package com.example.examendiu.controller;

import com.example.examendiu.MainApp;
import com.example.examendiu.model.ArticuloModelo;
import com.example.examendiu.model.ExcepcionArticulo;
import com.example.examendiu.util.ArticuloUtil;
import com.example.examendiu.view.Articulo;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;

import java.io.IOException;

public class articulos_controller {

        private MainApp mainApp;

        @FXML
        private Label stockLabel;

        @FXML
        private Label totalLabel;

        @FXML
        private TextField unidadesField;

        @FXML
        private Label nombreLabel;

        @FXML
        private Label precioLabel;

        @FXML
        private TableView<Articulo> articuloTable;

        @FXML
        private TableColumn<Articulo,String> nombreColumn;

        @FXML
        private TableColumn<Articulo,String> precioColumn;

        @FXML
        private Label descripcionLabel;

        ArticuloModelo articulomodelo;

        @FXML
        private void initialize() {
            // Initialize the person table with the two columns.
            nombreColumn.setCellValueFactory(cellData -> cellData.getValue().nombreProperty());
            precioColumn.setCellValueFactory(cellData -> new SimpleStringProperty(String.valueOf(cellData.getValue().getPrecio())));

            showPersonDetails(null);

            // Listen for selection changes and show the person details when changed.
            articuloTable.getSelectionModel().selectedItemProperty().addListener(
                    (observable, oldValue, newValue) -> showPersonDetails(newValue));

        }


        private void showPersonDetails(Articulo articulo) {
            if (articulo != null) {
                nombreLabel.setText(articulo.getNombre());
                descripcionLabel.setText(articulo.getDescripcion());
                precioLabel.setText(String.valueOf(articulo.getPrecio()));
                stockLabel.setText(Integer.toString(articulo.getStock()));


            } else {
                // Person is null, remove all the text.
                nombreLabel.setText("");
                descripcionLabel.setText("");
                precioLabel.setText("");
                stockLabel.setText("");
            }
        }

        @FXML
        void borrar() throws ExcepcionArticulo {
            int seleccionado = articuloTable.getSelectionModel().getSelectedIndex();
            Articulo seleccionadoArticulo = articuloTable.getSelectionModel().getSelectedItem();

            if (seleccionado >= 0) {
                articuloTable.getItems().remove(seleccionado);
                try {
                    mainApp.getArticuloModelo().getArticuloRepository().eliminarArticulo(seleccionadoArticulo.getId());
                } catch (ExcepcionArticulo e) {
                    throw new RuntimeException(e);
                }
            } else {
                Alert alert = new Alert(Alert.AlertType.WARNING);
                alert.setTitle("No Seleccionado");
                alert.setHeaderText("No hay artículo seleccionado");
                alert.setContentText("Por favor selecciona un artículo en la tabla");
                alert.showAndWait();
            }

        }
        @FXML
        void editar(ActionEvent event) throws ExcepcionArticulo, IOException {
            Articulo selectedPerson = articuloTable.getSelectionModel().getSelectedItem();
            if (selectedPerson != null) {
                boolean okClicked = mainApp.showArticulos(selectedPerson);
                articuloTable.refresh();
                try {
                    mainApp.getArticuloModelo().getArticuloRepository().actualizarArticulo(ArticuloUtil.parseToArticuloVO(selectedPerson));
                } catch (ExcepcionArticulo e) {
                    throw new RuntimeException(e);
                }
                    if(okClicked) {
                        // Actualiza la persona en la lista observable
                        showPersonDetails(selectedPerson);
                        // actualiza la base de datos}

                    } else {
                        // Nothing selected.
                        Alert alert = new Alert(Alert.AlertType.WARNING);
                        alert.setTitle("No seleccionado");
                        alert.setHeaderText("No hay persona seleccionada");
                        alert.setContentText("Porfavor selecciona una persona en la tabla");
                        alert.showAndWait();
                    }
                }
            }





        @FXML
        void añadirArticulo() throws IOException {
            Articulo articuloTemporal = new Articulo();

            boolean onClicked = mainApp.showArticulos(articuloTemporal);
            System.out.println("numero de articulos: " + mainApp.getListaArticulos().size() );
            if(onClicked && mainApp.getListaArticulos().size() < 50)
            {
                try {
                    mainApp.getListaArticulos().add(articuloTemporal);
                    mainApp.getArticuloModelo().getArticuloRepository().insertarArticulo(ArticuloUtil.parseToArticuloVO(articuloTemporal));

                    } catch (ExcepcionArticulo e) {
                        throw new RuntimeException(e);
                    }

            }
            else {
                Alert alert = new Alert(Alert.AlertType.WARNING);
                alert.setHeaderText("No puedes");
                alert.showAndWait();
            }
        }

        @FXML
        void calcularTotal(ActionEvent event) {

        }


        public void setMainApp(MainApp mainApp) {
            this.mainApp = mainApp;
            // Add observable list data to the table
            articuloTable.setItems(mainApp.getListaArticulos());
        }



    }


