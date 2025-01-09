package com.example.gestionhotel.model;

public class ExcepcionCliente extends Exception {
    private String mensaje;

    public ExcepcionCliente() {
    }

    public ExcepcionCliente(String ms) {
        this.mensaje = ms;
    }

    public String imprimirMensaje() {
        return this.mensaje;
    }
}
