package Ejercicio3;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.*;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

public class Ejercicio3 {
    public static void main(String[] args) {
        try {
            KeyPairGenerator keyGen = KeyPairGenerator.getInstance("DSA");
            //SE INICIALIZA EL GENERADOR DE CLAVES
            SecureRandom numero = SecureRandom.getInstance("SHA1PRNG");
            keyGen.initialize(2048, numero);

            //SE CREA EL PAR DE CLAVES PRIVADA Y PÚBLICA y obtenemos y almacenamos ambas en las variables
            KeyPair par = keyGen.generateKeyPair();
            PrivateKey clavepriv = par.getPrivate();
            PublicKey clavepub = par.getPublic();

            //FIRMA CON CLAVE PRIVADA EL MENSAJE
            //AL OBJETO Signature SE LE SUMINISTRAN LOS DATOS A FIRMAR
            Signature dsa = Signature.getInstance("SHA256withDSA");
            dsa.initSign(clavepriv);
            String mensaje = "Este mensaje va a ser firmado";
            dsa.update(mensaje.getBytes());

            byte[] firma = dsa.sign(); //MENSAJE FIRMADO

            //EL RECEPTOR DEL MENSAJE
            //VERIFICA CON LA CLAVE PÚBLICA EL MENSAJE FIRMADO
            //AL OBJETO Signature se le suministran los datos a verificar
            Signature verificadsa = Signature.getInstance("SHA256withDSA");
            verificadsa.initVerify(clavepub);
            verificadsa.update(mensaje.getBytes());
            boolean check = verificadsa.verify(firma);

            // Almacenamos la clave privada en un fichero binario
            PKCS8EncodedKeySpec pkcs8 = new PKCS8EncodedKeySpec(clavepriv.getEncoded());
            FileOutputStream outpriv = new FileOutputStream("Clave.privada");
            outpriv.write(pkcs8.getEncoded()); // Escribo la clave pública en el archivo
            outpriv.close();

            // Almacenamos la clave publica en un fichero binario
            X509EncodedKeySpec x509 = new X509EncodedKeySpec(clavepub.getEncoded());
            FileOutputStream outpub = new FileOutputStream("Clave.publica");
            outpub.write(x509.getEncoded()); // Escribo la clave privada en el archivo
            outpub.close();

            // Si todo ha funcionado correctamente mostramos mensajes de éxito
            if (check) {
                System.out.println("FIRMA VERIFICADA CON CLAVE PÚBLICA");
                System.out.println("CLAVES ALMACENADAS EN LOS FICHEROS");
            }else {System.out.println("FIRMA NO VERIFICADA");}

        } catch (NoSuchAlgorithmException el) {
            el.printStackTrace();
        } catch (InvalidKeyException e2) {
            e2.printStackTrace();
        } catch (SignatureException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}