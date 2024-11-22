package com.example.examendiu.model;

import com.example.examendiu.model.repository.ArticuloRepository;
import com.example.examendiu.util.ArticuloUtil;
import com.example.examendiu.view.Articulo;

import java.sql.SQLException;
import java.util.ArrayList;

public class ArticuloModelo {
    private ArticuloRepository articuloRepository;
    private Articulo articulo;
    ArrayList<ArticuloVO> listaArticulo = new ArrayList<>();


    public ArrayList<Articulo> setArticulo() throws ExcepcionArticulo, SQLException {
        listaArticulo = articuloRepository.listaArticulos();
        return ArticuloUtil.parseToArticulo(listaArticulo);

    }

    public void setArticuloRepository(ArticuloRepository articuloRepository) {
        this.articuloRepository = articuloRepository;
    }



    public ArticuloRepository getArticuloRepository() {
        return articuloRepository;
    }


    }




