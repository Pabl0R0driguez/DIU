package com.example.agenda.model.repository.impl;
import com.example.agenda.model.ExcepcionPerson;
import com.example.agenda.model.PersonVO;
import com.example.agenda.model.repository.PersonRepository;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;

public class PersonRepositoryImpl implements PersonRepository {
    private final ConexionAgenda conexion = new ConexionAgenda();
    private Statement stmt;
    private String sentencia;
    private ArrayList<PersonVO> persons;
    private PersonVO person;

    public PersonRepositoryImpl() {
    }

    public ArrayList<PersonVO> ObtenerListaPersonas() throws ExcepcionPerson {
        try {
            Connection conn = this.conexion.conectarBD();
            this.persons = new ArrayList();
            this.stmt = conn.createStatement();
            this.sentencia = "SELECT * FROM Contactos";
            ResultSet rs = this.stmt.executeQuery(this.sentencia);

            while(rs.next()) {
                Integer codigo = rs.getInt("codigo");
                String nombre = rs.getString("Nombre");
                String apellido = rs.getString("Apellido");
                String calle = rs.getString("Calle");
                String ciudad = rs.getString("Ciudad");
                Integer codigoPostal = rs.getInt("CodigoPostal");
                LocalDate fechaNacimiento = rs.getDate("FechaNacimiento").toLocalDate();
                this.person = new PersonVO(codigo, nombre, apellido, calle, ciudad, codigoPostal, fechaNacimiento);
                this.persons.add(this.person);
            }

            this.conexion.desconectarBD(conn);
            return this.persons;
        } catch (SQLException var6) {
            throw new ExcepcionPerson("No se ha podido realizar la operación");
        }
    }

    public void addPersona(PersonVO p) throws ExcepcionPerson {
        try {
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            this.sentencia = "INSERT INTO Contactos (nombre, apellido, calle, ciudad, codigoPostal, fechaNacimiento) VALUES ('" + p.getNombre()  + "','"+ p.getApellido() + "','"+ p.getCalle() + "','"+ p.getCiudad() + "','"+ p.getCodigoPostal() + "','"+ p.getFechaNacimiento()+"');";
            this.stmt.executeUpdate(this.sentencia);
            this.stmt.close();
            this.conexion.desconectarBD(conn);
        } catch (SQLException var3) {
            throw new ExcepcionPerson("No se ha podido realizar la operación");
        }
    }

    public void deletePersona(Integer idPersona) throws ExcepcionPerson {
        try {
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            Statement comando = conn.createStatement();
            String sql = String.format("DELETE FROM Contactos WHERE codigo = %d", idPersona);
            comando.executeUpdate(sql);
            this.conexion.desconectarBD(conn);
        } catch (SQLException var5) {
            throw new ExcepcionPerson("No se ha podido realizar la eliminación");
        }
    }

    public void editPersona(PersonVO personaVO) throws ExcepcionPerson {
        try {
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            String sql = String.format("UPDATE Contactos SET  Nombre = '%s', Apellido = '%s', Calle = '%s', Ciudad = '%s', CodigoPostal = '%s', FechaNacimiento = '%s' WHERE codigo = %d",  personaVO.getNombre(), personaVO.getApellido(), personaVO.getCalle(), personaVO.getCiudad(), personaVO.getCodigoPostal(), personaVO.getFechaNacimiento(), personaVO.getCodigo());
            this.stmt.executeUpdate(sql);
        } catch (Exception var4) {
            throw new ExcepcionPerson("No se ha podido realizar la edición");
        }
    }

    public int lastId() throws ExcepcionPerson {
        int lastPersonaId = 0;

        try {
            Connection conn = this.conexion.conectarBD();
            Statement comando = conn.createStatement();

            for(ResultSet registro = comando.executeQuery("SELECT codigo FROM Contactos ORDER BY codigo DESC LIMIT 1"); registro.next(); lastPersonaId = registro.getInt("codigo")) {
            }

            return lastPersonaId;
        } catch (SQLException var5) {
            throw new ExcepcionPerson("No se ha podido realizar la busqueda del ID");
        }
    }
}
