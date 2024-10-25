package com.example.conversormonedas.util;

import Modelo.MonedaVO;
import com.example.conversormonedas.modelo.Moneda;

import java.util.ArrayList;

public class monedaUtil {
    public static ArrayList<Moneda> conversor (ArrayList<MonedaVO> lista) {
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
