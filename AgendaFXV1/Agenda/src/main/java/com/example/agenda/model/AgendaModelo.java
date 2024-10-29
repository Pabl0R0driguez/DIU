package com.example.agenda.model;

import com.example.agenda.model.repository.PersonaRepository;
import com.example.agenda.view.Person;
import util.PersonUtil;

import java.util.ArrayList;

public class AgendaModelo {
    private PersonaRepository personaRepository;
    ArrayList<PersonaVO> personas = new ArrayList<>();
    ArrayList<PersonaVO> personasVO = new ArrayList<>();


    //Interactuar con la bd
    public void setPersonaRepository(PersonaRepository personaRepository)  throws ExcepcionPersona{
        this.personaRepository = personaRepository;
    }


    //Recupera la lista de personas y la convierte en el tipo de persona
    public ArrayList<Person> setPerson() throws ExcepcionPersona {
        personasVO= personaRepository.ObtenerListaPersonas();
        //Devolvemos una lista de personas
        return PersonUtil.parse(personasVO);
    }

    public static void editarPersona(Person person) throws ExcepcionPersona {
    }

    public static void añadirPersona(Person person) throws ExcepcionPersona {

    }

    public static void borrarPersona(Person person) throws ExcepcionPersona {

    }




}


