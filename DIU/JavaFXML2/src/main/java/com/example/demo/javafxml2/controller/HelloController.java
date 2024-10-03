package com.example.demo.javafxml2.controller;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.TextField;

public class HelloController {
	@FXML
	private ProgressBar barra;
	@FXML
	private TextField texto;
	@FXML
	private Button incrementar,actualizar,aplicar,reducir;
	@FXML
	private Label contador;


	private int pulsaciones = 0;

	@FXML
	public void incrementar() {
		pulsaciones++;
		contador.setText(Integer.toString(pulsaciones));
		barra.setProgress(pulsaciones / 10.0);
	}

	@FXML
	public void actualizar() {
		contador.setText("Contador actualizado: " + pulsaciones);
	}

	@FXML
	public void reducir() {
			pulsaciones--;
			contador.setText(Integer.toString(pulsaciones));
			barra.setProgress(pulsaciones / 10.0);

	}

	public void cambiarValor(){

	}

	public void aplicar(ActionEvent actionEvent) {
		//Obtengo el texto del textField
		String nuevoTexto = texto.getText();
		//pasamos el texto recogio a entero
		int nuevoNumero = Integer.parseInt(nuevoTexto);
		//Actualizamso el contador con el nuevo numero
		contador.setText(Integer.toString(nuevoNumero));
		if(nuevoNumero>=25){
			barra.setProgress(pulsaciones / 10.0);
		}
		else if (nuevoNumero < 25) {
			barra.setProgress(pulsaciones/10.0);
		}
		else if (nuevoNumero == 50) {
			barra.setProgress(pulsaciones/10.0);
		}
		else if (nuevoNumero == 0) {
			barra.setProgress(pulsaciones/10.0);
		}
	}
}
