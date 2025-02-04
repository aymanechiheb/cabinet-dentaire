package com.dentilica.Appointment.controller;

import com.dentilica.Appointment.dto.request.PCareRequest;
import com.dentilica.Appointment.dto.response.PCareResponse;
import com.dentilica.Appointment.service.interfaces.PCareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pcare/")
@CrossOrigin(origins = "http://localhost:5173")
public class PCareController {

    @Autowired
    private PCareService pCareService;

    // Create a new PCare entry
    @PostMapping
    public ResponseEntity<PCareResponse> createPCare(@RequestBody PCareRequest pCareRequest) {
        PCareResponse pCareResponse = pCareService.createPCare(pCareRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(pCareResponse);
    }

    // Update an existing PCare entry
    @PutMapping("{id}")
    public ResponseEntity<PCareResponse> updatePCare(
            @PathVariable("id") Long pCareId,
            @RequestBody PCareRequest pCareRequest) {
        PCareResponse pCareResponse = pCareService.updatePCare(pCareId, pCareRequest);
        return ResponseEntity.ok(pCareResponse);
    }

    // Delete a PCare entry by ID
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletePCare(@PathVariable("id") Long pCareId) {
        pCareService.delete(pCareId);
        return ResponseEntity.noContent().build();
    }

    // Get all PCare entries
    @GetMapping
    public ResponseEntity<List<PCareResponse>> getAllPCares() {
        List<PCareResponse> pCareResponses = pCareService.findAll();
        return ResponseEntity.ok(pCareResponses);
    }

    // Get a PCare entry by ID
    @GetMapping("{id}")
    public ResponseEntity<PCareResponse> getPCareById(@PathVariable("id") Long pCareId) {
        Optional<PCareResponse> pCareResponse = pCareService.findById(pCareId);
        return pCareResponse.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("search-by-facture/{factureId}")
    public ResponseEntity<PCareResponse> getPCareByFacture(@PathVariable Long factureId) {
        Optional<PCareResponse> pCareResponse = pCareService.findByIdFacture(factureId);
        return pCareResponse.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @GetMapping (("appointment/{appointmentId}"))
    public ResponseEntity<List<PCareResponse>> getPcareByAppoitmentId(@PathVariable Long appointmentId) {
        List<PCareResponse> pCareResponses = pCareService.findByAppointmentId(appointmentId);
        return ResponseEntity.ok(pCareResponses);
    }
}
