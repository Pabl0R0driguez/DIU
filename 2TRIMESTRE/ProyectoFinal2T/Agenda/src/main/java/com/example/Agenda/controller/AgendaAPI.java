package com.example.Agenda.controller;

import com.example.Agenda.model.AgendaDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface AgendaAPI {
    List<AgendaDto> getAllPersonas();
    Optional<AgendaDto> getPersonaById(String id);
    List<AgendaDto> findByNameContaining(String id);
    AgendaDto save(AgendaDto Tutorial);
    AgendaDto updateAgendas(AgendaDto tutorial, String id);
    ResponseEntity deletePersona(String id);
    ResponseEntity deleteAllPersonas();
}
