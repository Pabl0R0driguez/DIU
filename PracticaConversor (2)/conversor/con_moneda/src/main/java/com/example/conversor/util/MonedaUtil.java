package com.example.conversor.util;

import Modelo.MonedaVO;
import com.example.conversor.Moneda;

import java.util.ArrayList;

public class MonedaUtil {

    public static ArrayList<Moneda> parse(ArrayList<MonedaVO> lista) {
        if (lista == null) {
            return null;
        } else {
            ArrayList<Moneda> monedas = new ArrayList<>();
            for (MonedaVO monedaVO : lista) {
                monedas.add(new Moneda((monedaVO.getNombre()), monedaVO.getMultiplicador()));
            }
            return monedas;
        }
    }
}

