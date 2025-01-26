package com.dentilica.Appointment.repository;

import com.dentilica.Appointment.model.PCare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PCareRepository extends JpaRepository<PCare, Long> {

    Optional<PCare> findByIdFacture(Long idFacture);

    List<PCare> findByAppointmentId(Long appointmentId);
}
