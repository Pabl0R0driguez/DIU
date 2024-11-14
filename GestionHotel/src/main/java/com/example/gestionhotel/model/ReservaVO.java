package com.example.gestionhotel.model;

import com.example.gestionhotel.view.RegimenAlojamiento;
import com.example.gestionhotel.view.TipoHabitacion;

import java.util.Date;

public class ReservaVO {

    private int idReserva;
    private Date fechaLlegada;
    private Date fechaSalida;
    private int numeroHabitaciones;
    private boolean fumador;


    // Atributos con los enums
    private TipoHabitacion tipoHabitacion;
    private RegimenAlojamiento regimenAlojamiento;

    // Constructor
    public ReservaVO(int idReserva, Date fechaLlegada, Date fechaSalida, int numeroHabitaciones,
                     TipoHabitacion tipoHabitacion, boolean fumador, RegimenAlojamiento regimenAlojamiento) {
        this.idReserva = idReserva;
        this.fechaLlegada = fechaLlegada;
        this.fechaSalida = fechaSalida;
        this.numeroHabitaciones = numeroHabitaciones;
        this.tipoHabitacion = tipoHabitacion;
        this.fumador = fumador;
        this.regimenAlojamiento = regimenAlojamiento;
    }

    // Getters y setters
    public int getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(int idReserva) {
        this.idReserva = idReserva;
    }

    public Date getFechaLlegada() {
        return fechaLlegada;
    }

    public void setFechaLlegada(Date fechaLlegada) {
        this.fechaLlegada = fechaLlegada;
    }

    public Date getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(Date fechaSalida) {
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
