package com.dentilica.Appointment.repository;

import com.dentilica.Appointment.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByIdUser(Long idUser);
    List<Appointment> findByIdPatient(Long idPatient);
}
