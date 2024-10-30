    package com.example.agenda.model.repository.impl;

    import com.example.agenda.model.ExcepcionPersona;
    import com.example.agenda.model.PersonaVO;
    import com.example.agenda.model.repository.PersonaRepository;
    import com.example.agenda.model.repository.impl.ConexionBD;

    import java.sql.Connection;
    import java.sql.ResultSet;
    import java.sql.SQLException;
    import java.sql.Statement;
    import java.time.LocalDate;
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
                System.out.println("Conexión exitosa con la base de datos");
                this.personas = new ArrayList();
                this.stmt = conn.createStatement();
                this.sentencia = "SELECT * FROM contactos";
                ResultSet rs = this.stmt.executeQuery(this.sentencia);

                while(rs.next()) {
                    Integer id = rs.getInt("id");
                    String nombre = rs.getString("nombre");
                    String apellidos = rs.getString("apellido");
                    String calle = rs.getString("calle");
                    Integer codigoPostal = rs.getInt("codigoPostal");
                    String ciudad = rs.getString("ciudad");
                    LocalDate fechaNacimiento = rs.getDate("cumpleaños").toLocalDate();


                    this.persona = new PersonaVO(id,nombre, apellidos,calle,ciudad,codigoPostal,fechaNacimiento);
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
            this.sentencia = "INSERT INTO contactos (nombre, apellido, calle,codigoPostal, ciudad, cumpleaños) VALUES ('" + var1.getNombre() + "','" + var1.getApellido() + "','" + var1.getCalle() + "','" + var1.getCodigoPostal() + "','" + var1.getCiudad() + "','" + var1.getFechaNacimiento()+ "');";
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
            String sql = String.format("UPDATE contactos SET nombre = '%s', apellido = '%s'  , calle = '%s', codigoPostal = '%s', ciudad = '%s', cumpleaños = '%s' WHERE id = %d", var1.getNombre(), var1.getApellido() ,var1.getCalle() ,var1.getCodigoPostal() ,var1.getCiudad() ,var1.getFechaNacimiento());
            this.stmt.executeUpdate(sql);
        } catch (Exception var4) {
            throw new ExcepcionPersona("No se ha podido relaizr la edición");
        }
    }

        public int lastId() throws ExcepcionPersona{
            int lastPersonaId = 0;

            try {
                Connection conn = this.conexion.conectarBD();
                Statement comando = conn.createStatement();

                for(ResultSet registro = comando.executeQuery("SELECT id FROM contactos ORDER BY id DESC LIMIT 1"); registro.next(); lastPersonaId = registro.getInt("id")) {

                }

                return lastPersonaId;
            } catch (SQLException var5) {
                throw new ExcepcionPersona("No se ha podido realizar la busqueda del ID");
            }
        }


    }

