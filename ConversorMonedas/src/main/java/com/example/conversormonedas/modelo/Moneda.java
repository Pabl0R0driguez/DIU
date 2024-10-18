package com.example.conversormonedas.modelo;

public class Moneda {
    String nombre;
    Integer codigo;
    float multiplicador;

    public Moneda(String nombre, float multiplicador) {
        this.nombre = nombre;
        this.multiplicador = multiplicador;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public float getMultiplicador() {
        return this.multiplicador;
    }

    public void setMultiplicador(float multiplicador) {
        this.multiplicador = multiplicador;
    }

    public String toString() {
        return "MonedaVO{nombre=" + this.nombre + ", multiplicador=" + this.multiplicador + '}';
    }
}