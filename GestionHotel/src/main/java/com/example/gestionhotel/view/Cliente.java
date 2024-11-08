package com.example.gestionhotel.view;

import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

public class Cliente {

    private final String DNI;
    private final StringProperty nombre;
    private final StringProperty apellidos;
    private final StringProperty direccion;
    private final StringProperty localidad;
    private final StringProperty provincia;

    // Constructor completo
    public Cliente(String dni, String nombre, String apellidos, String direccion, String localidad, String provincia) {
        this.DNI = dni;
        this.nombre = new SimpleStringProperty(nombre);
        this.apellidos = new SimpleStringProperty(apellidos);
        this.direccion = new SimpleStringProperty(direccion);
        this.localidad = new SimpleStringProperty(localidad);
        this.provincia = new SimpleStringProperty(provincia);
    }

    // Constructor con solo nombre y apellidos (con valores predeterminados para otros campos)
    public Cliente(String nombre, String apellidos) {
        this.DNI = "";
        this.nombre = new SimpleStringProperty(nombre);
        this.apellidos = new SimpleStringProperty(apellidos);
        this.direccion = new SimpleStringProperty("Introduce dirección");
        this.localidad = new SimpleStringProperty("Introduce localidad");
        this.provincia = new SimpleStringProperty("Introduce provincia");
    }

    // Getters
    public String getDNI() {
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

    // Setters
    public void setNombre(String nombre) {
        this.nombre.set(nombre);
    }

    public void setApellidos(String apellidos) {
        this.apellidos.set(apellidos);
    }

    public void setDireccion(String direccion) {
        this.direccion.set(direccion);
    }

    public void setLocalidad(String localidad) {
        this.localidad.set(localidad);
    }

    public void setProvincia(String provincia) {
        this.provincia.set(provincia);
    }
}

