package com.example.Agenda.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AgendaDto {

    private String id;
    private String nombre;
    private String apellido;
    private String direccion;
    private String codigoPostal;
    private String ciudad;
    private LocalDate fechaNacimiento;


}
