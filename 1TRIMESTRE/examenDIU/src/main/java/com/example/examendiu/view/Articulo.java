package com.example.examendiu.view;

import eu.hansolo.toolbox.properties.DoubleProperty;
import javafx.beans.property.*;

public class Articulo {

    private final IntegerProperty id;
    private final StringProperty nombre;
    private final StringProperty descripcion;
    private final DoubleProperty precio;
    private final IntegerProperty stock;

    private  static int contadorArticulos = 50;
    private static int totalArticulos = 0;


    public Articulo() {
        this(null,null,0.0,0,0);
    }

    public Articulo(String nombre, String descripcion, double precio, int stock, Integer id) {
        this.nombre = new SimpleStringProperty(nombre);
        this.descripcion = new SimpleStringProperty(descripcion);
        this.precio = new DoubleProperty(precio);
        this.stock = new SimpleIntegerProperty(stock);
        this.id = new SimpleIntegerProperty(id);
    }

    public static int getContadorArticulos() {
        return contadorArticulos;
    }

    public static int getTotalArticulos() {
        return totalArticulos;
    }

    public static void setContadorArticulos(int contadorArticulos) {
        Articulo.contadorArticulos = contadorArticulos;
    }
    public int getId() {
        return id.get();
    }

    public IntegerProperty idProperty() {
        return id;
    }

    public int getStock() {
        return stock.get();
    }

    public IntegerProperty stockProperty() {
        return stock;
    }

    public double getPrecio() {
        return precio.get();
    }

    public String getDescripcion() {
        return descripcion.get();
    }

    public StringProperty descripcionProperty() {
        return descripcion;
    }

    public String getNombre() {
        return nombre.get();
    }

    public StringProperty nombreProperty() {
        return nombre;
    }

    public DoubleProperty getPrecioProperty() {
        return precio;
    }


    public void setStock(int stock) {
        this.stock.set(stock);
    }

    public void setPrecio(double precio) {
        this.precio.set(precio);
    }

    public void setDescripcion(String descripcion) {
        this.descripcion.set(descripcion);
    }

    public void setNombre(String nombre) {
        this.nombre.set(nombre);
    }



    //Lo usaré en articulos_controller
    public void setId(int id) {
        this.id.set(id);
    }

    @Override
    public String toString() {
        return "Articulo{" +
                "id=" + id +
                ", nombre=" + nombre +
                ", descripcion=" + descripcion +
                ", precio=" + precio +
                ", stock=" + stock +
                '}';
    }
}
