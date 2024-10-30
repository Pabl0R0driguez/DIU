package com.example.agenda.util;

import com.example.agenda.model.PersonVO;
import com.example.agenda.view.Person;

import java.util.ArrayList;

public class PersonUtil {

    public static ArrayList<Person> parseToPerson(ArrayList<PersonVO> lista) {
        if (lista == null) {
            return null;
        } else {
            ArrayList<Person> personas = new ArrayList<>();
            for (PersonVO personaVO : lista) {
                personas.add(new Person(personaVO.getCodigo(),personaVO.getNombre(), personaVO.getApellido(), personaVO.getCalle(), personaVO.getCiudad(), personaVO.getCodigoPostal(), personaVO.getFechaNacimiento()));
            }
            return personas;
        }
    }

    //Cambiar este parse para que en vez de recibir una lista reciba un Person y lo cconvierta en PersonVO
    public static PersonVO parseToPersonVO(Person persona) {

              PersonVO p= new PersonVO(persona.getCodigo(), persona.getFirstName(), persona.getLastName(), persona.getStreet(), persona.getCity(), persona.getPostalCode(), persona.getBirthday());

            return p;
        }
    }


