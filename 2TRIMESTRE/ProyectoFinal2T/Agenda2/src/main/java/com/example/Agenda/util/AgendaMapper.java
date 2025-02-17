package com.example.Agenda.util;

import com.example.Agenda.model.Agenda;
import com.example.Agenda.model.AgendaDto;


import java.util.List;
import java.util.stream.Collectors;

public class AgendaMapper {

    public static Agenda agendaMapperDtoToEntity(AgendaDto agendaDto){
        return Agenda.builder()
                .id(agendaDto.getId())
                .nombre(agendaDto.getNombre())
                .apellido(agendaDto.getApellido())
                .direccion(agendaDto.getDireccion())
                .codigoPostal(agendaDto.getCodigoPostal())
                .ciudad(agendaDto.getCiudad())
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
                .fechaNacimiento(agenda.getFechaNacimiento())
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
