package com.dentilica.Appointment.service.interfaces;

import com.dentilica.Appointment.dto.request.PCareRequest;
import com.dentilica.Appointment.dto.response.PCareResponse;

import java.util.List;
import java.util.Optional;

public interface PCareService {
    PCareResponse createPCare(PCareRequest pCareRequest);
    PCareResponse updatePCare(Long PCareId, PCareRequest pCareRequest);
    void delete(Long PCareId);
    List<PCareResponse> findAll();
    Optional<PCareResponse> findById(Long PCareId);
    Optional<PCareResponse> findByIdFacture(Long FactureId);
    List<PCareResponse> findByAppointmentId(    Long appointmentId);
}
