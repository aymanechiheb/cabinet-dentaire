package com.dentilica.Appointment.dao.impl;

import com.dentilica.Appointment.dao.interfaces.CProductDao;
import com.dentilica.Appointment.model.CProduct;
import com.dentilica.Appointment.repository.CProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CProductImpl implements CProductDao {

    @Autowired
    private CProductRepository cProductRepository;
    @Override
    public CProduct save(CProduct cProduct) {
        return cProductRepository.save(cProduct);
    }

    @Override
    public void delete(Long CProductId) {
        cProductRepository.deleteById(CProductId);
    }

    @Override
    public Optional<CProduct> findById(Long CProductId) {
        return Optional.of(cProductRepository.findById(CProductId)).orElseThrow(() -> new RuntimeException("CProduct not found"));
    }

    @Override
    public List<CProduct> findAll() {
        return cProductRepository.findAll();
    }

    @Override
    public List<CProduct> findCproductByAppointmentId(Long AppointmentId) {
        return cProductRepository.findCProductByAppointmentId(AppointmentId);
}
}
