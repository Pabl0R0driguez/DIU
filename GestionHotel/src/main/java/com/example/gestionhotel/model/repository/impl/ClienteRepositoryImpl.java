package com.example.gestionhotel.model.repository.impl;

import com.example.gestionhotel.model.ClienteVO;
import com.example.gestionhotel.model.ExcepcionCliente;
import com.example.gestionhotel.model.repository.ClienteRepository;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class ClienteRepositoryImpl implements ClienteRepository {
    private final ConexionBD conexion = new ConexionBD();
    private Statement stmt;
    private String sentencia;
    private ArrayList<ClienteVO> personas;
    private ClienteVO persona;

    @Override
    public ArrayList<ClienteVO> ObtenerListaPersonas() throws ExcepcionCliente {
        try {
            Connection conn = this.conexion.conectarBD();
            System.out.println("Conexión exitosa con la base de datos");
            this.personas = new ArrayList<>();
            this.stmt = conn.createStatement();
            this.sentencia = "SELECT * FROM Clientes";
            ResultSet rs = this.stmt.executeQuery(this.sentencia);

            while (rs.next()) {
                String  DNI = rs.getString("DNI");
                String nombre = rs.getString("nombre");
                String apellidos = rs.getString("apellidos");
                String direccion = rs.getString("direccion");
                String localidad = rs.getString("localidad");
                String provincia = rs.getString("provincia");

                this.persona = new ClienteVO(DNI, nombre, apellidos, direccion, localidad, provincia);
                this.personas.add(this.persona);
            }

            this.conexion.desconectarBD(conn);
            return this.personas;
        } catch (SQLException var6) {
            throw new ExcepcionCliente("No se ha podido realizar la operación");
        }
    }

    @Override
    public void addPersona(ClienteVO cliente) throws ExcepcionCliente {
        try {
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            this.sentencia = "INSERT INTO Clientes (DNI, nombre, apellidos, direccion, localidad, provincia) VALUES ('" +
                    cliente.getDNI() + "','" + cliente.getNombre() + "','" + cliente.getApellidos() + "','" +
                    cliente.getDireccion() + "','" + cliente.getLocalidad() + "','" + cliente.getProvinica() + "');";
            this.stmt.executeUpdate(this.sentencia);
            this.stmt.close();
            this.conexion.desconectarBD(conn);
            System.out.println("Cliente después de añadir");
        } catch (SQLException var3) {
            throw new ExcepcionCliente("No se ha podido realizar la operación");
        }
    }

    @Override
    public void deletePersona(Integer DNI) throws ExcepcionCliente {
        try {
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            String sql = String.format("DELETE FROM Clientes WHERE DNI = %d", DNI);
            this.stmt.executeUpdate(sql);
            this.conexion.desconectarBD(conn);
            System.out.println("Cliente eliminado correctamente");
        } catch (SQLException var5) {
            throw new ExcepcionCliente("No se ha podido realizar la eliminación");
        }
    }

    @Override
    public void editPersona(ClienteVO cliente) throws ExcepcionCliente {
        try {
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            String sql = String.format("UPDATE Clientes SET nombre = '%s', apellidos = '%s', direccion = '%s', localidad = '%s', provincia = '%s' WHERE DNI = %d",
                    cliente.getNombre(), cliente.getApellidos(), cliente.getDireccion(), cliente.getLocalidad(), cliente.getProvinica(), cliente.getDNI());
            this.stmt.executeUpdate(sql);
            this.conexion.desconectarBD(conn);
        } catch (SQLException var4) {
            throw new ExcepcionCliente("No se ha podido realizar la edición");
        }
    }

    public int lastId() throws ExcepcionCliente {
        int lastClienteId = 0;
        try {
            Connection conn = this.conexion.conectarBD();
            Statement comando = conn.createStatement();
            ResultSet registro = comando.executeQuery("SELECT DNI FROM Clientes ORDER BY DNI DESC LIMIT 1");
            if (registro.next()) {
                lastClienteId = registro.getInt("DNI");
            }
            this.conexion.desconectarBD(conn);
            return lastClienteId;
        } catch (SQLException var5) {
            throw new ExcepcionCliente("No se ha podido realizar la búsqueda del DNI");
        }
    }

    @Override
    public int contarPersonas() throws ExcepcionCliente, SQLException {
        Connection conn = this.conexion.conectarBD();
        this.stmt = conn.createStatement();
        int contadorPersonas = 0;
        Statement comando = conn.createStatement();
        String sql = "SELECT count(*) AS contador FROM Clientes;";
        ResultSet registro = comando.executeQuery(sql);

        if (registro.next()) {
            contadorPersonas = registro.getInt("contador");
        }

        this.conexion.desconectarBD(conn);
        return contadorPersonas;
    }
}
