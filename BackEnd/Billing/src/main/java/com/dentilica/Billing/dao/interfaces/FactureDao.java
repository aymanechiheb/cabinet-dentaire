package com.dentilica.Billing.dao.interfaces;

import com.dentilica.Billing.model.Facture;

import java.util.List;
import java.util.Optional;

public interface FactureDao {
    Facture save(Facture facture);
    void delete(Long factureId);
    Optional<Facture> findById(Long factureId);
    List<Facture> findAll();
    List<Facture> findByUserId(Long userId);
    List<Facture> findByPatientId(Long patientId);
}
