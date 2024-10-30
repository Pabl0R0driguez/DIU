package com.example.agenda.model;

import com.example.agenda.model.repository.PersonaRepository;
import com.example.agenda.view.Person;
import util.PersonUtil;

import java.util.ArrayList;

public class AgendaModelo {
    private PersonaRepository personaRepository;
    ArrayList<PersonaVO> personas = new ArrayList<>();


    //Interactuar con la bd
    public void setPersonaRepository(PersonaRepository personaRepository) throws ExcepcionPersona{
        this.personaRepository = personaRepository;
    }



	public PersonaRepository getPersonaRepository(){
		return personaRepository;
	}


    //Recupera la lista de personaVO y la convierte en el persona para la interfaz
    public ArrayList<Person> setPerson() throws ExcepcionPersona {
        personas= personaRepository.ObtenerListaPersonas();
        //Devolvemos una lista de personas
        return PersonUtil.parseToPerson(personas);
    }

}


