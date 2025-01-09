package com.example.conversormonedas.modelo;

import Modelo.ExcepcionMoneda;
import Modelo.MonedaVO;
import Modelo.repository.MonedaRepository;
import com.example.conversormonedas.util.monedaUtil;

import java.util.ArrayList;


public class ConversorModelo  {
    //Declaramos variable MonedaRepository
    private  MonedaRepository monedaRepository;
    ArrayList<MonedaVO> monedas = new ArrayList<>();

    //Este metodo recibirá un elemento de tipo MonedaRepository que le pasaremos en el Main
    public void setMonedaRepository(MonedaRepository monedaRepository) {
        this.monedaRepository = monedaRepository;
}

    public ArrayList<Moneda> setMoneda() throws ExcepcionMoneda {
        monedas = monedaRepository.ObtenerListaMonedas();
        return monedaUtil.conversor(monedas);
    }
}
