package Ejercicio2;

import java.io.*;
import java.security.MessageDigest;

public class Ejemplo6{
    public static void main(String args[]) {
        try {
            // Se abre el archivo "DATOS.DAT" para lectura
            FileInputStream fileout = new FileInputStream("DATOS.DAT");
            // Se crea un flujo de entrada de objetos para leer desde el archivo
            ObjectInputStream dataOS = new ObjectInputStream(fileout);

            // Se lee el primer objeto, que debería ser el String
            Object o = dataOS.readObject();

            // Se convierte el objeto leído en un String
            String datos = (String) o;
            // Se muestra el texto original
            System.out.println("Datos originales: " + datos);

            // Se modifica el texto a mayúsculas
            datos = convertirMayusculas(datos);

            // Se lee el segundo objeto, que debería ser el resumen del hash
            o = dataOS.readObject();
            byte resumenOriginal[] = (byte[]) o;

            // Se obtiene una instancia de MessageDigest para SHA-256
            MessageDigest md = MessageDigest.getInstance("SHA-256");

            // Se calcula el resumen del String modificado
            md.update(datos.getBytes()); // TEXTO A RESUMIR
            byte resumenActual[] = md.digest(); // SE CALCULA EL RESUMEN

            // Se comparan los dos resúmenes (el original y el calculado)
            if (MessageDigest.isEqual(resumenActual, resumenOriginal)) {
                // Si son iguales, los datos son válidos
                System.out.println("DATOS VÁLIDOS");
            } else {
                // Si no son iguales, los datos no son válidos
                System.out.println("DATOS NO VÁLIDOS");
            }

            // Se cierran los flujos de entrada
            dataOS.close();
            fileout.close();
        } catch (IOException | ClassNotFoundException e) {
            // En caso de error de lectura/escritura o al no encontrar la clase
            e.printStackTrace();
        } catch (Exception e) {
            // En caso de otro tipo de error
            e.printStackTrace();
        }
    }

    // Método para convertir el texto a mayúsculas
    private static String convertirMayusculas(String texto) {
        return texto.toUpperCase();
    }
}