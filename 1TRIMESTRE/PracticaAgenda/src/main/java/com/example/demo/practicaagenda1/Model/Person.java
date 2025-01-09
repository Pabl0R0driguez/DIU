package com.example.demo.practicaagenda1.Model;

import java.time.LocalDate;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.ObjectProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleObjectProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

/**
 * com.example.demo.practicaagenda.Model class for a Person.
 *
 * @author Marco Jakob
 */
public class Person {

    private final StringProperty firstName;
    private final StringProperty lastName;
    private final StringProperty calle;
    private final IntegerProperty codigoPostal;
    private final StringProperty ciudad;
    private final ObjectProperty<LocalDate> cumpleanos;

    /**
     * Default constructor.
     */
    public Person() {
        this(null, null);
    }

    /**
     * Constructor with some initial data.
     *
     * @param firstName
     * @param lastName
     */
    public Person(String firstName, String lastName) {
        this.firstName = new SimpleStringProperty(firstName);
        this.lastName = new SimpleStringProperty(lastName);

        // Some initial dummy data, just for convenient testing.
        this.calle = new SimpleStringProperty("some street");
        this.codigoPostal = new SimpleIntegerProperty(1234);
        this.ciudad = new SimpleStringProperty("some city");
        this.cumpleanos = new SimpleObjectProperty<LocalDate>(LocalDate.of(1999, 2, 21));
    }

    public String getNombre() {
        return firstName.get();
    }

    public void setNombre(String firstName) {
        this.firstName.set(firstName);
    }

    public StringProperty nombreProperty() {
        return firstName;
    }

    public String getApellido() {
        return lastName.get();
    }

    public void setApellido(String lastName) {
        this.lastName.set(lastName);
    }

    public StringProperty apellidoProperty() {
        return lastName;
    }

    public String getCalle() {
        return calle.get();
    }

    public void setStreet(String calle) {
        this.calle.set(calle);
    }

    public StringProperty calleProperty() {
        return calle;
    }

    public int getCodigoPostal() {
        return codigoPostal.get();
    }

    public void setCodigoPostal(int codigoPostal) {
        this.codigoPostal.set(codigoPostal);
    }

    public IntegerProperty codigoPostalProperty() {
        return codigoPostal;
    }

    public String getCiudad() {
        return ciudad.get();
    }

    public void setCiudad(String ciudad) {
        this.ciudad.set(ciudad);
    }

    public StringProperty ciudadProperty() {
        return ciudad;
    }

    public LocalDate getCumpleanos() {
        return cumpleanos.get();
    }

    public void setCumpleanos(LocalDate cumpleanos) {
        this.cumpleanos.set(cumpleanos);
    }

    public ObjectProperty<LocalDate> cumpleanosProperty() {
        return cumpleanos;
    }
    }