package com.dentilica.Billing.service.impl;

import com.dentilica.Billing.dao.interfaces.FactureDao;
import com.dentilica.Billing.dto.request.FactureRequest;
import com.dentilica.Billing.dto.response.FactureResponse;
import com.dentilica.Billing.model.Facture;
import com.dentilica.Billing.service.interfaces.FactureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FactureServiceImpl implements FactureService {

    @Autowired
    private FactureDao factureDao;

    @Override
    public FactureResponse createFacture(FactureRequest factureRequest) {
        // Map the FactureRequest to the Facture entity
        Facture facture = mapToEntity(factureRequest);

        // Save the Facture entity
        Facture savedFacture = factureDao.save(facture);

        // Return the mapped response DTO
        return mapToResponseDto(savedFacture);
    }

    @Override
    public FactureResponse updateFacture(Long factureId, FactureRequest factureRequest) {
        // Find the existing Facture by ID
        Facture facture = factureDao.findById(factureId)
                .orElseThrow(() -> new RuntimeException("Facture not found"));

        // Update the fields based on the provided request
        if (factureRequest.getDate() != null) {
            facture.setDate(factureRequest.getDate());
        }
        if (factureRequest.getAmount() != null) {
            facture.setAmount(factureRequest.getAmount());
        }
        if (factureRequest.getStatus() != null) {
            facture.setStatus(factureRequest.getStatus());
        }
        if (factureRequest.getPaymentMethod() != null) {
            facture.setPaymentMethod(factureRequest.getPaymentMethod());
        }
        if (factureRequest.getDueDate() != null) {
            facture.setDueDate(factureRequest.getDueDate());
        }
        if (factureRequest.getNumFacture() != null) {
            facture.setNumFacture(factureRequest.getNumFacture());
        }

        // Save the updated Facture entity
        Facture savedFacture = factureDao.save(facture);

        // Return the mapped response DTO
        return mapToResponseDto(savedFacture);
    }

    @Override
    public void deleteFacture(Long factureId) {
        // Find the Facture by ID and delete it
        Facture facture = factureDao.findById(factureId)
                .orElseThrow(() -> new RuntimeException("Facture not found"));
        factureDao.delete(factureId);
    }

    @Override
    public List<FactureResponse> getAllFactures() {
        // Retrieve all Facture entities and map them to response DTOs
        return factureDao.findAll().stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<FactureResponse> findFactureById(Long factureId) {
        // Find Facture by ID and map it to a response DTO
        return factureDao.findById(factureId)
                .map(this::mapToResponseDto);
    }

    @Override
    public List<FactureResponse> findByPatientId(Long patientId) {
        return factureDao.findByPatientId(patientId)
                .stream().map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<FactureResponse> findByUserId(Long userId) {
        return factureDao.findByUserId(userId)
                .stream().map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    // Helper method to map from FactureRequest to Facture entity
    private Facture mapToEntity(FactureRequest dto) {
        Facture facture = new Facture();

        // Set properties of the Facture entity from the request DTO
        facture.setDate(dto.getDate());
        facture.setAmount(dto.getAmount());
        facture.setStatus(dto.getStatus());
        facture.setUserId(dto.getUserId());
        facture.setPatientId(dto.getPatientId());
        facture.setPaymentMethod(dto.getPaymentMethod());
        facture.setDueDate(dto.getDueDate());
        facture.setNumFacture(dto.getNumFacture());

        return facture;
    }

    // Helper method to map from Facture entity to FactureResponse DTO
    private FactureResponse mapToResponseDto(Facture facture) {
        FactureResponse dto = new FactureResponse();

        // Set properties of the response DTO from the Facture entity
        dto.setId(facture.getId());
        dto.setDate(facture.getDate());
        dto.setAmount(facture.getAmount());
        dto.setUserId(facture.getUserId());
        dto.setPatientId(facture.getPatientId());
        dto.setStatus(facture.getStatus());
        dto.setPaymentMethod(facture.getPaymentMethod());
        dto.setDueDate(facture.getDueDate());
        dto.setNumFacture(facture.getNumFacture());

        return dto;
    }
}

