package com.cabinet_dentaire.m_patient.Repositories;

import com.cabinet_dentaire.m_patient.Entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    boolean existsByEmail(String email);
    boolean existsByCin(String cin);
    boolean existsByTelephone(String telephone);
    boolean existsByCnss(String cnss);


}
