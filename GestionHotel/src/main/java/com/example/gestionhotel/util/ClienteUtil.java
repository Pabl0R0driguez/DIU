package com.example.gestionhotel.util;

import com.example.gestionhotel.view.Cliente;
import com.example.gestionhotel.model.ClienteVO;

import java.util.ArrayList;

public class ClienteUtil {

    public static ArrayList<Cliente> parseToCliente(ArrayList<ClienteVO> lista) {
        if (lista == null) {
            return null;
        } else {
            ArrayList<Cliente> clientes = new ArrayList<>();
            for (ClienteVO clienteVO : lista) {

                clientes.add(new Cliente(clienteVO.getDNI(), clienteVO.getNombre(),clienteVO.getApellidos(), clienteVO.getDireccion(), clienteVO.getLocalidad(), clienteVO.getProvincia()));
            }
            return clientes;
        }
    }

    public static ClienteVO parseToClienteVO(Cliente cliente) {
      ClienteVO c = new ClienteVO(cliente.getDniProperty().get(), cliente.getNombre(), cliente.getApellidos(), cliente.getDireccion(),cliente.getLocalidad(),cliente.getProvinica());
      return c;
    }

}
