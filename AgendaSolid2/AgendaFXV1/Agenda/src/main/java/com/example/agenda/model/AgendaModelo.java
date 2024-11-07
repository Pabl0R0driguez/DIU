package com.example.agenda.model;

import com.example.agenda.model.repository.PersonaRepository;
import com.example.agenda.view.Person;
import com.example.agenda.util.PersonUtil;

import java.sql.SQLException;
import java.util.ArrayList;

public class AgendaModelo {
    private PersonaRepository personaRepository;
    ArrayList<PersonaVO> personas = new ArrayList<>();


    //Interactuar con la bd
    public void setPersonaRepository(PersonaRepository personaRepository) throws ExcepcionPersona{
        this.personaRepository = personaRepository;
    }

    public PersonaRepository getPersonaRepository() {
        return personaRepository;
    }


    //Recupera la lista de personas y la convierte en el tipo de persona
    public ArrayList<Person> setPerson() throws ExcepcionPersona, SQLException {
        personas= personaRepository.ObtenerListaPersonas();
        //Llamamos al metodo setContadorPersonas para guardar el total de contactos
        System.out.println("Número contactos antes " + Person.getContadorPersonas());
        Person.setContadorPersonas(personaRepository.contarPersonas());
        System.out.println("Número contactos después " + Person.getContadorPersonas());
        //Devolvemos una lista de personas
        return PersonUtil.parseToPerson(personas);
    }


    public void editarPersona(Person p) throws ExcepcionPersona{
        personaRepository.editPersona(PersonUtil.parseToPersonVO(p));
    }

}


