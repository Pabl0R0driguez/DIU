package com.example.conversormonedas;

import Modelo.repository.impl.ConexionJDBC;
import java.sql.Connection;
import java.sql.SQLException;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;
import modelo.ConexionJDBCExample;

import java.io.IOException;

public class Main extends Application {
	@Override
	public void start(Stage stage) throws IOException {
		FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("ConversorView.fxml"));
		Scene scene = new Scene(fxmlLoader.load(), 320, 240);
		stage.setTitle("Hello!");
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

		launch();
	}
}




