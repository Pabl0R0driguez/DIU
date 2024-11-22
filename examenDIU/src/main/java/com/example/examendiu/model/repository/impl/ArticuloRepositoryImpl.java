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
    public void insertarArticulo(Articulo articulo) throws ExcepcionArticulo {

    }

    @Override
    public void actualizarArticulo(Articulo articulo) throws ExcepcionArticulo {

    }

    @Override
    public void eliminarArticulo(Integer posicion) throws ExcepcionArticulo {

    }

    @Override
    public void lastId() throws ExcepcionArticulo {

    }
}
