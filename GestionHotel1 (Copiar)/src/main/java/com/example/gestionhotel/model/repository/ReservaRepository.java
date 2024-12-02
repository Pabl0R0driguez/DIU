package com.example.gestionhotel.model.repository;

import com.example.gestionhotel.model.ExcepcionReserva;
import com.example.gestionhotel.model.ReservaVO;
import com.example.gestionhotel.view.Reserva;

import java.util.ArrayList;

public interface ReservaRepository {

    void añadirReserva(ReservaVO var1) throws ExcepcionReserva;
    void modificarReserva(ReservaVO var1) throws ExcepcionReserva;
    void eliminarReserva(int var1) throws ExcepcionReserva;
    ArrayList<ReservaVO> listarReservas(String var1) throws ExcepcionReserva;


}
