package com.example.gestionhotel.controller;

import com.example.gestionhotel.MainApp;
import com.example.gestionhotel.view.Reserva;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.chart.BarChart;
import javafx.scene.chart.CategoryAxis;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;


public class ReservaEstadisticasController {

    @FXML
    BarChart<String, Number> graficoBarras;

    @FXML
    TextField anio;

    @FXML
    private CategoryAxis ejeX;

    @FXML
    private NumberAxis ejeY;

    MainApp mainApp;
    int[] contarMediaPorMes;


    XYChart.Series<String, Number> datos1 = new XYChart.Series<>();

    @FXML
    public void initialize() {

    }



    public String obtener_mes(int i) {
        String mes = "";

        switch (i) {
            case 1:
                mes = "Ene";
                break;
            case 2:
                mes = "Feb";
                break;
            case 3:
                mes = "Mar";
                break;
            case 4:
                mes = "Abr";
                break;
            case 5:
                mes = "May";
                break;
            case 6:
                mes = "Jum";
                break;
            case 7:
                mes = "Jul";
                break;
            case 8:
                mes = "Ago";
                break;
            case 9:
                mes = "Sep";
                break;
            case 10:
                mes = "Oct";
                break;
            case 11:
                mes = "Nov";
                break;
            case 12:
                mes = "Dic";
                break;
        }
        return mes;
    }

    public void mediaOcupacion(Integer anio) {

        // Obtener el número de reservas por mes para el año seleccionado
       contarMediaPorMes = mainApp.getHotelModelo().getReservaRepository().contarTotalReservasMes(anio);

        // Recorrer los valores de las reservas por mes
        for (int mes : contarMediaPorMes) {
            System.out.println("Mes: " + mes);
        }

    }

    public void dibujarGraficoBarras() {
        int[] contadorreservas = Reserva.getContadorTotalReservasMes();

        for (int mes : contadorreservas) {
            System.out.println("dibujar Mes: " + mes);
        }
        int totalHabitaciones = Reserva.getTotalNumeroHabitaciones();

        System.out.println("totalHabitaciones: " + totalHabitaciones);

        String mes = "";
        XYChart.Series<String, Number> datos = new XYChart.Series<>();
        graficoBarras.getData().clear();



        datos.setName(anio.getText());
        for (int i = 0; i < contadorreservas.length; i++) {
            Number porcentaje = ((float)contadorreservas[i] / (float)totalHabitaciones) * 100;
            System.out.println("dibujar Mes: " + i + " reservas: " + contadorreservas[i]  + " porcentaje" + porcentaje);
            mes = obtener_mes(i + 1);

            datos.getData().add(new XYChart.Data<>(mes, porcentaje));
        }


        graficoBarras.getData().addAll(datos);
    }

    @FXML
    public void buscarEstadistica (ActionEvent event) {
        String an = anio.getText();
        mediaOcupacion(Integer.valueOf(an));
        dibujarGraficoBarras();

    }


    public void setMainApp(MainApp mainApp) {
        this.mainApp = mainApp;
    }


}


