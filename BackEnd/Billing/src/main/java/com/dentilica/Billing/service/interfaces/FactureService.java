package com.dentilica.Billing.service.interfaces;

import com.dentilica.Billing.dto.request.FactureRequest;
import com.dentilica.Billing.dto.response.FactureResponse;

import java.util.List;
import java.util.Optional;

public interface FactureService {
    FactureResponse createFacture(FactureRequest factureRequest);
    FactureResponse updateFacture(Long factureId, FactureRequest factureRequest);
    void deleteFacture(Long factureId);
    List<FactureResponse> getAllFactures();
    Optional<FactureResponse> findFactureById(Long factureId);
    List<FactureResponse> findByPatientId(Long patientId);
    List<FactureResponse> findByUserId(Long userId);
}
