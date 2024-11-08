package com.example.agenda.util;

import com.example.agenda.model.PersonaVO;
import com.example.agenda.view.Person;

import java.util.ArrayList;

public class PersonUtil {

    //Metodo para cambiar la lista de PersonaVO  a Person
    public static ArrayList<Person> parseToPerson(ArrayList<PersonaVO> lista) {
        if (lista == null) {
            return null;
        } else {
            ArrayList<Person> persona = new ArrayList<>();
            for (PersonaVO personaVO : lista) {
                persona.add(new Person(personaVO.getCodigo(),personaVO.getNombre(), personaVO.getApellido(), personaVO.getCalle(), personaVO.getCiudad(), personaVO.getCodigoPostal(), personaVO.getFechaNacimiento()));
            }
            return persona;
        }
    }

    //Metodo para cambiar la lista de Persona  a PersonVO
    public static PersonaVO parseToPersonVO(Person persona) {

        PersonaVO p = new PersonaVO(persona.getCodigo(), persona.getFirstName(), persona.getLastName(), persona.getStreet(), persona.getCity(), persona.getPostalCode(), persona.getBirthday());

        return p;
    }
}



