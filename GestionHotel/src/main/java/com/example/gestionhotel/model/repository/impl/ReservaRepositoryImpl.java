package com.example.gestionhotel.model.repository.impl;

import com.example.gestionhotel.model.ExcepcionReserva;
import com.example.gestionhotel.model.ReservaVO;
import com.example.gestionhotel.model.repository.ReservaRepository;
import com.example.gestionhotel.view.RegimenAlojamiento;
import com.example.gestionhotel.view.Reserva;
import com.example.gestionhotel.view.TipoHabitacion;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;

import static com.example.gestionhotel.view.TipoHabitacion.DOBLE;

public class ReservaRepositoryImpl implements ReservaRepository {
    private final ConexionBD conexion = new ConexionBD();
    private Statement stmt;
    private String sentencia;
    private ReservaVO reservaVO;
    RegimenAlojamiento regimenAlojamiento;
    private ArrayList<ReservaVO> reservas;

    @Override
    public void añadirReserva(ReservaVO var1) throws ExcepcionReserva {
        try {
            // Conectar a la base de datos
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            System.out.println("Añadir persona: " + var1);
            // Preparar la sentencia SQL para insertar los datos de la reserva
            // Supongamos que var1 es un objeto de la clase Cliente
            String dni = var1.getDNI();  // Esto obtiene el valor real de la propiedad dniProperty como un String

// Y luego lo usas en tu sentencia SQL
            this.sentencia = "INSERT INTO Reserva (fechaLlegada, fechaSalida, numeroHabitaciones, tipoHabitacion, fumador, regimenAlojamiento, DNI_cliente) VALUES ('" +
                    var1.getFechaLlegada() + "', '" +
                    var1.getFechaSalida() + "', '" +
                    var1.getNumeroHabitaciones() + "', '" +
                    var1.getTipoHabitacion() + "', '" +
                    (var1.isFumador() ? 1 : 0) + "', '" +
                    var1.getRegimenAlojamiento() + "', '" +
                    dni + "');";



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

    @Override
    public ArrayList<ReservaVO> listarReservas(String DNI) throws ExcepcionReserva {
        try {
            Connection conn = this.conexion.conectarBD();
            System.out.println("Conexión exitosa con la base de datos");

            this.reservas = new ArrayList<ReservaVO>(); // Lista para almacenar las reservas
            this.stmt = conn.createStatement();
            this.sentencia = "SELECT * FROM Reserva WHERE DNI_cliente = '" + DNI + "'"; // Consulta a la tabla de reservas donde el DNI sea el seleccionado

            ResultSet rs = this.stmt.executeQuery(this.sentencia);

            while (rs.next()) {
                // Obtener los datos de la reserva desde el ResultSet
                int idReserva = rs.getInt("id_reserva");
                LocalDate fechaLlegada = LocalDate.parse(rs.getString("fechaLlegada"));
                LocalDate fechaSalida = LocalDate.parse(rs.getString("fechaSalida"));
                TipoHabitacion tipoHabitacion = DOBLE; //TipoHabitacion.valueOf(rs.getString("tipoHabitacion"));
                int numHabitaciones = rs.getInt("numeroHabitaciones");
                boolean fumador = rs.getBoolean("fumador");
                RegimenAlojamiento regimen =  RegimenAlojamiento.ALOJAMIENTO_DESAYUNO;//RegimenAlojamiento.valueOf(rs.getString("regimenAlojamiento"));
                String dniCliente = rs.getString("DNI_cliente");

                System.out.println("sssss");

                // Crear un objeto ReservaVO con los datos obtenidos
//                this.reservaVO = new ReservaVO(idReserva, fechaLlegada, fechaSalida, numHabitaciones, tipoHabitacion, fumador, regimen, dniCliente);

                this.reservaVO = new ReservaVO(idReserva, fechaLlegada, fechaSalida, numHabitaciones, tipoHabitacion, fumador, regimen, dniCliente);

                System.out.println("reserva: " + reservaVO);

                // Añadir la reserva a la lista
                this.reservas.add(reservaVO);
            }

            this.conexion.desconectarBD(conn); // Cerrar la conexión a la base de datos
            return this.reservas; // Retornar la lista de reservas

        } catch (Exception e) {
            throw new ExcepcionReserva("No se pudo conectar");
        }
    }

}