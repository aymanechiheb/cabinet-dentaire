package com.cabinet_dentaire.m_patient.Dao;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DocumentDao {
    private long id;
    private String fichier;
    private Long patientId;
}
