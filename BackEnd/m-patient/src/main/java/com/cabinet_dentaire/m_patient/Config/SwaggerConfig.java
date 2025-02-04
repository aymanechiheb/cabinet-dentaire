package com.cabinet_dentaire.m_patient.Config;


import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI CustomOpenApi (){
        return new OpenAPI();}
}
