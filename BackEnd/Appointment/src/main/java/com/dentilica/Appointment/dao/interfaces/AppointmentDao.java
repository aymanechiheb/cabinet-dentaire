package com.dentilica.Appointment.dao.interfaces;

import com.dentilica.Appointment.model.Appointment;

import java.util.List;
import java.util.Optional;

public interface AppointmentDao {
    Appointment save(Appointment appointment);
    void delete(Long appointmentId);
    Optional<Appointment> findById(Long appointmentId);
    List<Appointment> getAllAppointments();
    List<Appointment> getAppointmentByUserId(Long UserId);
    List<Appointment> getAppointmentByPatientId(Long PatientId);

}
