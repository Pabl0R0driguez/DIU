package com.example.examendiu.controller;

import com.example.examendiu.MainApp;
import com.example.examendiu.model.ArticuloModelo;
import com.example.examendiu.view.Articulo;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.TextField;

import javafx.event.ActionEvent;
import javafx.stage.Stage;

public class modificar_articulos_controller {

        @FXML
        private TextField descripcionField;



        @FXML
        private TextField stockField;

        @FXML
        private TextField precioField;

        @FXML
        private TextField nombreField;

        @FXML
        private ProgressBar barraProgreso;

        Stage stage;
        ArticuloModelo articuloModelo;
        Articulo articulo;
        private boolean okClicked = false;
        private MainApp mainApp;


        @FXML
        void handleOk(ActionEvent event) {

          articulo.setNombre(nombreField.getText());
          articulo.setDescripcion(descripcionField.getText());
          articulo.setStock(Integer.parseInt(stockField.getText()));
          articulo.setPrecio(Double.parseDouble(precioField.getText()));


        okClicked = true;
        stage.close();

        }



        //Barra
        public void setProgreso (double progreso){
                barraProgreso.setProgress(progreso);
        }


        @FXML
        void borrar(ActionEvent event) {
                okClicked = false;
        }
        @FXML
        void handleCancel(ActionEvent event) {
                stage.close();
        }

        public void setArticuloModelo(ArticuloModelo catalogoModel) {
                this.articuloModelo = catalogoModel;
        }
        @FXML
        private void initialize() {
        }

        public void setDialogStage(Stage dialogStage) {
                this.stage = dialogStage;
        }

        public void setArticulo(Articulo articulo) {
                this.articulo = articulo;
                nombreField.setText(articulo.getNombre());
                descripcionField.setText(articulo.getDescripcion());
                precioField.setText(String.valueOf(articulo.getPrecio()));
                stockField.setText(Integer.toString(articulo.getStock()));

        }

        public boolean isOkClicked() {
                return okClicked;
        }



}


