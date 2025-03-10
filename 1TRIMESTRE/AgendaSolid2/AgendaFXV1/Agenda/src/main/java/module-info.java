module com.example.agenda {
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.web;

    requires org.controlsfx.controls;
    requires com.dlsc.formsfx;
    requires net.synedra.validatorfx;
    requires org.kordamp.ikonli.javafx;
    requires org.kordamp.bootstrapfx.core;
    requires eu.hansolo.tilesfx;
    requires com.almasb.fxgl.all;
    requires java.sql;
	requires java.desktop;
    requires mysql.connector.j;

    opens com.example.agenda to javafx.fxml;
    exports com.example.agenda.controller;
    opens com.example.agenda.controller to javafx.fxml;
    exports com.example.agenda.model;
    opens com.example.agenda.model to javafx.fxml;
    exports com.example.agenda.view;
    opens com.example.agenda.view to javafx.fxml;
    exports com.example.agenda;
}