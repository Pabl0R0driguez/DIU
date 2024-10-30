package com.example.agenda.model;
import com.example.agenda.model.repository.PersonRepository;


import com.example.agenda.view.Person;
import com.example.agenda.util.PersonUtil;

import java.util.ArrayList;

public class AgendaModel {

    private PersonRepository personaRepository; //Esta es la dependencia de ConversorModelo con MonedaRepository
    ArrayList<PersonVO> personas = new ArrayList<>();

    public void setPersonaRepository(PersonRepository personaRepository)  throws ExcepcionPerson{
        this.personaRepository = personaRepository;
    }


    public ArrayList<Person> setPersonas() throws ExcepcionPerson {
        personas= personaRepository.ObtenerListaPersonas();
        return PersonUtil.parseToPerson(personas);
    }

    public void editarPersona(Person p) throws ExcepcionPerson{
        personaRepository.editPersona(PersonUtil.parseToPersonVO(p));
    }
}
