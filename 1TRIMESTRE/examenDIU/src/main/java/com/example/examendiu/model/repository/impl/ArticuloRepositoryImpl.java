package com.example.examendiu.model.repository.impl;

import com.example.examendiu.model.ArticuloVO;
import com.example.examendiu.model.ExcepcionArticulo;
import com.example.examendiu.model.repository.ArticuloRepository;
import com.example.examendiu.view.Articulo;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;



public class ArticuloRepositoryImpl implements ArticuloRepository {

    private final ConexionBD conexion = new ConexionBD();
    private Statement stmt;
    private String sentencia;
    private ArrayList<ArticuloVO> articulos;
    private ArticuloVO articulo;


    @Override
    public ArrayList<ArticuloVO> listaArticulos() throws SQLException {
    try{
        Connection conn = this.conexion.conectarBD();
        this.articulos = new ArrayList();
        this.stmt = conn.createStatement();
        this.sentencia = "SELECT * FROM articulo";
        ResultSet rs = this.stmt.executeQuery(this.sentencia);

        while (rs.next()) {
            Integer codigo = rs.getInt("id");
            String Nombre = rs.getString("nombre");
            String Descripcion = rs.getString("descripcion");
            Double Precio = rs.getDouble("precio");
            Integer Stock = rs.getInt("stock");

            this.articulo = new ArticuloVO(codigo, Precio, Descripcion, Nombre, Stock);
            this.articulos.add(this.articulo);
            System.out.println(articulo);
        }
        this.conexion.desconectarBD(conn);
        return this.articulos;
    } catch(SQLException var6){

        throw new ExcepcionArticulo("No se ha podido realizar la operación");
    }
}

    @Override
    public void insertarArticulo(ArticuloVO articulo) throws ExcepcionArticulo {
        try {
            Connection conn = this.conexion.conectarBD();
            this.stmt = conn.createStatement();
            this.sentencia = "INSERT INTO articulo (nombre, descripcion, precio, stock) VALUES ('" + articulo.getNombre()  + "','"+ articulo.getDescripcion() + "','"+ articulo.getPrecio() + "','"+ articulo.getStock() + "');";
            this.stmt.executeUpdate(this.sentencia);
            this.stmt.close();
            Articulo.setContadorArticulos(Articulo.getContadorArticulos() + 1);
            this.conexion.desconectarBD(conn);
        } catch (SQLException var3) {
            throw new ExcepcionArticulo("No se ha podido realizar la operación");
        }
    }

    @Override
    public void actualizarArticulo(ArticuloVO articuloVO) throws ExcepcionArticulo {
        try {
            Connection conn = this.conexion.conectarBD(); // Conecta a la base de datos.
            this.stmt = conn.createStatement(); // Prepara la ejecución de sentencias SQL.
            String sql = String.format(
                    "UPDATE articulo SET nombre = '%s', descripcion = '%s', precio = '%s', stock = '%s' WHERE id = %d",
                    articuloVO.getNombre(), articuloVO.getDescripcion(), articuloVO.getPrecio(), articuloVO.getStock(), articuloVO.getId());
            this.stmt.executeUpdate(sql); // Ejecuta la sentencia SQL para actualizar.
        } catch (SQLException var4) {
            throw new ExcepcionArticulo("No se ha podido realizar la edición");
        }
    }



    @Override
    public void eliminarArticulo(Integer idArticulo) throws ExcepcionArticulo {
        try {
            Connection conn = this.conexion.conectarBD(); // Conecta a la base de datos.
            this.stmt = conn.createStatement(); // Prepara la ejecución de sentencias SQL.
            String sql = String.format("DELETE FROM articulo WHERE id = %d", idArticulo); // Sentencia SQL para eliminar.
            this.stmt.executeUpdate(sql); // Ejecuta la sentencia SQL.
            this.conexion.desconectarBD(conn); // Cierra la conexión con la base de datos.
        } catch (SQLException var5) {
            throw new ExcepcionArticulo("No se ha podido realizar la eliminación");
        }
    }

    @Override
    public int lastId() throws ExcepcionArticulo {
        int lastPersonaId = 0;

        try {
            Connection conn = this.conexion.conectarBD();
            Statement comando = conn.createStatement();

            for(ResultSet registro = comando.executeQuery("SELECT id FROM articulo ORDER BY id DESC LIMIT 1"); registro.next(); lastPersonaId = registro.getInt("id")) {
            }

            return lastPersonaId;
        } catch (SQLException var5) {
            throw new ExcepcionArticulo("No se ha podido realizar la busqueda del ID");
        }
    }
}
