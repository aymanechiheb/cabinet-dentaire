package com.dentilica.Billing.repository;

import com.dentilica.Billing.model.Facture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Long> {
    List<Facture> findByUserId(Long UserId);
    List<Facture> findByPatientId(Long patientId);
}
