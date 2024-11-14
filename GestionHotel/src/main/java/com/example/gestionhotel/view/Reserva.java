package com.example.gestionhotel.view;

import javafx.beans.property.*;

import java.util.Date;

public class Reserva {


    private final IntegerProperty idReservaProperty;
    private final ObjectProperty<Date> fechaLlegadaProperty;
    private final ObjectProperty<Date> fechaSalidaProperty;
    private final IntegerProperty numeroHabitacionesProperty;
    private final ObjectProperty<TipoHabitacion> tipoHabitacionProperty;
    private final BooleanProperty fumadorProperty;
    private final ObjectProperty<RegimenAlojamiento> regimenAlojamientoProperty;



    // Constructor sin parámetros
    public Reserva() {
        this(0, null, null, 0, TipoHabitacion.DOBLE, false, RegimenAlojamiento.ALOJAMIENTO_DESAYUNO);
    }

    // Constructor completo
    public Reserva(int idReserva, Date fechaLlegada, Date fechaSalida, int numeroHabitaciones,
                   TipoHabitacion tipoHabitacion, boolean fumador, RegimenAlojamiento regimenAlojamiento) {
        this.idReservaProperty = new SimpleIntegerProperty(idReserva);
        this.fechaLlegadaProperty = new SimpleObjectProperty<>(fechaLlegada);
        this.fechaSalidaProperty = new SimpleObjectProperty<>(fechaSalida);
        this.numeroHabitacionesProperty = new SimpleIntegerProperty(numeroHabitaciones);
        this.tipoHabitacionProperty = new SimpleObjectProperty<>(tipoHabitacion);
        this.fumadorProperty = new SimpleBooleanProperty(fumador);
        this.regimenAlojamientoProperty = new SimpleObjectProperty<>(regimenAlojamiento);
    }


    // Getters
    public int getIdReserva2() {
        return idReservaProperty.get();
    }

    public IntegerProperty idReservaProperty() {
        return idReservaProperty;
    }

    public Date getFechaLlegada2() {
        return fechaLlegadaProperty.get();
    }

    public ObjectProperty<Date> fechaLlegadaProperty() {
        return fechaLlegadaProperty;
    }

    public Date getFechaSalida2() {
        return fechaSalidaProperty.get();
    }

    public ObjectProperty<Date> fechaSalidaProperty() {
        return fechaSalidaProperty;
    }

    public int getNumeroHabitaciones2() {
        return numeroHabitacionesProperty.get();
    }

    public IntegerProperty numeroHabitacionesProperty() {
        return numeroHabitacionesProperty;
    }

    public TipoHabitacion getTipoHabitacion2() {
        return tipoHabitacionProperty.get();
    }

    public ObjectProperty<TipoHabitacion> tipoHabitacionProperty() {
        return tipoHabitacionProperty;
    }

    public boolean isFumador2() {
        return fumadorProperty.get();
    }

    public BooleanProperty fumadorProperty() {
        return fumadorProperty;
    }

    public RegimenAlojamiento getRegimenAlojamiento2() {
        return regimenAlojamientoProperty.get();
    }

    public ObjectProperty<RegimenAlojamiento> regimenAlojamientoProperty() {
        return regimenAlojamientoProperty;
    }

    // Setters
    public void setIdReserva(int idReserva) {
        this.idReservaProperty.set(idReserva);
    }

    public void setFechaLlegada(Date fechaLlegada) {
        this.fechaLlegadaProperty.set(fechaLlegada);
    }

    public void setFechaSalida(Date fechaSalida) {
        this.fechaSalidaProperty.set(fechaSalida);
    }

    public void setNumeroHabitaciones(int numeroHabitaciones) {
        this.numeroHabitacionesProperty.set(numeroHabitaciones);
    }

    public void setTipoHabitacion(TipoHabitacion tipoHabitacion) {
        this.tipoHabitacionProperty.set(tipoHabitacion);
    }

    public void setFumador(boolean fumador) {
        this.fumadorProperty.set(fumador);
    }

    public void setRegimenAlojamiento(RegimenAlojamiento regimenAlojamiento) {
        this.regimenAlojamientoProperty.set(regimenAlojamiento);
    }

    @Override
    public String toString() {
        return "ReservaVO{" +
                "idReserva=" + getIdReserva2() +
                ", fechaLlegada=" + getFechaLlegada2() +
                ", fechaSalida=" + getFechaSalida2() +
                ", numeroHabitaciones=" + getNumeroHabitaciones2() +
                ", tipoHabitacion=" + getTipoHabitacion2() +
                ", fumador=" + isFumador2() +
                ", regimenAlojamiento=" + getRegimenAlojamiento2() +
                '}';
    }
}