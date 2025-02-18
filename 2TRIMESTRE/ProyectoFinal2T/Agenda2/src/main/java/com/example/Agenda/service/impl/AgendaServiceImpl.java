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
    public AgendaDto save(AgendaDto Tutorial) {
        Agenda tutorials = AgendaMapper.agendaMapperDtoToEntity(Tutorial);
        Agenda savedTutorialEntity = agendaRepository.save(tutorials);
        return AgendaMapper.agendaMapperEntityToDto(savedTutorialEntity);
    }

    @Override
    public List<AgendaDto> findByNameContaining(String nombre) {
        List<Agenda> agendaOptional = agendaRepository.findByNombreContaining(nombre);

        return AgendaMapper.agendaListMapperEntityToDto(agendaOptional);
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
    public AgendaDto updateAgendas(AgendaDto agenda) {
        Optional<Agenda> existingTutorialOptional = agendaRepository.findById(agenda.getId());

        if (existingTutorialOptional.isPresent()) {
            Agenda existingTutorial = existingTutorialOptional.get();
            existingTutorial.setNombre(agenda.getNombre());
            existingTutorial.setApellido(agenda.getApellido());
            existingTutorial.setCiudad(agenda.getCiudad());
            existingTutorial.setDireccion(agenda.getDireccion());
            existingTutorial.setCodigoPostal(agenda.getCodigoPostal());
            existingTutorial.setFechaNacimiento(agenda.getFechaNacimiento());
            existingTutorial.setTutoriales(agenda.getTutoriales());



            Agenda updatedTutorial = agendaRepository.save(existingTutorial);

            return AgendaMapper.agendaMapperEntityToDto(updatedTutorial);
        } else {
            return null;
        }
    }



    @Override
    public ResponseEntity deleteAllPersonas() {
        agendaRepository.deleteAll();
        ResponseEntity.ok("Tutorial eliminado exitosamente");
        return ResponseEntity.ok().build();
    }
}