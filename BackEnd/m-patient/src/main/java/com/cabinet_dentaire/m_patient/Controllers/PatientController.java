package com.cabinet_dentaire.m_patient.Controllers;

import com.cabinet_dentaire.m_patient.Dto.PatientDto;
import com.cabinet_dentaire.m_patient.Entities.Patient;
import com.cabinet_dentaire.m_patient.Repositories.PatientRepository;
import com.cabinet_dentaire.m_patient.Services.PatientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.LinkedList;
import java.util.List;

@RestController

@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private ModelMapper modelMapper;

    // Get all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        List<Patient> l = patientService.getAllPatients();
        List<PatientDto> nl = new LinkedList<>();
    return patientService.getAllPatients();

    }

    // Get patient by ID
    @GetMapping("/{id}")
    public ResponseEntity<PatientDto> getPatientById(@PathVariable Long id) {
        PatientDto patientDto = modelMapper.map(patientService.getPatientById(id), PatientDto.class);
        return new ResponseEntity<>(patientDto, HttpStatus.OK);
    }

    // Create a new patient
    @PostMapping
    public ResponseEntity<String> createPatient(@RequestBody Patient patient) {
        try {
            Patient createdPatient = patientService.createPatient(patient);
            return new ResponseEntity<>("Patient created successfully with ID: " + createdPatient.getId(), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }



    // Delete a patient
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        if (patientService.deletePatient(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    // Update an existing patient
    @PutMapping("/{id}")
    public ResponseEntity<String> updatePatient(@PathVariable Long id, @RequestBody Patient updatedPatient) {
        try {
            // Appel au service pour mettre à jour le patient
            Patient patient = patientService.updatePatient(id, updatedPatient);
            return new ResponseEntity<>("Patient updated successfully with ID: " + patient.getId(), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
