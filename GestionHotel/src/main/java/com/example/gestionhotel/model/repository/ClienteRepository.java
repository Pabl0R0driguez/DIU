package com.example.gestionhotel.model.repository;


import com.example.gestionhotel.model.ClienteVO;
import com.example.gestionhotel.model.ExcepcionCliente;

import java.sql.SQLException;
import java.util.ArrayList;

public interface ClienteRepository  {
    ArrayList<ClienteVO> ObtenerListaPersonas() throws ExcepcionCliente;

    void addPersona(ClienteVO var1) throws ExcepcionCliente;

    void deletePersona(Integer var1) throws ExcepcionCliente;

    void editPersona(ClienteVO var1) throws ExcepcionCliente;

    int lastId() throws ExcepcionCliente;

    int  contarPersonas() throws ExcepcionCliente, SQLException;

}


