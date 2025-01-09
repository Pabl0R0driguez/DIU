package com.example.gestionhotel.model.repository;


import com.example.gestionhotel.model.ClienteVO;
import com.example.gestionhotel.model.ExcepcionCliente;
import com.example.gestionhotel.model.ReservaVO;

import java.sql.SQLException;
import java.util.ArrayList;

public interface ClienteRepository  {
    ArrayList<ClienteVO> ObtenerListaPersonas() throws ExcepcionCliente, SQLException;

    void addPersona(ClienteVO var1) throws ExcepcionCliente;

    void deletePersona(String var1) throws ExcepcionCliente;

    void editPersona(ClienteVO var1) throws ExcepcionCliente;


}


