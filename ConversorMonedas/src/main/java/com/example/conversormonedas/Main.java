package com.example.conversormonedas;

import java.sql.Connection;

import Modelo.repository.impl.MonedaRepositoryImpl;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;
import com.example.conversormonedas.modelo.ConexionJDBCExample;
import com.example.conversormonedas.modelo.ConversorModelo;

import java.io.IOException;

public class Main extends Application {
	@Override
	public void start(Stage stage) throws IOException {
		FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("ConversorView.fxml"));
		Scene scene = new Scene(fxmlLoader.load(), 320, 240);
		stage.setTitle("Conversor");
		stage.setScene(scene);
		stage.show();
	}

	public static void main(String[] args) {

		ConexionJDBCExample conexionJDBC = new ConexionJDBCExample();
		Connection connection = null;
		try{
			connection = conexionJDBC.iniciarConexion();
		}finally {
			conexionJDBC.cerrarConexion();
		}

		//Instanciamos ConversorModelo
		ConversorModelo conversorModelo = new ConversorModelo();
		conversorModelo.setMonedaRepository(new MonedaRepositoryImpl());


		launch();
	}
}




