package com.example.agenda.model.repository.impl;

import com.example.agenda.model.ExcepcionPersona;
import com.example.agenda.model.PersonaVO;
import com.example.agenda.model.repository.PersonaRepository;
import com.example.agenda.model.repository.impl.ConexionBD;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;

public class PersonaRepositoryImpl implements PersonaRepository {
private final ConexionBD conexion = new ConexionBD();
private Statement stmt;
private String sentencia;
private ArrayList<PersonaVO> personas;
private PersonaVO persona;


    @Override
    public ArrayList<PersonaVO> ObtenerListaPersonas() throws ExcepcionPersona {
        try {
            Connection conn = this.conexion.conectarBD();
            this.personas = new ArrayList();
            this.stmt = conn.createStatement();
            this.sentencia = "SELECT * FROM contactos";
            ResultSet rs = this.stmt.executeQuery(this.sentencia);

            while(rs.next()) {
                String m = rs.getString("nombre");
                String a = rs.getString("apellido");
                String c = rs.getString("calle");
                Integer codigoPostal = rs.getInt("codigoPostal");
                String ci = rs.getString("ciudad");
                Date fechaNacimiento = rs.getDate("fechaNacimiento");


                this.persona = new PersonaVO(m, a,c,codigoPostal,ci,fechaNacimiento);
                this.personas.add(this.persona);
            }

            this.conexion.desconectarBD(conn);
            return this.personas;
        } catch (SQLException var6) {
            throw new ExcepcionPersona("No se ha podido realizar la operación");
        }
    }

    @Override
    public void addPersona(PersonaVO var1) throws ExcepcionPersona {
        try {
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            this.sentencia = "INSERT INTO contactos (nombre, multiplicador) VALUES ('" + var1.getNombre() + "','" + var1.getApellido() + "','" + var1.getCalle() + "','" + var1.getCodigoPostal() + "','" + var1.getCiudad() + "','" + var1.getFechaNacimiento()+ "');";
            this.stmt.executeUpdate(this.sentencia);
            this.stmt.close();
            this.conexion.desconectarBD(conn);
        } catch (SQLException var3) {
            throw new ExcepcionPersona("No se ha podido realizar la operación");
        }
    }

    @Override
    public void deletePersona(Integer var1) throws ExcepcionPersona {
        try {
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            Statement comando = conn.createStatement();
            String sql = String.format("DELETE FROM contactos WHERE codigo = %d", var1);
            comando.executeUpdate(sql);
            this.conexion.desconectarBD(conn);
        } catch (SQLException var5) {
            throw new ExcepcionPersona("No se ha podido relaizr la eliminación");
        }
    }

    @Override
    public void editPersona(PersonaVO var1) throws ExcepcionPersona {
        try {
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            String sql = String.format("UPDATE monedas SET nombre = '%s', multiplicador = '%s' WHERE codigo = %d", var1.getNombre(), var1.getApellido() ,var1.getCalle() ,var1.getCodigoPostal() ,var1.getCiudad() ,var1.getFechaNacimiento());
            this.stmt.executeUpdate(sql);
        } catch (Exception var4) {
            throw new ExcepcionPersona("No se ha podido relaizr la edición");
        }
    }

        public int lastId() throws ExcepcionPersona{
            int lastMonedaId = 0;

            try {
                Connection conn = this.conexion.conectarBD();
                Statement comando = conn.createStatement();

                for(ResultSet registro = comando.executeQuery("SELECT codigo FROM monedas ORDER BY codigo DESC LIMIT 1"); registro.next(); lastMonedaId = registro.getInt("codigo")) {
                }

                return lastMonedaId;
            } catch (SQLException var5) {
                throw new ExcepcionPersona("No se ha podido realizar la busqueda del ID");
            }
        }
    }

