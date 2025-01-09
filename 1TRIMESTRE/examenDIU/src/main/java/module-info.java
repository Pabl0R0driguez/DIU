module com.example.examendiu {
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
    requires java.desktop;
    requires java.sql;

    // Exporta el paquete controller para que otras clases puedan acceder a él
    exports com.example.examendiu.controller;

    // Abre el paquete controller para reflexión por javafx.fxml
    opens com.example.examendiu.controller to javafx.fxml;

    // Exporta el paquete principal
    exports com.example.examendiu;
}
