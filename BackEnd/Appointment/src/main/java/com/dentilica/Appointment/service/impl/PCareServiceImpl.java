package com.dentilica.Appointment.service.impl;

import com.dentilica.Appointment.dao.interfaces.AppointmentDao;
import com.dentilica.Appointment.dao.interfaces.PCareDao;
import com.dentilica.Appointment.dto.request.PCareRequest;
import com.dentilica.Appointment.dto.response.PCareResponse;
import com.dentilica.Appointment.model.Appointment;
import com.dentilica.Appointment.model.PCare;
import com.dentilica.Appointment.service.interfaces.PCareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PCareServiceImpl implements PCareService {

    @Autowired
    PCareDao pCareDao;

    @Autowired
    AppointmentDao appointmentDao;

    @Override
    public PCareResponse createPCare(PCareRequest pCareRequest) {
        // Map the PCareRequest to PCare entity
        PCare pCare = mapToEntity(pCareRequest);

        // Save the PCare entity
        PCare savedPCare = pCareDao.save(pCare);

        // Return the mapped response DTO
        return mapToResponseDto(savedPCare);
    }

    @Override
    public PCareResponse updatePCare(Long pCareId, PCareRequest pCareRequest) {
        // Find the existing PCare by ID
        PCare pCare = pCareDao.findById(pCareId)
                .orElseThrow(() -> new RuntimeException("PCare not found"));

        // Update the fields based on the provided request
        if (pCareRequest.getDateTime() != null) {
            pCare.setDateTime(pCareRequest.getDateTime());
        }
        if (pCareRequest.getComment() != null) {
            pCare.setComment(pCareRequest.getComment());
        }
        if (pCareRequest.getIdFacture() != null) {
            pCare.setIdFacture(pCareRequest.getIdFacture());
        }
        if (pCareRequest.getIdSoin() != null) {
            pCare.setIdSoin(pCareRequest.getIdSoin());
        }
        if (pCareRequest.getAppointmentId() != null) {
            Appointment appointment = appointmentDao.findById(pCareRequest.getAppointmentId())
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));
            pCare.setAppointment(appointment);
        }

        // Save the updated PCare entity
        PCare savedPCare = pCareDao.save(pCare);

        // Return the mapped response DTO
        return mapToResponseDto(savedPCare);
    }

    @Override
    public void delete(Long pCareId) {
        // Find the PCare by ID and delete it
        PCare pCare = pCareDao.findById(pCareId)
                .orElseThrow(() -> new RuntimeException("PCare not found"));

        pCareDao.delete(pCareId);
    }

    @Override
    public List<PCareResponse> findAll() {
        // Retrieve all PCare entities and map them to response DTOs
        return pCareDao.findAll().stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PCareResponse> findById(Long pCareId) {
        // Find PCare by ID and map it to a response DTO
        return pCareDao.findById(pCareId)
                .map(this::mapToResponseDto);
    }

    @Override
    public Optional<PCareResponse> findByIdFacture(Long FactureId) {
        return pCareDao.findByFactureId(FactureId)
                .map(this::mapToResponseDto);
    }

    @Override
    public List<PCareResponse> findByAppointmentId(Long appointmentId) {
        return pCareDao.findByAppointmentId(appointmentId).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    // Helper method to map from PCareRequest to PCare entity
    private PCare mapToEntity(PCareRequest dto) {
        PCare pCare = new PCare();

        // Set properties of the PCare entity from the request DTO
        pCare.setDateTime(dto.getDateTime());
        pCare.setComment(dto.getComment());
        pCare.setIdFacture(dto.getIdFacture());
        pCare.setIdSoin(dto.getIdSoin());

        // Find the appointment and set it in the PCare entity
        Appointment appointment = appointmentDao.findById(dto.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        pCare.setAppointment(appointment);

        return pCare;
    }

    // Helper method to map from PCare entity to PCareResponse DTO
    private PCareResponse mapToResponseDto(PCare pCare) {
        PCareResponse dto = new PCareResponse();

        // Set properties of the response DTO from the PCare entity
        dto.setId(pCare.getId());
        dto.setDateTime(pCare.getDateTime());
        dto.setComment(pCare.getComment());
        dto.setIdFacture(pCare.getIdFacture());
        dto.setIdSoin(pCare.getIdSoin());
        dto.setAppointmentId(pCare.getAppointment().getId());

        return dto;
    }
}


