package com.example.agenda.model.repository;

import com.example.agenda.model.ExcepcionPerson;
import com.example.agenda.model.PersonVO;
import java.util.ArrayList;

public interface PersonRepository {
    ArrayList<PersonVO> ObtenerListaPersonas() throws ExcepcionPerson;

    void addPersona(PersonVO var1) throws ExcepcionPerson;

    void deletePersona(Integer var1) throws ExcepcionPerson;

    void editPersona(PersonVO var1) throws ExcepcionPerson;

    int lastId() throws ExcepcionPerson;
}
