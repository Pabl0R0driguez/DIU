package model;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.StringProperty;


public class ClienteVO {

    private final String DNI;
    private final StringProperty nombre;
    private final StringProperty apellidos;
    private final StringProperty direccion;
    private final StringProperty localidad;
    private final StringProperty provinica;

    public ClienteVO(String dni, StringProperty nombre, StringProperty apellidos, StringProperty direccion, StringProperty localidad, StringProperty provinica) {
        this.DNI = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.localidad = localidad;
        this.provinica = provinica;
    }


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

    public String getProvinica() {
        return provinica.get();
    }

    public StringProperty provinicaProperty() {
        return provinica;
    }
}
