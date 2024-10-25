package util;

import com.example.agenda.model.PersonaVO;
import com.example.agenda.view.Person;

import java.util.ArrayList;

public class PersonUtil {

    //Metodo para cambiar la lista de PersonaVO  a Person
    public static ArrayList<Person> parse(ArrayList<PersonaVO> lista) {
        if (lista == null) {
            return null;
        } else {
            ArrayList<Person> persona = new ArrayList<>();
            for (PersonaVO personaVO : lista) {
                persona.add(new Person((personaVO.getNombre()), personaVO.getApellido(), personaVO.getCalle(), personaVO.getCodigoPostal(), personaVO.getCiudad(), personaVO.getFechaNacimiento()));
            }
            return persona;
        }
    }

    //Metodo para cambiar la lista de Persona  a PersonVO
    public static ArrayList<PersonaVO> parse2(ArrayList<Person> lista) {
        if (lista == null) {
            return null;
        } else {
            ArrayList<PersonaVO> person = new ArrayList<>();
            for (Person persona : lista) {
                person.add(new PersonaVO((persona.getFirstName()), persona.getLastName(), persona.getStreet(), persona.getPostalCode(), persona.getCity(), persona.getBirthday()));
            }
            return person;
        }
    }


}