package com.example.gestionhotel.model.repository.impl;

import com.example.gestionhotel.model.ClienteVO;
import com.example.gestionhotel.model.ExcepcionCliente;
import com.example.gestionhotel.model.ReservaVO;
import com.example.gestionhotel.model.repository.ClienteRepository;
import com.example.gestionhotel.view.Cliente;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.sql.*;
import java.util.ArrayList;

public class ClienteRepositoryImpl implements ClienteRepository {

    private final ConexionBD conexion = new ConexionBD();
    private Statement stmt;
    private String sentencia;
    private ArrayList<ClienteVO> clientes;
    private ClienteVO cliente;

    @Override
    public ArrayList<ClienteVO> ObtenerListaPersonas() throws ExcepcionCliente {
        try {
            Connection conn = this.conexion.conectarBD();
            System.out.println("Conexion exito");
            this.clientes = new ArrayList();
            this.stmt = conn.createStatement();
            this.sentencia = "SELECT * FROM Clientes order by nombre ASC, apellidos ASC";

            ResultSet rs = this.stmt.executeQuery(this.sentencia);

            System.out.println("Conexión exitosa con la base de datos");

            while (rs.next()) {
                String DNI = rs.getString("DNI");
                String nombre = rs.getString("nombre");
                String apellidos = rs.getString("apellidos");
                String direccion = rs.getString("direccion");
                String localidad = rs.getString("localidad");
                String provincia = rs.getString("provincia");

                this.cliente = new ClienteVO(DNI, nombre, apellidos, direccion, localidad, provincia);
                this.clientes.add(cliente);
            }
            this.conexion.desconectarBD(conn);
            return this.clientes;

        } catch (Exception e) {
            throw new ExcepcionCliente("No se pudo conectar");
        }
    }

    @Override
    public void addPersona(ClienteVO var1) throws ExcepcionCliente {
        try {
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            this.sentencia = "INSERT INTO Clientes (DNI, nombre, apellidos, direccion, localidad, provincia) VALUES ('" +
                    var1.getDNI() + "', '" +
                    var1.getNombre() + "', '" +
                    var1.getApellidos() + "', '" +
                    var1.getDireccion() + "', '" +
                    var1.getLocalidad() + "', '" +
                    var1.getProvincia() + "');";

            this.stmt.executeUpdate(this.sentencia);
            this.stmt.close();
            Cliente.setContadorClientes(Cliente.getContadorClientes() + 1);
            System.out.println("Clientes registrados: " + Cliente.getContadorClientes());
            this.conexion.desconectarBD(conn);


        } catch (Exception e) {
            throw new ExcepcionCliente("No se pudo agregar la persona");
        }
    }


    @Override
    public void deletePersona(String var1) throws ExcepcionCliente {
        try {
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            Statement comando = conn.createStatement();
//        System.out.println(var1);
            String sql = String.format("DELETE FROM Clientes WHERE DNI = '%s'", var1);
            comando.executeUpdate(sql);

            Cliente.setContadorClientes(Cliente.getContadorClientes() - 1);
            this.conexion.desconectarBD(conn);

        } catch (Exception e) {
            throw new ExcepcionCliente("No se pudo borrar la persona");
        }
    }


    @Override
    public void editPersona(ClienteVO var1) throws ExcepcionCliente {
        try {
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            String sql = String.format("UPDATE Clientes SET nombre = '%s', apellidos = '%s', direccion = '%s', localidad = '%s', provincia = '%s' WHERE DNI = '%s'",
                    var1.getNombre(), var1.getApellidos(), var1.getDireccion(), var1.getLocalidad(), var1.getProvincia(), var1.getDNI());
            this.stmt.executeUpdate(sql);
        } catch (Exception var4) {
            throw new ExcepcionCliente("No se ha podido realizar la edición");
        }
    }


    public int contarClientes() throws SQLException {

        Connection conn = this.conexion.conectarBD();
        this.stmt = conn.createStatement();
        int contadorpersonas = 0;
        Statement comando = conn.createStatement();
        String sql = String.format("SELECT count(*) AS contador FROM Clientes;");
        ResultSet registro = comando.executeQuery(sql);

        while(registro.next()) {
            contadorpersonas = registro.getInt("contador");
        }
        this.conexion.desconectarBD(conn);
        return contadorpersonas;
    }

}

