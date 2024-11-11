package com.example.gestionhotel.model.repository;


import com.example.gestionhotel.model.ClienteVO;
import com.example.gestionhotel.model.ExcepcionCliente;

import java.sql.SQLException;
import java.util.ArrayList;

public interface ClienteRepository  {
    ArrayList<ClienteVO> ObtenerListaPersonas() throws ExcepcionCliente, SQLException;

    void addPersona(ClienteVO var1) throws ExcepcionCliente, SQLException;

    void deletePersona(String var1) throws ExcepcionCliente, SQLException;

    void editPersona(ClienteVO var1) throws ExcepcionCliente;


}


