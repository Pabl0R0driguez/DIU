package com.example.examendiu.model.repository;

import com.example.examendiu.model.ArticuloVO;
import com.example.examendiu.model.ExcepcionArticulo;

import java.sql.SQLException;
import java.util.ArrayList;

public interface ArticuloRepository {

    ArrayList<ArticuloVO> listaArticulos() throws SQLException;
    void insertarArticulo(ArticuloVO articulo) throws ExcepcionArticulo;
    void actualizarArticulo(ArticuloVO articulo) throws ExcepcionArticulo;
    void eliminarArticulo(Integer posicion) throws ExcepcionArticulo;
    int lastId()throws ExcepcionArticulo;
}
