package com.example.agenda.view;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.ObjectProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleObjectProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;


/**
 * Model class for a Person.
 *
 * @author Marco Jakob
 */
public class Person {

    private  IntegerProperty codigo = null;
    private final StringProperty firstName;
    private final StringProperty lastName;
    private final StringProperty street;
    private final IntegerProperty postalCode;
    private final StringProperty city;
    private final ObjectProperty<LocalDate> birthday;


    // Formato para la fecha
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    public Person( String nombre, String apellido) {

    this.firstName = new SimpleStringProperty(nombre);
    this.lastName = new SimpleStringProperty(apellido);
    this.street = new SimpleStringProperty("calle");
    this.postalCode = new SimpleIntegerProperty(1234);
    this.city = new SimpleStringProperty("ciudad");
    this.birthday = new SimpleObjectProperty<>(LocalDate.of(2005,05,02));
    }

    public Person(IntegerProperty codigo, String firstName, String lastName, String street, int postalCode, String city, LocalDate birthday) {
        this.codigo = codigo;
        this.firstName = new SimpleStringProperty(firstName);
        this.lastName = new SimpleStringProperty(lastName);
        this.street = new SimpleStringProperty("some street");
        this.postalCode = new SimpleIntegerProperty(1234);
        this.city = new SimpleStringProperty("some city");
        this.birthday = new SimpleObjectProperty<>(LocalDate.of(1999, 2, 21));
    }

    // Constructor vacío (inicializa todas las propiedades con valores predeterminados)
    public Person() {
        this.codigo=new SimpleIntegerProperty(0);
        this.firstName = new SimpleStringProperty("");
        this.lastName = new SimpleStringProperty("");
        this.street = new SimpleStringProperty("");
        this.postalCode = new SimpleIntegerProperty(0);
        this.city = new SimpleStringProperty("");
        this.birthday = new SimpleObjectProperty<>(LocalDate.now());
    }


    public String getFirstName() {
        return firstName.get();
    }

    public String setFirstName(String firstName) {
        this.firstName.set(firstName);
		return firstName;
	}

    public StringProperty firstNameProperty() {
        return firstName;
    }

    public String getLastName() {
        return lastName.get();
    }

    public String setLastName(String lastName) {
        this.lastName.set(lastName);
		return lastName;
	}

    public StringProperty lastNameProperty() {
        return lastName;
    }

    public String getStreet() {
        return street.get();
    }

    public String setStreet(String street) {
        this.street.set(street);
		return street;
	}

    public StringProperty streetProperty() {
        return street;
    }

    public int getPostalCode() {
        return postalCode.get();
    }

    public String setPostalCode(int postalCode) {
        this.postalCode.set(postalCode);
		return String.valueOf(postalCode);
	}

    public IntegerProperty postalCodeProperty() {
        return postalCode;
    }

    public String getCity() {
        return city.get();
    }

    public void setCity(String city) {
        this.city.set(city);
    }

    public StringProperty cityProperty() {
        return city;
    }

    public LocalDate getBirthday() {
        return birthday.get();
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday.set(birthday);
    }


}