package Ejercicio2;

import java.io.*;
import java.security.*;

public class Ejemplo5 {
    public static void main(String args[]) {
        try {
            // Se crea un flujo de salida para escribir en el archivo "DATOS.DAT"
            FileOutputStream fileout = new FileOutputStream("DATOS.DAT");
            // Se crea un flujo de salida para escribir objetos en el archivo
            ObjectOutputStream dataOS = new ObjectOutputStream(fileout);

            // Se obtiene una instancia de MessageDigest con el algoritmo SHA-256
            MessageDigest md = MessageDigest.getInstance("SHA-256");

            // Texto a procesar
            String datos = "En un lugar de la Mancha,"
                    + " de cuyo nombre no quiero acOrdarme, no ha mucho tiempo "
                    + "que vivía un hidalgo de los de lanza en astillero, "
                    + "adarga antigua, rocín flaco y galgo corredor.";

            // Se convierte el texto en un arreglo de bytes
            byte dataBytes[] = datos.getBytes();

            // Se actualiza el MessageDigest con los bytes del texto
            md.update(dataBytes); // TEXTO A RESUMIR

            // Se obtiene el resumen (hash) del texto
            byte resumen[] = md.digest(); // SE CALCULA EL RESUMEN

            // Se escribe el texto original en el archivo
            dataOS.writeObject(datos);

            // Se escribe el resumen del hash en el archivo
            dataOS.writeObject(resumen);

            // Se cierran los flujos de salida
            dataOS.close();
            fileout.close();
        } catch (IOException e) {
            // Si ocurre un error de entrada/salida, se imprime el error
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            // Si no se encuentra el algoritmo SHA-256, se imprime el error
            e.printStackTrace();
        }
    }
}