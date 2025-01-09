package com.example.demo.javafxml2.controller;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.scene.input.KeyCode;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyEvent;

public class HelloController {
	String nuevoTexto = "";
	int nuevoNumero = 0;
	int textoNumero = 0;

	@FXML
	private ProgressBar barra;
	@FXML
	private TextField texto;
	@FXML
	private Button incrementar, actualizar, aplicar, reducir;
	@FXML
	private Label contador;


	public SimpleIntegerProperty pulsaciones = new SimpleIntegerProperty (0);

	@FXML
	public void incrementar() {
		pulsaciones.set(pulsaciones.get()+1);
		contador.setText(String.valueOf(pulsaciones));
		barra.setProgress(pulsaciones.get() / 10.0);
	}

	@FXML
	public void reducir() {
		pulsaciones.set(pulsaciones.get()-1);
		contador.setText(String.valueOf(pulsaciones));
		barra.setProgress(pulsaciones.get() / 10.0);

	}

	@FXML
	public void actualizar() {
		pulsaciones.set(pulsaciones.get());
		contador.setText(String.valueOf(pulsaciones));
		barra.setProgress(pulsaciones.get() / 10.0);
	}


	//Botón para actualizar barra
/*//	public void aplicar(ActionEvent actionEvent) {
//		//Obtengo el texto del textField
//		nuevoTexto = texto.getText();
//		//pasamos el texto recogio a entero
//		pulsaciones = Integer.parseInt(nuevoTexto);
//		//Actualizamso el contador con el nuevo numero
//		contador.setText(Integer.toString(pulsaciones));
//
//		//Actual
//		contador.setText(Integer.toString(pulsaciones));
//		barra.setProgress(pulsaciones / 10.0);
//
//	}*/

	pulsaciones.addListener((obs, oldValue, newValue) -> {
		pulsaciones.set(Integer.parseInt(texto.getText()));
		contador.setText(String.valueOf(pulsaciones));
		barra.setProgress(pulsaciones.get() / 10.0);
	});
	@FXML
	public void initialize() {
		// Escuchar el evento de la tecla Enter en el TextField
		texto.setOnKeyPressed(event -> {
			if (event.getCode().getName().equals("Enter")) {
				// pasamos el tesxtField a entero y actualizamos el label y la barra
			pulsaciones.set(Integer.parseInt(texto.getText()));
				contador.setText(String.valueOf(pulsaciones));
				barra.setProgress(pulsaciones.get() / 10.0);

			}
		});
	}

}





