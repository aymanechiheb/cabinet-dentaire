package com.example.cabinet_dentaire_resource.m_resources.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SalleConsultationDto {
    private Long id;
    private String numero;
    private boolean disponibilite;
}
