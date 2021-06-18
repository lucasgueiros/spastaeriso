FROM adoptopenjdk:11-jre-hotspot
ARG JAR_FILE=spastaeriso-api-latest.jar
ARG APP_PROPS=application.properties
COPY ${JAR_FILE} application.jar
COPY ${APP_PROPS} application.properties
ENTRYPOINT ["java", "-jar", "application.jar"]
