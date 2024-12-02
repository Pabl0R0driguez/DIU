package com.example.gestionhotel.model;

import com.example.gestionhotel.view.RegimenAlojamiento;
import com.example.gestionhotel.view.TipoHabitacion;

import java.time.LocalDate;
import java.util.Date;

public class ReservaVO {

    private int idReserva;
    private LocalDate fechaLlegada;
    private LocalDate fechaSalida;
    private int numeroHabitaciones;
    private boolean fumador;
    private String DNI;


    // Atributos con los enums
    private TipoHabitacion tipoHabitacion;
    private RegimenAlojamiento regimenAlojamiento;

    // Constructor
    public ReservaVO(int idReserva, LocalDate fechaLlegada, LocalDate fechaSalida, int numeroHabitaciones,
                     TipoHabitacion tipoHabitacion, boolean fumador, RegimenAlojamiento regimenAlojamiento, String DNI) {
        this.idReserva = idReserva;
        this.fechaLlegada = fechaLlegada;
        this.fechaSalida = fechaSalida;
        this.numeroHabitaciones = numeroHabitaciones;
        this.tipoHabitacion = tipoHabitacion;
        this.fumador = fumador;
        this.regimenAlojamiento = regimenAlojamiento;
        this.DNI = DNI;
    }

    // Getters y setters
    public int getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(int idReserva) {
        this.idReserva = idReserva;
    }

    public LocalDate getFechaLlegada() {
        return fechaLlegada;
    }

    public void setFechaLlegada(LocalDate fechaLlegada) {
        this.fechaLlegada = fechaLlegada;
    }

    public LocalDate getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(LocalDate fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public int getNumeroHabitaciones() {
        return numeroHabitaciones;
    }

    public void setNumeroHabitaciones(int numeroHabitaciones) {
        this.numeroHabitaciones = numeroHabitaciones;
    }

    public TipoHabitacion getTipoHabitacion() {
        return tipoHabitacion;
    }

    public void setTipoHabitacion(TipoHabitacion tipoHabitacion) {
        this.tipoHabitacion = tipoHabitacion;
    }

    public boolean isFumador() {
        return fumador;
    }

    public void setFumador(boolean fumador) {
        this.fumador = fumador;
    }

    public RegimenAlojamiento getRegimenAlojamiento() {
        return regimenAlojamiento;
    }

    public void setRegimenAlojamiento(RegimenAlojamiento regimenAlojamiento) {
        this.regimenAlojamiento = regimenAlojamiento;
    }

    public String getDNI() {
        return DNI;
    }
    public void setDNI(String DNI) {
        this.DNI = DNI;
    }

    @Override
    public String toString() {
        return "ReservaVO{" +
                "idReserva=" + idReserva +
                ", fechaLlegada=" + fechaLlegada +
                ", fechaSalida=" + fechaSalida +
                ", numeroHabitaciones=" + numeroHabitaciones +
                ", tipoHabitacion=" + tipoHabitacion +
                ", fumador=" + fumador +
                ", regimenAlojamiento=" + regimenAlojamiento +
                '}';
    }
}
