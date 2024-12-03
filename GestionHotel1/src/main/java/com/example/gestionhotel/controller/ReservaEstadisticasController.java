//package com.example.gestionhotel.controller;
//
//import java.text.DateFormatSymbols;
//import java.util.Arrays;
//import java.util.List;
//import java.util.Locale;
//
//import com.example.gestionhotel.MainApp;
//import com.example.gestionhotel.view.Reserva;
//import javafx.collections.FXCollections;
//import javafx.collections.ObservableList;
//import javafx.fxml.FXML;
//import javafx.scene.chart.BarChart;
//import javafx.scene.chart.CategoryAxis;
//import javafx.scene.chart.XYChart;
//import javafx.stage.Stage;
//
//
//public class ReservaEstadisticasController {
//    @FXML
//    private BarChart<String, Integer> barChart;
//
//    @FXML
//    private CategoryAxis xAxis;
//
//    private ObservableList<String> monthNames = FXCollections.observableArrayList();
//
//    private MainApp mainApp;
//    private Stage stage;
//
//    /**
//     * Initializes the controller class. This method is automatically called
//     * after the fxml file has been loaded.
//     */
//    @FXML
//    private void initialize() {
//        // Get an array with the English month names.
//        String[] months = DateFormatSymbols.getInstance(Locale.ENGLISH).getMonths();
//        // Convert it to a list and add it to our ObservableList of months.
//        monthNames.addAll(Arrays.asList(months));
//
//        // Assign the month names as categories for the horizontal axis.
//        xAxis.setCategories(monthNames);
//    }
//
//    /**
//     * Sets the reservation data to show the statistics for.
//     *
//     * @param reservations
//     */
//    public void setReservationData(List<Reserva> reservations, int totalHabitaciones) {
//        // Total de días por mes (usando 1-based index).
//        int[] daysInMonth = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
//
//        // Verificar si es año bisiesto y ajustar febrero.
//        int year = reservations.get(0).getFechaLlegada2().getYear(); // Ejemplo: obtener año de la primera reserva
//        if (java.time.Year.isLeap(year)) {
//            daysInMonth[1] = 29;
//        }
//
//        // Acumulador de ocupación media por mes.
//        double[] monthOccupancy = new double[12];
//
//        for (Reserva reservation : reservations) {
//            int month = reservation.getFechaLlegada2().getMonthValue() - 1; // Mes 0-based.
//            double ocupacionMedia = reservation.getOcupacionMediaPorTipoHabitacion(); // Método para obtener ocupación media.
//            monthOccupancy[month] += ocupacionMedia;
//        }
//
//        // Crear una serie para el gráfico.
//        XYChart.Series<String, Double> series = new XYChart.Series<>();
//        series.setName("Porcentaje de ocupación por mes");
//
//        // Calcular porcentaje y llenar datos del gráfico.
//        for (int i = 0; i < monthOccupancy.length; i++) {
//            double maxPossibleOccupancy = totalHabitaciones * daysInMonth[i];
//            double percentage = (monthOccupancy[i] / maxPossibleOccupancy) * 100;
//            series.getData().add(new XYChart.Data<>(monthNames.get(i), percentage));
//        }
//
//        barChart.getData().clear(); // Limpiar datos existentes.
//        barChart.getData().add(series); // Agregar la nueva serie.
//    }
//
//
//
//
//    public void setMainApp(MainApp mainApp) {
//        this.mainApp = mainApp;
//    }
//
//    public void setDialogStage(Stage dialogStage) {
//        this.stage = dialogStage;
//    }
//    }
//
//
