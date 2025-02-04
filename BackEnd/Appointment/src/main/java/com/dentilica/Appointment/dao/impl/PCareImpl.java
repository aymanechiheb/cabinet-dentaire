package com.dentilica.Appointment.dao.impl;


import com.dentilica.Appointment.dao.interfaces.PCareDao;
import com.dentilica.Appointment.model.PCare;
import com.dentilica.Appointment.repository.CProductRepository;
import com.dentilica.Appointment.repository.PCareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PCareImpl implements PCareDao {

    @Autowired
    PCareRepository pCareRepository;

    @Override
    public PCare save(PCare pCare) {
        return pCareRepository.save(pCare);
    }

    @Override
    public void delete(Long PCareId) {
        pCareRepository.deleteById(PCareId);
    }

    @Override
    public Optional<PCare> findById(Long PCareId) {
        return Optional.of(pCareRepository.findById(PCareId).orElseThrow(() -> new RuntimeException("PCare not found")));
    }

    @Override
    public List<PCare> findAll() {
        return pCareRepository.findAll();
    }

    @Override
    public Optional<PCare> findByFactureId(Long FactureId) {
        return Optional.of(pCareRepository.findByIdFacture(FactureId).orElseThrow(() -> new RuntimeException("PCare not found for factureID")));
    }

    @Override
    public List<PCare> findByAppointmentId(Long appointmentId) {
        return pCareRepository.findByAppointmentId(appointmentId);
    }
}
