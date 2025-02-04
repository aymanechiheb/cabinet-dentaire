package com.cabinet_dentaire.m_patient.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DocumentDto {
    private long id;
    private String fileUrl;  // URL to download the file
    private Long patientId;
    private String patientName;
}