package com.dentilica.Appointment.service.interfaces;

import com.dentilica.Appointment.dto.request.CProductRequest;
import com.dentilica.Appointment.dto.response.CProductResponse;

import java.util.List;
import java.util.Optional;

public interface CProductService {
    CProductResponse createCProduct(CProductRequest cProductRequest);
    CProductResponse updateCProduct(Long CProductId, CProductRequest cProductRequest);
    void delete(Long CProductId);
    List<CProductResponse> findAll();
    Optional<CProductResponse> findById(Long CProductId);
    List<CProductResponse> findCProductByAppointmentId(Long AppointmentId);
}
