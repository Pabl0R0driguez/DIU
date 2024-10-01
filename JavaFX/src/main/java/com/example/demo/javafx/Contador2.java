    package com.example.demo.javafx;

    import javafx.application.Application;
    import javafx.beans.property.SimpleIntegerProperty;
    import javafx.geometry.Insets;
    import javafx.geometry.Pos;
    import javafx.scene.Scene;
    import javafx.scene.control.Button;
    import javafx.scene.control.Label;
    import javafx.scene.layout.HBox;
    import javafx.scene.layout.VBox;
    import javafx.scene.text.Font;
    import javafx.stage.Stage;

    public class Contador2 extends Application {

    public Label texto;
     SimpleIntegerProperty numPulsaciones = new SimpleIntegerProperty(0);

    private void botonPulsado(int n) {
        numPulsaciones.set((n == 0) ? 0 : numPulsaciones.get() + n);
    }

    public void setStage(Stage escenarioPrincipal) {
        try {
        HBox contador = new HBox(10);
            contador.setSpacing(20);
            contador.setAlignment(Pos.CENTER);

        Button bt1, bt2, bt3;

            bt1 = new Button("+");
            bt1.setOnAction(e -> botonPulsado(1));
            bt2 = new Button("-");
            bt2.setOnAction(e -> botonPulsado(-1));
            bt3 = new Button("0");
            bt3.setId("bt3");
            bt3.setOnAction(e -> botonPulsado(0));

        contador.getChildren().addAll(bt1, bt2, bt3);

        texto = new Label("0");
        texto.setId("texto");
        texto.setFont(Font.font(30));


        VBox principal = new VBox(10);
            principal.setId("Vbox");
            principal.setSpacing(10);
            principal.setAlignment(Pos.TOP_CENTER);
            principal.setPadding(new Insets(10));
            principal.getChildren().addAll(contador, texto);

    Scene escena = new Scene(principal, 300, 100);
    escena.getStylesheets().add(getClass().getResource("/Styles/contador.css").toExternalForm());
        escenarioPrincipal.setTitle("Contador");
        escenarioPrincipal.setScene(escena);
        escenarioPrincipal.show();

    numPulsaciones.addListener((obs, oldValue, newValue) -> {
    texto.setText(String.valueOf(newValue));
    });
    }
        catch (Exception e) {
        e.printStackTrace();

            }
        }

    @Override
    public void start(Stage stage) throws Exception {

    }
    }
