package com.example.gestionhotel.view;

import javafx.beans.property.*;

import java.time.LocalDate;

public class Reserva {


    private final IntegerProperty idReservaProperty;
    private final ObjectProperty<LocalDate> fechaLlegadaProperty;
    private final ObjectProperty<LocalDate> fechaSalidaProperty;
    private final IntegerProperty numeroHabitacionesProperty;
    private final ObjectProperty<TipoHabitacion> tipoHabitacionProperty;
    private final BooleanProperty fumadorProperty;
    private final ObjectProperty<RegimenAlojamiento> regimenAlojamientoProperty;
    private String DNI = String.valueOf(new SimpleStringProperty());


    private static int numeroHabitacionesDoblesIndividual = 50;
    private static int contadorHabitacionesDoblesIndividual = 0;

    private static int numeroHabitacionesDobles = 50;
    private static int contadorHabitacionDobles = 0;


    private static int numeroHabitacionesJunior = 50;
    private static int contadorHabitacionesJunior = 0;


    private static int numeroHabitacionesJuniorSuite = 50;
    private static int contadorHabitacionesJuniorSuite = 0;


    public static int getContadorHabitacionesJuniorSuite() {
        return contadorHabitacionesJuniorSuite;
    }

    public static void setContadorHabitacionesJuniorSuite(int contadorHabitacionesJuniorSuite) {
        Reserva.contadorHabitacionesJuniorSuite = contadorHabitacionesJuniorSuite;
    }

    public static int getNumeroHabitacionesJuniorSuite() {
        return numeroHabitacionesJuniorSuite;
    }

    public static void setNumeroHabitacionesJuniorSuite(int numeroHabitacionesJuniorSuite) {
        Reserva.numeroHabitacionesJuniorSuite = numeroHabitacionesJuniorSuite;
    }

    public static int getContadorHabitacionesJunior() {
        return contadorHabitacionesJunior;
    }

    public static void setContadorHabitacionesJunior(int contadorHabitacionesJunior) {
        Reserva.contadorHabitacionesJunior = contadorHabitacionesJunior;
    }

    public static int getNumeroHabitacionesJunior() {
        return numeroHabitacionesJunior;
    }

    public static void setNumeroHabitacionesJunior(int numeroHabitacionesJunior) {
        Reserva.numeroHabitacionesJunior = numeroHabitacionesJunior;
    }

    public static int getContadorHabitacionDobles() {
        return contadorHabitacionDobles;
    }

    public static void setContadorHabitacionDobles(int contadorHabitacionDobles) {
        Reserva.contadorHabitacionDobles = contadorHabitacionDobles;
    }

    public static int getNumeroHabitacionesDobles() {
        return numeroHabitacionesDobles;
    }

    public static void setNumeroHabitacionesDobles(int numeroHabitacionesDobles) {
        Reserva.numeroHabitacionesDobles = numeroHabitacionesDobles;
    }

    public static int getContadorHabitacionesDoblesIndividual() {
        return contadorHabitacionesDoblesIndividual;
    }

    public static void setContadorHabitacionesDoblesIndividual(int contadorHabitacionesDoblesIndividual) {
        Reserva.contadorHabitacionesDoblesIndividual = contadorHabitacionesDoblesIndividual;
    }

    public static int getNumeroHabitacionesDoblesIndividual() {
        return numeroHabitacionesDoblesIndividual;
    }

    public static void setNumeroHabitacionesDoblesIndividual(int numeroHabitacionesDoblesIndividual) {
        Reserva.numeroHabitacionesDoblesIndividual = numeroHabitacionesDoblesIndividual;
    }

    public Reserva(){
        this(null,null);
    }

    // Constructor con solo nombre y apellidos
    public Reserva(LocalDate fechaLlegada, LocalDate fechaSalida) {
        this.idReservaProperty = new SimpleIntegerProperty(0);
        this.fechaLlegadaProperty = new SimpleObjectProperty(fechaLlegada);
        this.fechaSalidaProperty = new SimpleObjectProperty(fechaSalida);
        this.numeroHabitacionesProperty = new SimpleIntegerProperty(0);
        this.tipoHabitacionProperty = new SimpleObjectProperty(TipoHabitacion.DOBLE);
        this.fumadorProperty = new SimpleBooleanProperty(true);
        this.regimenAlojamientoProperty = new SimpleObjectProperty(RegimenAlojamiento.ALOJAMIENTO_DESAYUNO);
    }

    // Constructor completo
    public Reserva(int idReserva, LocalDate fechaLlegada, LocalDate fechaSalida, int numeroHabitaciones,
                   TipoHabitacion tipoHabitacion, boolean fumador, RegimenAlojamiento regimenAlojamiento,String DNI) {
        this.idReservaProperty = new SimpleIntegerProperty(idReserva);
        this.fechaLlegadaProperty = new SimpleObjectProperty<>(fechaLlegada);
        this.fechaSalidaProperty = new SimpleObjectProperty<>(fechaSalida);
        this.numeroHabitacionesProperty = new SimpleIntegerProperty(numeroHabitaciones);
        this.tipoHabitacionProperty = new SimpleObjectProperty<>(tipoHabitacion);
        this.fumadorProperty = new SimpleBooleanProperty(fumador);
        this.regimenAlojamientoProperty = new SimpleObjectProperty<>(regimenAlojamiento);
        this.DNI = String.valueOf(new SimpleStringProperty(DNI));
    }

    // Constructor sin parámetros
    public Reserva(String DNI) {
        this(0, null, null, 0, TipoHabitacion.DOBLE, false, RegimenAlojamiento.ALOJAMIENTO_DESAYUNO, DNI);
    }







    // Getters
    public int getIdReserva2() {
        return idReservaProperty.get();
    }

    public IntegerProperty idReservaProperty() {
        return idReservaProperty;
    }

    public LocalDate getFechaLlegada2() {
        return fechaLlegadaProperty.get();
    }

    public ObjectProperty<LocalDate> fechaLlegadaProperty() {
        return fechaLlegadaProperty;
    }

    public LocalDate getFechaSalida2() {
        return fechaSalidaProperty.get();
    }

    public ObjectProperty<LocalDate> fechaSalidaProperty() {
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

    public String getDNI() {
        return DNI;
    }

    public void setDNI(String DNI) {
        this.DNI = DNI;
    }

    public ObjectProperty<RegimenAlojamiento> regimenAlojamientoProperty() {
        return regimenAlojamientoProperty;
    }

    // Setters
    public void setIdReserva(int idReserva) {
        this.idReservaProperty.set(idReserva);
    }

    public void setFechaLlegada(LocalDate fechaLlegada) {
        this.fechaLlegadaProperty.set(fechaLlegada);
    }

    public void setFechaSalida(LocalDate fechaSalida) {
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
        return "Reserva{" +
                "idReservaProperty=" + idReservaProperty +
                ", fechaLlegadaProperty=" + fechaLlegadaProperty +
                ", fechaSalidaProperty=" + fechaSalidaProperty +
                ", numeroHabitacionesProperty=" + numeroHabitacionesProperty +
                ", tipoHabitacionProperty=" + tipoHabitacionProperty +
                ", fumadorProperty=" + fumadorProperty +
                ", regimenAlojamientoProperty=" + regimenAlojamientoProperty +
                ", DNI='" + DNI + '\'' +
                '}';
    }
}