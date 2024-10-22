package com.example.agenda.model;

import com.example.agenda.model.repository.PersonaRepository;
import com.example.agenda.view.Person;

import java.util.ArrayList;

public class AgendaModelo {
    private PersonaRepository personaRepository;
    ArrayList<PersonaVO> monedas = new ArrayList<>();

    //Interactuar con la bd
    public void setPersonaRepository(PersonaRepository personaRepository)  throws ExcepcionPersona{
        this.personaRepository = personaRepository;
    }
    //Recupera la lista de mondeas y la convierte en el tipo de Moneda
    public ArrayList<Person> setMonedas() throws ExcepcionMoneda {
        monedas= personaRepository.ObtenerListaMonedas();
        //Devolvemos una lista de monedas
        return MonedaUtil.parse(monedas);
    }

    //Metodo para realizar el cambio de euros a dolar
    public float cambioMoneda(float euros, float multiplicador) {
        return euros*multiplicador;
    }
}

}
