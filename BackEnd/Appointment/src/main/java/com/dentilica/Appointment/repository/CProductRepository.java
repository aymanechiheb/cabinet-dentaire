package com.dentilica.Appointment.repository;

import com.dentilica.Appointment.model.CProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CProductRepository extends JpaRepository<CProduct, Long> {
    List<CProduct> findCProductByAppointmentId(Long appointmentId);
}
