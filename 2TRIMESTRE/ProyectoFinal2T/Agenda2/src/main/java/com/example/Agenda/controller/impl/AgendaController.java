package com.example.Agenda.controller.impl;

import com.example.Agenda.controller.AgendaAPI;
import com.example.Agenda.model.AgendaDto;
import com.example.Agenda.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")

public class AgendaController implements AgendaAPI {


        @Autowired
        private AgendaService agendaService;

        @Override
        @GetMapping("/agenda")
        public List<AgendaDto> getAllPersonas() {
            return agendaService.getAllPersonas();
        }

        @Override
        @GetMapping("/agenda/{id}")
        public Optional<AgendaDto> getPersonaById(@PathVariable String id) {
            return agendaService.getPersonaById(id);
        }

        @Override
        @GetMapping("/agenda/nombre/{nombre}")
        public List<AgendaDto> findByNameContaining(@PathVariable String nombre) { // Cambié "id" por "nombre" y anoté con @PathVariable
            return agendaService.findByNameContaining(nombre); // Llamamos al servicio
        }

        @Override
        @PostMapping("/agenda")
        public AgendaDto save(@RequestBody AgendaDto tutorial) {
            return agendaService.save(tutorial);
        }

        @Override
        @PutMapping("/agenda/{id}")
        public AgendaDto updateAgendas(@RequestBody AgendaDto tutorial, @PathVariable String id) {
            return agendaService.updateAgendas(tutorial);
        }

        @Override
        @DeleteMapping("/agenda/{id}")
        public ResponseEntity deletePersona(@PathVariable String id) {
            return agendaService.deletePersona(id);
        }

        @Override
        @DeleteMapping("/agenda")
        public ResponseEntity deleteAllPersonas() {
            return agendaService.deleteAllPersonas();
        }
    }
