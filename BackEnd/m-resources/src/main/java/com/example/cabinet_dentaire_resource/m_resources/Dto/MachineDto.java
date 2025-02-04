package com.example.cabinet_dentaire_resource.m_resources.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MachineDto {

    private Long id;
    private String nom;
    private String model;
    private String numerodeserie;
    private String etat;

    private Long salleConsultationId; // To include the SalleConsultation ID in the response
}
