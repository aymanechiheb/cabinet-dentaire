package com.dentilica.Appointment.service.interfaces;

import com.dentilica.Appointment.dto.request.AppointmentRequest;
import com.dentilica.Appointment.dto.response.AppointmentResponse;

import java.util.List;
import java.util.Optional;

public interface AppointmentService {
    AppointmentResponse createAppointment(AppointmentRequest appointmentRequest);
    AppointmentResponse updateAppointment(Long appointmentId, AppointmentRequest appointmentRequest);
    void deleteAppointment(Long appointmentId);
    List<AppointmentResponse> getAllAppointments();
    Optional<AppointmentResponse> getAppointmentById(Long appointmentId);
    List<AppointmentResponse> getAppointmentByUserId(Long UserId);
    List<AppointmentResponse> getAppointmentByPatientId(Long PatientId);
}
