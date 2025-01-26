package com.cabinet_dentaire.m_patient.Dao;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PatientDao {
    private Long id;
    private String fullname;
    private Date datenaissance;
    private String adresse;
    private String cin;
    private String telephone;
    private String email;
    private String etatCivil;
    private int nombreEnfants;
    private String cnss;
}
