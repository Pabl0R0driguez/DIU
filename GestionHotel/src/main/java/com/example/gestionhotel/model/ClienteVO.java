package com.example.gestionhotel.model;

import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;


public class ClienteVO {

  StringProperty DNI;
  StringProperty nombre;
  StringProperty apellidos;
  StringProperty direccion;
  StringProperty localidad;
  StringProperty provincia;

    public ClienteVO(String dni, String nombre, String apellidos, String direccion, String localidad, String provincia) {
        this.DNI = new SimpleStringProperty(dni);
        this.nombre = new SimpleStringProperty(nombre);
        this.apellidos = new SimpleStringProperty(apellidos);
        this.direccion = new SimpleStringProperty(direccion);
        this.localidad = new SimpleStringProperty(localidad);
        this.provincia = new SimpleStringProperty(provincia);
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

    public String getProvincia() {
        return provincia.get();
    }

    public StringProperty provinciaProperty() {
        return provincia;
    }
}
