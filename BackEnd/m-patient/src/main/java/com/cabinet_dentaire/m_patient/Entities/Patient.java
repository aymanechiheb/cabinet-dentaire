package com.cabinet_dentaire.m_patient.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;


@Entity
@Setter
@Getter

public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fullname;

    @Temporal(TemporalType.DATE)
    private Date datenaissance;

    private String adresse;

    @Column(unique = true, nullable = false)
    private String cin;

    @Column(unique = true, nullable = false)
    private String telephone;

    @Column(unique = true, nullable = false)
    private String email;

    private String etatCivil;

    private Integer nombreEnfants;

    @Column(unique = true, nullable = false)
    private String cnss;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Document> documents;
}


