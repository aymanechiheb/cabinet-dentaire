package com.dentilica.Appointment.dao.impl;

import com.dentilica.Appointment.dao.interfaces.AppointmentDao;
import com.dentilica.Appointment.model.Appointment;
import com.dentilica.Appointment.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AppointmentDaoImpl implements AppointmentDao {
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Override
    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public void delete(Long appointmentId) {
        appointmentRepository.deleteById(appointmentId);
    }

    @Override
    public Optional<Appointment> findById(Long appointmentId) {
        return Optional.of(appointmentRepository.findById(appointmentId)).orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll(); // No casting needed
    }

    @Override
    public List<Appointment> getAppointmentByUserId(Long UserId) {
        return appointmentRepository.findByIdUser(UserId);
    }

    @Override
    public List<Appointment> getAppointmentByPatientId(Long PatientId) {
        return appointmentRepository.findByIdPatient(PatientId);
}
}
