package com.example.gestionhotel.model.repository.impl;

import com.example.gestionhotel.model.ExcepcionReserva;
import com.example.gestionhotel.model.ReservaVO;
import com.example.gestionhotel.model.repository.ReservaRepository;
import com.example.gestionhotel.view.RegimenAlojamiento;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class ReservaRepositoryImpl implements ReservaRepository {
    private final ConexionBD conexion = new ConexionBD();
    private Statement stmt;
    private String sentencia;
    private ReservaVO reservaVO;
    RegimenAlojamiento regimenAlojamiento;

    @Override
    public void añadirReserva(ReservaVO var1) throws ExcepcionReserva {
        try {
            // Conectar a la base de datos
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            System.out.println("Añadir persona: " + var1);
            // Preparar la sentencia SQL para insertar los datos de la reserva
            this.sentencia = "INSERT INTO Reserva (fechaLlegada, fechaSalida, numeroHabitaciones, tipoHabitacion, fumador, regimenAlojamiento,DNI_cliente) VALUES ('" +
                    var1.getFechaLlegada() + "', '" +
                    var1.getFechaSalida() + "', '" +
                    var1.getNumeroHabitaciones() + "', '" +
                    var1.getTipoHabitacion() + "', '" +
                    (var1.isFumador() ? 1 : 0) + "', '" +
                    var1.getRegimenAlojamiento() + "', '" +
                    var1.getDNI() + "');";

//Ejemplo
//            this.sentencia = "INSERT INTO Reserva (fechaLlegada, fechaSalida, numeroHabitaciones, tipoHabitacion, fumador, regimenAlojamiento, DNI_cliente) " +
//                    "VALUES ('2024-11-18', '2024-11-20', 2, 'doble', false, 'mediaPension', '12345687D');";


            // Ejecutar la sentencia SQL
            this.stmt.executeUpdate(this.sentencia);

            // Cerrar la sentencia y la conexión
            this.stmt.close();
            this.conexion.desconectarBD(conn);

        } catch (SQLException e) {
            // Obtener el mensaje y el código de error
            System.out.println("Mensaje de error: " + e.getMessage());
            System.out.println("Código de error: " + e.getErrorCode());

            // Opcional: también puedes obtener el estado SQL
            System.out.println("Estado SQL: " + e.getSQLState());
        }


    }
}
