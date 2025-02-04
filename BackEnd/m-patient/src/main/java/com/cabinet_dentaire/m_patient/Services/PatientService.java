package com.cabinet_dentaire.m_patient.Services;

import com.cabinet_dentaire.m_patient.Dao.PatientDao;
import com.cabinet_dentaire.m_patient.Entities.Patient;
import com.cabinet_dentaire.m_patient.Repositories.PatientRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class PatientService {
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    ModelMapper modelMapper;
    // Fetch all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Fetch a patient by ID
    public PatientDao getPatientById(Long id) {
        Optional<Patient> searchedPatient = patientRepository.findById(id);
        return searchedPatient.isEmpty()?null:modelMapper.map(searchedPatient, PatientDao.class);
    }

    // Create a new patient
    public Patient createPatient(Patient patient) {
        if (patientRepository.existsByEmail(patient.getEmail())) {
            throw new RuntimeException("A patient with this email already exists.");
        }
        if (patientRepository.existsByCin(patient.getCin())) {
            throw new RuntimeException("A patient with this CIN already exists.");
        }
        if (patientRepository.existsByTelephone(patient.getTelephone())) {
            throw new RuntimeException("A patient with this telephone number already exists.");
        }
        if (patientRepository.existsByCnss(patient.getCnss())) {
            throw new RuntimeException("A patient with this CNSS already exists.");
        }
        return patientRepository.save(patient);
    }
    public Patient updatePatient(Long id, Patient updatedPatient) {
        // Vérifie si le patient existe
        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + id));

        // Met à jour les champs nécessaires
        existingPatient.setFullname(updatedPatient.getFullname());
        existingPatient.setDatenaissance(updatedPatient.getDatenaissance());
        existingPatient.setAdresse(updatedPatient.getAdresse());
        existingPatient.setTelephone(updatedPatient.getTelephone());
        existingPatient.setCin(updatedPatient.getCin());
        existingPatient.setEmail(updatedPatient.getEmail());
        existingPatient.setEtatCivil(updatedPatient.getEtatCivil());
        existingPatient.setNombreEnfants(updatedPatient.getNombreEnfants());
        existingPatient.setCnss(updatedPatient.getCnss());

        // Sauvegarde dans la base de données
        return patientRepository.save(existingPatient);
    }



    // Delete a patient by ID
    public boolean deletePatient(Long id) {
        if (patientRepository.existsById(id)) {
            patientRepository.deleteById(id);
            return true;
        }
        return false;
    }


}
