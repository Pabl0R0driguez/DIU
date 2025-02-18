package com.example.Agenda.service;

import com.example.Agenda.model.AgendaDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface AgendaService {
    List<AgendaDto> getAllPersonas();
    Optional<AgendaDto> getPersonaById(String id);
    AgendaDto save(AgendaDto Tutorial);
    List<AgendaDto> findByNameContaining(String title);
    ResponseEntity deletePersona(String id);

    AgendaDto updateAgendas(AgendaDto agenda);

    ResponseEntity deleteAllPersonas();
}


