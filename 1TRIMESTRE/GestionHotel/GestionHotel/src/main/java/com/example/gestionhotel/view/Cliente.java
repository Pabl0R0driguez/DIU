package com.example.gestionhotel.view;

import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

public class Cliente {

    private final StringProperty dniProperty;
    private final StringProperty nombreProperty;
    private final StringProperty apellidosProperty;
    private final StringProperty direccionProperty;
    private final StringProperty localidadProperty;
    private final StringProperty provinicaProperty;

    private static final int totalClientes = 50;
    private static int contadorClientes = 0;

    public Cliente(){
        this(null,null);
    }

    // Constructor con solo nombre y apellidos
    public Cliente(String nombre, String apellidos) {
        this.dniProperty = new SimpleStringProperty(""); // Valor predeterminado para DNI
        this.nombreProperty = new SimpleStringProperty(nombre);
        this.apellidosProperty = new SimpleStringProperty(apellidos);
        this.direccionProperty = new SimpleStringProperty("Introduce dirección");
        this.localidadProperty = new SimpleStringProperty("Introduce localidad");
        this.provinicaProperty = new SimpleStringProperty("Introduce provincia");
    }


    // Constructor completo
    public Cliente(String dni, String nombre, String apellidos, String direccion, String localidad, String provincia) {
        this.dniProperty = new SimpleStringProperty(dni);
        this.nombreProperty = new SimpleStringProperty(nombre);
        this.apellidosProperty = new SimpleStringProperty(apellidos);
        this.direccionProperty = new SimpleStringProperty(direccion);
        this.localidadProperty = new SimpleStringProperty(localidad);
        this.provinicaProperty = new SimpleStringProperty(provincia);
    }

    public static int getContadorClientes() {
        return contadorClientes;
    }

    public static int getTotalClientes() {
        return totalClientes;
    }

    public int getContadorPersonas(){
        return contadorClientes;
    }

    // Getters
    public String getDni() {
        return dniProperty.get();
    }

    public StringProperty getDniProperty() {
        return dniProperty;
    }

    public String getNombre() {
        return nombreProperty.get();
    }

    public StringProperty getNombreProperty() {
        return nombreProperty;
    }

    public String getApellidos() {
        return apellidosProperty.get();
    }

    public StringProperty getApellidosProperty() {
        return apellidosProperty;
    }

    public String getDireccion() {
        return direccionProperty.get();
    }

    public StringProperty getDireccionProperty() {
        return direccionProperty;
    }

    public String getLocalidad() {
        return localidadProperty.get();
    }

    public StringProperty getLocalidadProperty() {
        return localidadProperty;
    }

    public String getProvinica() {
        return provinicaProperty.get();
    }

    public StringProperty getProvinicaProperty() {
        return provinicaProperty;
    }

    // Setters
    public void setNombreProperty(String nombreProperty) {
        this.nombreProperty.set(nombreProperty);
    }

    public void setApellidosProperty(String apellidosProperty) {
        this.apellidosProperty.set(apellidosProperty);
    }

    public void setDireccionProperty(String direccionProperty) {
        this.direccionProperty.set(direccionProperty);
    }

    public void setLocalidadProperty(String localidadProperty) {
        this.localidadProperty.set(localidadProperty);
    }

    public void setProvinicaProperty(String provinicaProperty) {
        this.provinicaProperty.set(provinicaProperty);
    }

    public void setDniProperty(String dniProperty){
        this.dniProperty.set(dniProperty);
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "dniProperty=" + dniProperty +
                ", nombreProperty=" + nombreProperty +
                ", apellidosProperty=" + apellidosProperty +
                ", direccionProperty=" + direccionProperty +
                ", localidadProperty=" + localidadProperty +
                ", provinicaProperty=" + provinicaProperty +
                '}';
    }
}
