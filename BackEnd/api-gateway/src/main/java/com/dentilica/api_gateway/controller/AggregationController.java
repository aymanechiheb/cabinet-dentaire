package com.dentilica.api_gateway.controller;

import com.dentilica.api_gateway.dto.AppointmentResponse;
import com.dentilica.api_gateway.dto.FactureResponse;
import com.dentilica.api_gateway.dto.PCareResponse;
import com.dentilica.api_gateway.dto.PatientResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/aggregation")
public class AggregationController {

    private final RestTemplate restTemplate;

    public AggregationController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/facture/{factureId}")
    public ResponseEntity<?> getFactureWithDetails(@PathVariable Long factureId) {

            // Step 1: Get Facture
            String factureServiceUrl = "http://Billing/api/factures/" + factureId;
            FactureResponse facture = restTemplate.getForObject(factureServiceUrl, FactureResponse.class);

            // Step 2: Get PCare using idFacture
            String pCareServiceUrl = "http://Appointment/api/pcare/search-by-facture/" + factureId;
            PCareResponse pCare = restTemplate.getForObject(pCareServiceUrl, PCareResponse.class);

            // Step 3: Get Appointment using appointmentId from PCare
            String appointmentServiceUrl = "http://Appointment/api/appointments/" + pCare.getAppointmentId();
            AppointmentResponse appointment = restTemplate.getForObject(appointmentServiceUrl, AppointmentResponse.class);

            // Step 4: Get Patient using idPatient from Appointment
            String patientServiceUrl = "http://m-patient/api/patients/" + appointment.getPatientId();
            PatientResponse patient = restTemplate.getForObject(patientServiceUrl, PatientResponse.class);

            // Aggregate data into response
            Map<String, Object> response = new HashMap<>();
            response.put("facture", facture);
            response.put("pCare", pCare);
            response.put("appointment", appointment);
            response.put("patient", patient);

            return ResponseEntity.ok(response);


    }
}

