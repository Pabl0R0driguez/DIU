package com.example.gestionhotel.model;

import com.example.gestionhotel.util.ClienteUtil;
import com.example.gestionhotel.view.Cliente;
import com.example.gestionhotel.model.repository.ClienteRepository;
import java.sql.SQLException;
import java.util.ArrayList;

public class HotelModelo {
    private ClienteRepository clienteRepository;
    ArrayList<ClienteVO> cliente = new ArrayList<>();




    public void setClienteRepository(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public ClienteRepository getClienteRepository() {
        return clienteRepository;
    }

    public ArrayList<Cliente> setCliente() throws ExcepcionCliente, SQLException {
        cliente = clienteRepository.ObtenerListaPersonas();
        //Devolvemos lista de personas cambiada de PersonVO a Person
        return ClienteUtil.parseToCliente(cliente);
    }

}
