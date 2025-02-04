package com.example.cabinet_dentaire_resource.m_resources.Dao;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MachineDao {

    private Long id;
    private String nom;
    private String model;
    private String numerodeserie;
    private String etat;
    private Long salleConsultationId;
    private String salleConsultationCode;// To associate the machine with a SalleConsultation
}
