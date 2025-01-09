package com.example.agenda.model;

import javafx.beans.property.*;

import java.time.LocalDate;
import java.util.Date;

public class PersonaVO {
    IntegerProperty codigo;
    StringProperty nombre;
    StringProperty apellido ;
    StringProperty calle ;
    StringProperty ciudad ;
    IntegerProperty codigoPostal ;
    ObjectProperty<LocalDate> fechaNacimiento;


    public PersonaVO(Integer codigo, String nombre, String apellido, String calle, String ciudad, Integer codigoPostal, LocalDate fechaNacimiento) {
        this.codigo = new SimpleIntegerProperty(codigo) ;
        this.nombre = new SimpleStringProperty(nombre);
        this.apellido = new SimpleStringProperty(apellido);
        this.calle = new SimpleStringProperty(calle);
        this.ciudad = new SimpleStringProperty(ciudad);
        this.codigoPostal = new SimpleIntegerProperty(codigoPostal);
        this.fechaNacimiento = new SimpleObjectProperty<LocalDate>(fechaNacimiento);
    }

    public int getCodigo() {
        return codigo.get();
    }

    public IntegerProperty codigoProperty() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo.set(codigo);
    }

    public String getNombre() {
        return nombre.get();
    }

    public StringProperty nombreProperty() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre.set(nombre);
    }

    public String getApellido() {
        return apellido.get();
    }

    public StringProperty apellidoProperty() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido.set(apellido);
    }

    public String getCalle() {
        return calle.get();
    }

    public StringProperty calleProperty() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle.set(calle);
    }

    public String getCiudad() {
        return ciudad.get();
    }

    public StringProperty ciudadProperty() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad.set(ciudad);
    }

    public int getCodigoPostal() {
        return codigoPostal.get();
    }

    public IntegerProperty codigoPostalProperty() {
        return codigoPostal;
    }

    public void setCodigoPostal(int codigoPostal) {
        this.codigoPostal.set(codigoPostal);
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento.get();
    }

    public ObjectProperty<LocalDate> fechaNacimientoProperty() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento.set(fechaNacimiento);
    }

    @Override
    public String toString() {
        return "PersonVO{" +
                "codigo=" + codigo +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", calle='" + calle + '\'' +
                ", ciudad='" + ciudad + '\'' +
                ", codigoPostal=" + codigoPostal +
                ", fechaNacimiento=" + fechaNacimiento +
                '}';
    }
}