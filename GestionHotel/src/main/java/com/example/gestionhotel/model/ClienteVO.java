package com.example.gestionhotel.model;

import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;


public class ClienteVO {

  String DNI;
    String nombre;
    String apellidos;
    String direccion;
    String localidad;
    String provincia;

    public ClienteVO(String dni, String nombre, String apellidos, String direccion, String localidad, String provincia) {
        this.DNI = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.localidad = localidad;
        this.provincia = provincia;
    }


    public String getDNI(){
        return DNI;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public String getDireccion() {
        return direccion;
    }

    public String getLocalidad() {
        return localidad;
    }

    public String getProvincia() {
        return provincia;
    }

}
