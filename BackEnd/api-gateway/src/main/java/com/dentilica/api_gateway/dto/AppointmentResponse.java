package com.dentilica.api_gateway.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AppointmentResponse {
    private Long id;
    private Long patientId;
    private Long idUser;
    private String status;
    private String motif;
    private List<PCareResponse> cares;

}
