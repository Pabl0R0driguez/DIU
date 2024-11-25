package com.example.conversor.controller;

import Modelo.ExcepcionMoneda;
import com.example.conversor.model.ConversorModelo;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;

public class ConversorController {
    private ConversorModelo modelo;

    public void setModelo(ConversorModelo modelo) {
        this.modelo = modelo;
    }

    @FXML
    private TextField euros_box;
    @FXML
    private TextField dolares_box;

    @FXML
    public void initialize() {
        euros_box.setText("0");
    }

    public void caja_cambio() throws ExcepcionMoneda{
            euros_box.setOnKeyPressed(event -> {
                if (event.getCode().getName().equals("Enter")) {
                    try {
                    dolares_box.setText(String.valueOf(modelo.cambioMoneda(Integer.parseInt(euros_box.getText()), modelo.setMonedas().get(0).getMultiplicador())));


                    } catch (ExcepcionMoneda e) {
                        Alert alert = new Alert(Alert.AlertType.WARNING);
                        alert.setTitle("ERROR");
                        alert.setHeaderText("Fallo al recuperar la información");
                        alert.setContentText("Intentelo más tarde");
                        alert.showAndWait();
                    }

                }
            });
        }


    }

