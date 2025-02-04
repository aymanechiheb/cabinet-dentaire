package com.cabinet_dentaire.m_patient.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter

public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String fichier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    @JsonIgnore
    private Patient patient;
}

