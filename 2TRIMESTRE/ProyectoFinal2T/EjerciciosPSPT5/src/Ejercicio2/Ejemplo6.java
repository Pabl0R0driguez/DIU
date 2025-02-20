package Ejercicio2;

import java.io.*;
import java.security.MessageDigest;

public class Ejemplo6{
    public static void main(String args[]) {
        try {
            FileInputStream fileout = new FileInputStream("DATOS.DAT");
            ObjectInputStream dataOS = new ObjectInputStream(fileout);

            Object o = dataOS.readObject();

            String datos = (String) o;
            System.out.println("Datos originales: " + datos);

            datos = mayusculas(datos);

            o = dataOS.readObject();
            byte resumenOriginal[] = (byte[]) o;


            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(datos.getBytes()); // TEXTO A RESUMIR
            byte resumenActual[] = md.digest(); // SE CALCULA EL RESUMEN

            if (MessageDigest.isEqual(resumenActual, resumenOriginal)) {
                System.out.println("DATOS VÁLIDOS");
            } else {
                System.out.println("DATOS NO VÁLIDOS");
            }

            dataOS.close();
            fileout.close();
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static String mayusculas(String texto) {
        return texto.toUpperCase();
    }
}