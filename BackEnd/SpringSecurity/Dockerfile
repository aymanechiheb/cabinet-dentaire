FROM eclipse-temurin:21-jdk
WORKDIR /app
ARG JAR_FILE=target/SpringSecurity-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8085
ENTRYPOINT ["java", "-jar", "/app.jar"]
