package com.dentilica.api_gateway.dto;

import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class FactureResponse {
    private Long id;


    private LocalDateTime date;

    private Long amount;

    private String status;

    private String paymentMethod;

    private LocalDateTime dueDate;

    private String numFacture;
}
