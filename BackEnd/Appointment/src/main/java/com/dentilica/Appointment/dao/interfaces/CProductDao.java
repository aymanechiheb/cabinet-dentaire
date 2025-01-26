package com.dentilica.Appointment.dao.interfaces;

import com.dentilica.Appointment.model.CProduct;

import java.util.List;
import java.util.Optional;

public interface CProductDao {
    CProduct save(CProduct cProduct);
    void delete(Long CProductId);
    Optional <CProduct> findById(Long CProductId);
    List<CProduct> findAll();
    List<CProduct> findCproductByAppointmentId(Long AppointmentId);

}
