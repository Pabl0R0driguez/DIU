package com.example.gestionhotel.util;

import com.example.gestionhotel.model.ReservaVO;
import com.example.gestionhotel.view.Reserva;

import java.util.ArrayList;

public class ReservaUtil {

    public static ArrayList<Reserva> parseToReserva(ArrayList<ReservaVO> listaReservaVO) {

    if (listaReservaVO == null) {
        return null;

    }else {
        ArrayList<Reserva> reserva = new ArrayList<>();
        for (ReservaVO reservaVO : listaReservaVO) {

        reserva.add(new Reserva(reservaVO.getIdReserva(), reservaVO.getFechaLlegada(),reservaVO.getFechaSalida(),reservaVO.getNumeroHabitaciones(),reservaVO.getTipoHabitacion(),reservaVO.isFumador(),reservaVO.getRegimenAlojamiento()));
        }
        return reserva;
    }
    }

    public static ReservaVO parseToReservaVO(Reserva reserva) {
        ReservaVO reservaVO = new ReservaVO(reserva.getIdReserva2(),reserva.getFechaSalida2(),reserva.getFechaLlegada2(), reserva.getNumeroHabitaciones2(), reserva.getTipoHabitacion2(),reserva.isFumador2(),reserva.getRegimenAlojamiento2());
        return reservaVO;
        }
}
