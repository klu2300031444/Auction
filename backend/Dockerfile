# Use OpenJDK 21 as base image
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy the pre-built JAR file
COPY target/auction-backend-0.0.1-SNAPSHOT.jar app.jar

# Create a non-root user for security
RUN addgroup --system spring && adduser --system spring --ingroup spring
RUN chown -R spring:spring /app
USER spring:spring

# Expose port
EXPOSE 3000

# Run the application
CMD ["java", "-jar", "app.jar"]

