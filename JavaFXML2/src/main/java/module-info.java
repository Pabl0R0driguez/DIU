module com.example.demo.javafxml2 {
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

    opens com.example.demo.javafxml2 to javafx.fxml;
    exports com.example.demo.javafxml2;
    exports com.example.demo.javafxml2.controller;
    opens com.example.demo.javafxml2.controller to javafx.fxml;
}