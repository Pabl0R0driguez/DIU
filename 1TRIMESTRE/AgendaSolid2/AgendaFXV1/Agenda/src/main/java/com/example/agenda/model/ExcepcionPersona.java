package com.example.agenda.model;

public class ExcepcionPersona extends Exception {
    private String mensaje;

    public ExcepcionPersona() {
    }

    public ExcepcionPersona(String ms) {
        this.mensaje = ms;
    }

    public String imprimirMensaje() {
        return this.mensaje;
    }
}
