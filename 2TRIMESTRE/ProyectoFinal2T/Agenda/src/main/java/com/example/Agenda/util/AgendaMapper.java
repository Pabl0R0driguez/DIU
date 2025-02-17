package com.example.Agenda.util;

import com.example.Agenda.model.Agenda;
import com.example.Agenda.model.AgendaDto;


import java.util.List;
import java.util.stream.Collectors;

import java.time.LocalDate;

public class AgendaMapper {

    public static Agenda agendaMapperDtoToEntity(AgendaDto agendaDto){
        return Agenda.builder()
                .id(agendaDto.getId())
                .nombre(agendaDto.getNombre())
                .apellido(agendaDto.getApellido())
                .direccion(agendaDto.getDireccion())
                .codigoPostal(agendaDto.getCodigoPostal())
                .ciudad(agendaDto.getCiudad())
                // Convierte la fecha de String a LocalDate si es necesario
                .fechaNacimiento(agendaDto.getFechaNacimiento())
                .build();
    }

    public static AgendaDto agendaMapperEntityToDto(Agenda agenda){
        return AgendaDto.builder()
                .id(agenda.getId())
                .nombre(agenda.getNombre())
                .apellido(agenda.getApellido())
                .direccion(agenda.getDireccion())
                .codigoPostal(agenda.getCodigoPostal())
                .ciudad(agenda.getCiudad())
                // Si es necesario, también se podría convertir a String aquí, dependiendo de cómo quieras enviar la fecha al frontend
                .fechaNacimiento(agenda.getFechaNacimiento() != null ? agenda.getFechaNacimiento().toString() : null)
                .build();
    }

    public static List<Agenda> agendaListMapperDtoToEntity(List<AgendaDto> agendaDtoList) {
        return agendaDtoList.stream()
                .map(AgendaMapper::agendaMapperDtoToEntity)
                .collect(Collectors.toList());
    }

    public static List<AgendaDto> agendaListMapperEntityToDto(List<Agenda> tutorialsList) {
        return tutorialsList.stream()
                .map(AgendaMapper::agendaMapperEntityToDto)
                .collect(Collectors.toList());
    }
}
