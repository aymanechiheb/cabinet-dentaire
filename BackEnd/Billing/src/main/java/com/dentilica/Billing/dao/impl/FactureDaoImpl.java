package com.dentilica.Billing.dao.impl;

import com.dentilica.Billing.dao.interfaces.FactureDao;
import com.dentilica.Billing.model.Facture;
import com.dentilica.Billing.repository.FactureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class FactureDaoImpl implements FactureDao {

    @Autowired
    private FactureRepository factureRepository;
    @Override
    public Facture save(Facture facture) {
        return factureRepository.save(facture);
    }

    @Override
    public void delete(Long factureId) {
        factureRepository.deleteById(factureId);
    }

    @Override
    public Optional<Facture> findById(Long factureId) {
        return Optional.of(factureRepository.findById(factureId).orElseThrow(() -> new RuntimeException("Billing not Found")));
    }

    @Override
    public List<Facture> findAll() {
        return factureRepository.findAll();
    }

    @Override
    public List<Facture> findByUserId(Long userId) {
        return factureRepository.findByUserId(userId);
    }

    @Override
    public List<Facture> findByPatientId(Long patientId) {
        return factureRepository.findByPatientId(patientId);
    }
}
