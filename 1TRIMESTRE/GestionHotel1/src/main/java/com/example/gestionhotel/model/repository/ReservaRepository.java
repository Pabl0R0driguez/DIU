package com.example.gestionhotel.model.repository;

import com.example.gestionhotel.model.ExcepcionReserva;
import com.example.gestionhotel.model.ReservaVO;

import java.util.ArrayList;

public interface ReservaRepository {

    void añadirReserva(ReservaVO var1) throws ExcepcionReserva;
    void modificarReserva(ReservaVO var1) throws ExcepcionReserva;
    void eliminarReserva(int var1) throws ExcepcionReserva;
    ArrayList<ReservaVO> listarReservasPorCliente(String var1) throws ExcepcionReserva;
    void contarTotalReservas() throws ExcepcionReserva;
    int[] contarTotalReservasMes(int anio) throws ExcepcionReserva;



}
