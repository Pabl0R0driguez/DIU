package com.example.gestionhotel.model;

import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;


public class ClienteVO {

  StringProperty DNI;
  StringProperty nombre;
  StringProperty apellidos;
  StringProperty direccion;
  StringProperty localidad;
  StringProperty provinica;

    public ClienteVO(String dni, String nombre, String apellidos, String direccion, String localidad, String provinica) {
        this.DNI = new SimpleStringProperty(dni);
        this.nombre = new SimpleStringProperty(nombre);
        this.apellidos = new SimpleStringProperty(apellidos);
        this.direccion = new SimpleStringProperty(direccion);
        this.localidad = new SimpleStringProperty(localidad);
        this.provinica = new SimpleStringProperty(provinica);
    }


    public String getDNI(){
        return DNI.get();
    }
    public StringProperty dniProperty() {
        return DNI;
    }

    public String getNombre() {
        return nombre.get();
    }

    public StringProperty nombreProperty() {
        return nombre;
    }

    public String getApellidos() {
        return apellidos.get();
    }

    public StringProperty apellidosProperty() {
        return apellidos;
    }

    public String getDireccion() {
        return direccion.get();
    }

    public StringProperty direccionProperty() {
        return direccion;
    }

    public String getLocalidad() {
        return localidad.get();
    }

    public StringProperty localidadProperty() {
        return localidad;
    }

    public String getProvinica() {
        return provinica.get();
    }

    public StringProperty provinicaProperty() {
        return provinica;
    }
}
