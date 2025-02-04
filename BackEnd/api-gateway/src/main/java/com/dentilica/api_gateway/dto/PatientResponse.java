package com.dentilica.api_gateway.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class PatientResponse {
    private Long id;
    private String fullname;
    private String username;
    private String phone;
}
