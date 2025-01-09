package com.example.agenda.controller;

import java.text.DateFormatSymbols;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.chart.BarChart;
import javafx.scene.chart.CategoryAxis;
import javafx.scene.chart.XYChart;

import com.example.hotel.model.Reservation;

public  class HotelStatisticsController {
    @FXML
    private BarChart<String, Integer> barChart;

    @FXML
    private CategoryAxis xAxis;

    private ObservableList<String> monthNames = FXCollections.observableArrayList();

    /**
     * Initializes the controller class. This method is automatically called
     * after the fxml file has been loaded.
     */
    @FXML
    private void initialize() {
        // Get an array with the English month names.
        String[] months = DateFormatSymbols.getInstance(Locale.ENGLISH).getMonths();
        // Convert it to a list and add it to our ObservableList of months.
        monthNames.addAll(Arrays.asList(months));

        // Assign the month names as categories for the horizontal axis.
        xAxis.setCategories(monthNames);
    }

    /**
     * Sets the reservation data to show the statistics for.
     *
     * @param reservations
     */
    public void setReservationData(List<Reservation> reservations) {
        // Count the number of reservations for each month.
        int[] monthCounter = new int[12];
        for (Reservation reservation : reservations) {
            int month = reservation.getReservationDate().getMonthValue() - 1;
            monthCounter[month]++;
        }

        XYChart.Series<String, Integer> series = new XYChart.Series<>();
        series.setName("Reservas por mes");

        // Create a XYChart.Data object for each month. Add it to the series.
        for (int i = 0; i < monthCounter.length; i++) {
            series.getData().add(new XYChart.Data<>(monthNames.get(i), monthCounter[i]));
        }

        barChart.getData().add(series);
    }
}
