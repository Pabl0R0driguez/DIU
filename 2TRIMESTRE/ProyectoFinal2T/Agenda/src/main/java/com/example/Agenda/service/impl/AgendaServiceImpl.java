package com.example.Agenda.service.impl;

import com.example.Agenda.model.Agenda;
import com.example.Agenda.repository.AgendaRepository;
import com.example.Agenda.model.AgendaDto;
import com.example.Agenda.service.AgendaService;
import com.example.Agenda.util.AgendaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AgendaServiceImpl implements AgendaService {
    @Autowired
    private AgendaRepository agendaRepository;


    @Override
    public List<AgendaDto> getAllPersonas() {

        List<Agenda> tutorialsList = agendaRepository.findAll();
        return tutorialsList.stream()
                .map(AgendaMapper::agendaMapperEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<AgendaDto> getPersonaById(String id) {
        Optional<Agenda> tutorialOptional = agendaRepository.findById(id);
        return tutorialOptional.map(AgendaMapper::agendaMapperEntityToDto);
    }

    @Override
    public AgendaDto save(AgendaDto agendaDto) {
        // Convierte el DTO a la entidad de MongoDB
        Agenda agenda = AgendaMapper.agendaMapperDtoToEntity(agendaDto);

        // Guarda la entidad Agenda en la base de datos. El id será generado automáticamente
        Agenda savedAgenda = agendaRepository.save(agenda);

        // Convierte la entidad guardada de nuevo a DTO y la devuelve
        return AgendaMapper.agendaMapperEntityToDto(savedAgenda);
    }



    @Override
    public List<AgendaDto> findByNameContaining(String title) {
        return Collections.emptyList();
    }

    @Override
    public AgendaDto updateAgendas(AgendaDto tutorial, String id) {
        return null;
    }





    @Override
    public ResponseEntity deletePersona(String id) {
        try {
            Optional<Agenda> existingTutorialOptional = agendaRepository.findById(id);
            if (existingTutorialOptional.isPresent()) {
                agendaRepository.deleteById(id);
                return ResponseEntity.ok("Tutorial eliminado exitosamente");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tutorial no encontrado con ID: " + id);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el tutorial");
        }
    }


    @Override
    public ResponseEntity deleteAllPersonas() {
        agendaRepository.deleteAll();
        ResponseEntity.ok("Tutorial eliminado exitosamente");
        return ResponseEntity.ok().build();
    }
}