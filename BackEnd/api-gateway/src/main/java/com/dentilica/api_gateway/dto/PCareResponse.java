package com.dentilica.api_gateway.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class PCareResponse {
    private Long id;
    private Long idFacture;
    private Long appointmentId;
    private LocalDateTime dateTime;
    private String comment;
}
