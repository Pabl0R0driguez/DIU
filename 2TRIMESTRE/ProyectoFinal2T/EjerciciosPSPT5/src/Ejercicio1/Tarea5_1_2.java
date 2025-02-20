package Ejercicio1;
import java.security.*;
import java.util.Scanner;

public class Tarea5_1_2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Introduce la primera cadena: ");
        String cadena1 = sc.nextLine();
        System.out.print("Introduce la segunda cadena: ");
        String cadena2 = sc.nextLine();
        System.out.print("Introduce la clave: ");
        String clave = sc.nextLine();

        try {
            // Crear el MessageDigest para SHA-256
            MessageDigest md = MessageDigest.getInstance("SHA-256");

            // Calcular el resumen de la primera cadena con la clave
            md.update(cadena1.getBytes());
            md.update(clave.getBytes());
            byte[] resumen1 = md.digest();

            // Calcular el resumen de la segunda cadena con la clave
            md.reset();
            md.update(cadena2.getBytes());
            md.update(clave.getBytes());
            byte[] resumen2 = md.digest();

            // Comprobar si los resúmenes son iguales
            boolean iguales = MessageDigest.isEqual(resumen1, resumen2);

            System.out.println("Resumen de la primera cadena: " + Hexadecimal(resumen1));
            System.out.println("Resumen de la segunda cadena: " + Hexadecimal(resumen2));
            System.out.println("¿Los resúmenes son iguales? " + (iguales ? "Sí" : "No"));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    // Convertir un array de bytes a hexadecimal
    static String Hexadecimal(byte[] resumen) {
        StringBuilder hex = new StringBuilder();
        for (byte b : resumen) {
            String h = Integer.toHexString(b & 0xFF);
            if (h.length() == 1) hex.append("0");
            hex.append(h);
        }
        return hex.toString().toUpperCase();
    }
}