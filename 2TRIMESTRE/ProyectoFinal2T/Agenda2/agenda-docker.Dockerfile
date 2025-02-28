FROM openjdk:21

COPY target/Agenda-0.0.1-SNAPSHOT.jar /agendaapp2.jar

CMD ["java", "-jar", "/agendaapp2.jar"]