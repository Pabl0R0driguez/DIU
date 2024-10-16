package modelo;

import java.sql.Connection;
import java.sql.SQLException;
import Modelo.repository.impl.ConexionJDBC; // Importa la clase correcta

public class ConexionJDBCExample {
	//Atributos de la clase
	private ConexionJDBC conexion; //Realiza la conexión
	private Connection conn; //Almacena la conexión activa

	//Constructor
	public ConexionJDBCExample() {
		this.conexion = new ConexionJDBC();
	}

	//Metodo para inciiar la conexion de la clase
	public Connection iniciarConexion() {
		try {
			// Intentar conectar a la base de datos
			conn = conexion.conectarBD();
			System.out.println("Conexión exitosa a la base de datos.");
		} catch (SQLException ex) {
			System.out.println("Error al conectar a la base de datos.");
			ex.printStackTrace();
		} finally {
			// Desconectar de la base de datos en el bloque finally
			if (conn != null) { // Verificamos si la conexión no es nula antes de cerrarla
				conexion.desconectarBD(conn);
				System.out.println("Conexión cerrada.");
			}
			return conn;
		}



	}

		public void cerrarConexion() {
			if (conn != null) { // Si la conexión no es nula, significa que está activa
				// Se llama al metodo  para cerrar la conexión
				conexion.desconectarBD(conn);
				System.out.println("Conexión a la base de datos cerrada.");
			}
		}
	}














