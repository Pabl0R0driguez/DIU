package com.example.gestionhotel.model;

import com.example.gestionhotel.model.repository.ReservaRepository;
import com.example.gestionhotel.util.ClienteUtil;
import com.example.gestionhotel.view.Cliente;
import com.example.gestionhotel.model.repository.ClienteRepository;
import java.sql.SQLException;
import java.util.ArrayList;

public class HotelModelo {
    private ClienteRepository clienteRepository;
    private ReservaRepository reservaRepository;
    private ArrayList<ClienteVO> clientesVO = new ArrayList<>();

    // Setear el repositorio de clientes
    public void setClienteRepository(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Obtener el repositorio de clientes
    public ClienteRepository getClienteRepository() {
        return clienteRepository;
    }

    public void setReservaRepository(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    public ReservaRepository getReservaRepository() {
        return reservaRepository;
    }


    // Renombrado el método para que sea más claro
    public ArrayList<Cliente> setCliente() throws ExcepcionCliente, SQLException {
        // Obtenemos la lista de clientes desde el repositorio
        clientesVO = clienteRepository.ObtenerListaPersonas();

        // Convertimos la lista de ClienteVO a Cliente usando el método de utilidad
        return ClienteUtil.parseToCliente(clientesVO);
    }




}
