package com.dentilica.Appointment.service.impl;

import com.dentilica.Appointment.dao.interfaces.AppointmentDao;
import com.dentilica.Appointment.dto.request.AppointmentRequest;
import com.dentilica.Appointment.dto.response.AppointmentResponse;
import com.dentilica.Appointment.dto.response.CProductResponse;
import com.dentilica.Appointment.dto.response.PCareResponse;
import com.dentilica.Appointment.model.Appointment;
import com.dentilica.Appointment.model.CProduct;
import com.dentilica.Appointment.model.PCare;
import com.dentilica.Appointment.service.interfaces.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentDao appointmentDao;
    @Override
    public AppointmentResponse createAppointment(AppointmentRequest appointmentRequest) {
        Appointment appointment = mapToEntity(appointmentRequest);
        Appointment savedAppointent = appointmentDao.save(appointment);
        return mapToResponseDto(savedAppointent);

    }

    @Override
    public AppointmentResponse updateAppointment(Long appointmentId, AppointmentRequest appointmentRequest) {
        Appointment appointment = appointmentDao.findById(appointmentId).orElseThrow(() -> new RuntimeException("Appointment not found"));
        if(appointmentRequest.getMotif() != null){
            appointment.setMotif(appointmentRequest.getMotif());
        }
        if (appointmentRequest.getNotes() != null) {
            appointment.setNotes(appointmentRequest.getNotes());
        }
        if (appointmentRequest.getStatus() != null) {
            appointment.setStatus(appointmentRequest.getStatus());
        }
        if (appointmentRequest.getStartDateTime() != null) {
            appointment.setStartDateTime(appointmentRequest.getStartDateTime());
        }
        if (appointmentRequest.getIdUser() != null) {
            appointment.setIdUser(appointmentRequest.getIdUser());
        }
        if (appointmentRequest.getIdPatient() != null) {
            appointment.setIdPatient(appointmentRequest.getIdPatient());
        }
        Appointment savedAppointment = appointmentDao.save(appointment);
        return mapToResponseDto(appointment);


    }

    @Override
    public void deleteAppointment(Long appointmentId) {
        Appointment appointment = appointmentDao.findById(appointmentId).orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointmentDao.delete(appointmentId);



    }
    @Override
    public List<AppointmentResponse> getAppointmentByUserId(Long UserId) {
        return appointmentDao.getAppointmentByUserId(UserId).stream().map(this::mapToResponseDto).collect(Collectors.toList());

    }

    @Override
    public List<AppointmentResponse> getAppointmentByPatientId(Long PatientId) {
        return appointmentDao.getAppointmentByPatientId(PatientId).stream().map(this::mapToResponseDto).collect(Collectors.toList());
}

    @Override
    public List<AppointmentResponse> getAllAppointments() {
        return appointmentDao.getAllAppointments().stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    @Override
    public Optional<AppointmentResponse> getAppointmentById(Long appointmentId) {
        Appointment appointment = appointmentDao.findById(appointmentId).orElseThrow(() -> new RuntimeException("Appointment not found"));
        return Optional.of(mapToResponseDto(appointment));
    }


    private Appointment mapToEntity(AppointmentRequest dto){
        Appointment appointment = new Appointment();

        appointment.setStartDateTime(dto.getStartDateTime());

        appointment.setMotif(dto.getMotif());
        appointment.setNotes(dto.getNotes());
        appointment.setStatus(dto.getStatus());
        appointment.setIdPatient(dto.getIdPatient());


        appointment.setIdUser(dto.getIdUser());

        return appointment;
    }

    private AppointmentResponse mapToResponseDto(Appointment appointment){
        AppointmentResponse dto = new AppointmentResponse();

        dto.setId(appointment.getId());
        dto.setStartDateTime(appointment.getStartDateTime());

        dto.setMotif(appointment.getMotif());
        dto.setNotes(appointment.getNotes());
        dto.setStatus(appointment.getStatus());
        dto.setIdPatient(appointment.getIdPatient());
        dto.setIdUser(appointment.getIdUser());
        // Map the list of CProducts
        List<CProductResponse> CProductDtos = (appointment.getCProducts() != null ? appointment.getCProducts() : new ArrayList<>())
                .stream()
                .map(cProduct -> mapToCProductDto((CProduct) cProduct))  // Explicit lambda
                .toList();
        dto.setCProducts(CProductDtos);

        // Map the list of PCares
        List<PCareResponse> PCareDtos = (appointment.getCares() != null ? appointment.getCares() : new ArrayList<>())
                .stream()
                .map(pCare -> mapToPCareResponseDto((PCare) pCare))  // Explicit lambda
                .toList();
        dto.setCares(PCareDtos);


        return dto;


    }

    private CProductResponse mapToCProductDto(CProduct cProduct){
        CProductResponse dto = new CProductResponse();

        dto.setId(cProduct.getId());
        dto.setIdProduct(cProduct.getIdProduct());
        dto.setAppointmentId(cProduct.getAppointment().getId());
        dto.setQte(cProduct.getQte());

        return dto;
    }

    private PCareResponse mapToPCareResponseDto(PCare pCare){
        PCareResponse dto = new PCareResponse();
        dto.setId(pCare.getId());
        dto.setAppointmentId(pCare.getAppointment().getId());
        dto.setComment(pCare.getComment());
        dto.setIdSoin(pCare.getIdSoin());
        dto.setIdFacture(pCare.getIdFacture());
        dto.setDateTime(pCare.getDateTime());

        return dto;
    }
}
