package com.example.gestionhotel.model.repository.impl;

import com.example.gestionhotel.model.ExcepcionReserva;
import com.example.gestionhotel.model.ReservaVO;
import com.example.gestionhotel.model.repository.ReservaRepository;

import java.sql.Connection;
import java.sql.Statement;

public class ReservaRepositoryImpl implements ReservaRepository {
    private final ConexionBD conexion = new ConexionBD();
    private Statement stmt;
    private String sentencia;
    private ReservaVO reservaVO;

    @Override
    public void añadirReserva(ReservaVO var1) throws ExcepcionReserva {
        try {
            // Conectar a la base de datos
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();

            // Preparar la sentencia SQL para insertar los datos de la reserva
            this.sentencia = "INSERT INTO Reserva (fechaLlegada, fechaSalida, numeroHabitaciones, tipoHabitacion, fumador, regimenAlojamiento,DNI_cliente) VALUES ('" +
                    var1.getFechaLlegada() + "', '" +
                    var1.getFechaSalida() + "', '" +
                    var1.getNumeroHabitaciones() + "', '" +
                    var1.getTipoHabitacion() + "', '" +
                    var1.isFumador() + "', '" +
                    var1.getRegimenAlojamiento() +
                    var1.getDNI() + "');";

            // Ejecutar la sentencia SQL
            this.stmt.executeUpdate(this.sentencia);
            // Cerrar la sentencia y la conexión
            this.stmt.close();
            this.conexion.desconectarBD(conn);

        } catch (Exception e) {
            // Lanza una excepción personalizada si ocurre un error
            throw new ExcepcionReserva("No se pudo agregar la reserva");
        }


    }
}
