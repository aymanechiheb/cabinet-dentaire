package com.example.cabinet_dentaire_resource.m_resources.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nom;
    private String model;
    private LocalDate datedachat;
    private LocalDate datedernierrevesion;
    private String etat;
    private String numerodeserie;

    @ManyToOne
    @JoinColumn(name = "salle_id", nullable = true) // Foreign key to SalleConsultation
    private SalleConsultation salleConsultation; // The salle this machine belongs to
}
