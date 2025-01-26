package com.dentilica.Appointment.service.impl;

import com.dentilica.Appointment.dao.interfaces.AppointmentDao;
import com.dentilica.Appointment.dao.interfaces.CProductDao;
import com.dentilica.Appointment.dto.request.CProductRequest;
import com.dentilica.Appointment.dto.response.CProductResponse;
import com.dentilica.Appointment.model.Appointment;
import com.dentilica.Appointment.model.CProduct;
import com.dentilica.Appointment.service.interfaces.CProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CProductServiceImpl implements CProductService {

    @Autowired
    CProductDao cProductDao;

    @Autowired
    AppointmentDao appointmentDao;
    @Override
    public CProductResponse createCProduct(CProductRequest cProductRequest) {
        CProduct cProduct = mapToEntity(cProductRequest);
        CProduct savedProduct = cProductDao.save(cProduct);
        return mapToResponseDto(savedProduct);
    }

    @Override
    public CProductResponse updateCProduct(Long CProductId, CProductRequest cProductRequest) {
        CProduct cProduct = cProductDao.findById(CProductId).orElseThrow(() -> new RuntimeException("CProduct not found"));
        if (cProductRequest.getQte() != null){
            cProduct.setQte(cProductRequest.getQte());
        }
        if (cProductRequest.getIdProduct() != null){
            cProduct.setIdProduct(cProductRequest.getIdProduct());
        }

        if (cProductRequest.getAppointmentId() != null) {
            Appointment appointment = appointmentDao.findById(cProductRequest.getAppointmentId())
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));
            cProduct.setAppointment(appointment);
        }



        CProduct savedCPrdouct = cProductDao.save(cProduct);
        return mapToResponseDto(savedCPrdouct);


    }

    @Override
    public void delete(Long CProductId) {
        CProduct cProduct = cProductDao.findById(CProductId).orElseThrow(() -> new RuntimeException("CProduct not found"));

        cProductDao.delete(CProductId);
    }

    @Override
    public List<CProductResponse> findAll() {
        return cProductDao.findAll().stream().map(this::mapToResponseDto).collect(Collectors.toList());    }

    @Override
    public Optional<CProductResponse> findById(Long CProductId) {
        return cProductDao.findById(CProductId)
                .map(this::mapToResponseDto);
    }

    private CProduct mapToEntity(CProductRequest dto){
        CProduct cProduct = new CProduct();

        cProduct.setIdProduct(dto.getIdProduct());
        Appointment appointment = appointmentDao.findById(dto.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        cProduct.setAppointment(appointment);
        cProduct.setQte(dto.getQte());

        return cProduct;
    }

    private CProductResponse mapToResponseDto(CProduct cProduct){
        CProductResponse dto = new CProductResponse();

        dto.setId(cProduct.getId());
        dto.setIdProduct(cProduct.getId());
        dto.setAppointmentId(cProduct.getAppointment().getId());
        dto.setQte(cProduct.getQte());

        return dto;
    }
    @Override
    public List<CProductResponse> findCProductByAppointmentId(Long AppointmentId) {
        return cProductDao.findCproductByAppointmentId(AppointmentId).stream().map(this::mapToResponseDto).collect(Collectors.toList());
}}
