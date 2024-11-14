package com.example.gestionhotel.model.repository;

import com.example.gestionhotel.model.ExcepcionCliente;
import com.example.gestionhotel.model.ExcepcionReserva;
import com.example.gestionhotel.model.ReservaVO;

public interface ReservaRepository {

    void añadirReserva(ReservaVO var1) throws ExcepcionReserva;

}
