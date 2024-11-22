package com.example.conversor.model;

import Modelo.ExcepcionMoneda;
import Modelo.MonedaVO;
import Modelo.repository.MonedaRepository;
import com.example.conversor.Moneda;
import com.example.conversor.util.MonedaUtil;

import java.util.ArrayList;

public class ConversorModelo {

  private MonedaRepository monedaRepository; //Esta es la dependencia de ConversorModelo con MonedaRepository
    ArrayList<MonedaVO> monedas = new ArrayList<>();

	//Interactuar con la bd
    public void setMonedaRepository(MonedaRepository monedaRepository)  throws ExcepcionMoneda{
        this.monedaRepository = monedaRepository;
    }
	//Recupera la lista de mondeas y la convierte en el tipo de Moneda
    public ArrayList<Moneda> setMonedas() throws ExcepcionMoneda {
        monedas= monedaRepository.ObtenerListaMonedas();
        return MonedaUtil.parse(monedas);
    }

	//Metodo para realizar el cambio de euros a dolar
    public float cambioMoneda(float euros, float multiplicador) {
        return euros*multiplicador;
    }
}
