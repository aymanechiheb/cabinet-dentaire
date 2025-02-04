package com.dentilica.Billing.controller;

import com.dentilica.Billing.dto.request.FactureRequest;
import com.dentilica.Billing.dto.response.FactureResponse;
import com.dentilica.Billing.service.impl.FactureServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/factures")
public class FactureController {

    @Autowired
    private FactureServiceImpl factureService;

    @PostMapping
    public ResponseEntity<FactureResponse> createFacture(@RequestBody FactureRequest factureRequest) {
        FactureResponse factureResponse = factureService.createFacture(factureRequest);
        return new ResponseEntity<>(factureResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{factureId}")
    public ResponseEntity<FactureResponse> updateFacture(
            @PathVariable Long factureId,
            @RequestBody FactureRequest factureRequest) {
        FactureResponse factureResponse = factureService.updateFacture(factureId, factureRequest);
        return new ResponseEntity<>(factureResponse, HttpStatus.OK);
    }

    @DeleteMapping("/{factureId}")
    public ResponseEntity<Void> deleteFacture(@PathVariable Long factureId) {
        factureService.deleteFacture(factureId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<FactureResponse>> getAllFactures() {
        List<FactureResponse> factures = factureService.getAllFactures();
        return new ResponseEntity<>(factures, HttpStatus.OK);
    }

    @GetMapping("/{factureId}")
    public ResponseEntity<FactureResponse> findFactureById(@PathVariable Long factureId) {
        FactureResponse factureResponse = factureService.findFactureById(factureId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Facture not found"));
        return new ResponseEntity<>(factureResponse, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FactureResponse>> findByUserId(@PathVariable Long userId) {
        List<FactureResponse> factures = factureService.findByUserId(userId);
        return new ResponseEntity<>(factures, HttpStatus.OK);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<FactureResponse>> findByPatientId(@PathVariable Long patientId) {
        List<FactureResponse> factures = factureService.findByPatientId(patientId);
        return new ResponseEntity<>(factures, HttpStatus.OK);
    }
}
