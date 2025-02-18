package com.example.Agenda.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
public class Agenda {

    @Id private String id;
    private String nombre;
    private String apellido;
    private String direccion;
    private String codigoPostal;
    private String ciudad;
    private String fechaNacimiento;
    private List<String> tutoriales;


}

