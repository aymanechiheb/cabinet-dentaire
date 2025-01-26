package com.dentilica.Appointment.dao.interfaces;

import com.dentilica.Appointment.model.PCare;

import java.util.List;
import java.util.Optional;

public interface PCareDao {
    PCare save(PCare pCare);
    void delete(Long PCareId);
    Optional<PCare> findById(Long PCareId);
    List<PCare> findAll();
    Optional<PCare> findByFactureId(Long FactureId);
    List<PCare> findByAppointmentId(Long appointmentId );
}
