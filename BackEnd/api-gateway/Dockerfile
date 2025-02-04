# Use the OpenJDK 21 runtime
FROM eclipse-temurin:21-jdk-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Create a non-root user for security purposes
RUN addgroup -S dentilica && \
    adduser -S dentilica -G dentilica

# Copy the Spring Boot JAR file into the container
COPY target/*.jar app.jar

# Adjust file ownership to the non-root user
RUN chown -R dentilica:dentilica /usr/src/app

# Switch to the non-root user
USER dentilica

# Set the environment variables
ENV JAVA_OPTS=""

# Expose the application port (adjust the port based on your Spring Boot app's configuration)
EXPOSE 8080

# Run the Spring Boot application
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
