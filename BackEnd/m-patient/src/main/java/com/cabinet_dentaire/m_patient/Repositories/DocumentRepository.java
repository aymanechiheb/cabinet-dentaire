package com.cabinet_dentaire.m_patient.Repositories;

import com.cabinet_dentaire.m_patient.Entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByPatientId(Long patientId);

}
