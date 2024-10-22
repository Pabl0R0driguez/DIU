package com.example.agenda.model;

import java.util.Date;

public class PersonaVO {
    String nombre;
    String apellido;
    String calle;
    int codigoPostal;
    String ciudad;
    Date fechaNacimiento;

    public PersonaVO(String nombre, String apellido, String calle, int codigoPostal, String ciudad, Date fechaNacimiento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.calle = calle;
        this.codigoPostal = codigoPostal;
        this.ciudad = ciudad;
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public int getCodigoPostal() {
        return codigoPostal;
    }

    public void setCodigoPostal(int codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    @Override
    public String toString() {
        return "PersonaVO{" +
                "nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", calle='" + calle + '\'' +
                ", codigoPostal=" + codigoPostal +
                ", fechaNacimiento=" + fechaNacimiento +
                ", ciudad='" + ciudad + '\'' +
                '}';
    }
}
