package com.example.Agenda.repository;

import com.example.Agenda.model.Agenda;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AgendaRepository extends MongoRepository<Agenda, String> {

    List<Agenda> findAll();
    Optional<Agenda> getNameById();
    List<Agenda> findByNombreContaining(String nombre);  // Cambiar 'name' por 'nombre'
}
