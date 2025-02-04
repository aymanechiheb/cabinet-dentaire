package com.example.cabinet_dentaire_resource.m_resources.Controllers;

import com.example.cabinet_dentaire_resource.m_resources.Dao.SalleConsultationDao;
import com.example.cabinet_dentaire_resource.m_resources.Services.SalleConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salles")
//@CrossOrigin(origins = "http://localhost:5173")
public class SalleConsultationController {

    @Autowired
    private SalleConsultationService salleConsultationService;

    @GetMapping
    public ResponseEntity<List<SalleConsultationDao>> getAllSalles() {
        List<SalleConsultationDao> salles = salleConsultationService.getAllSalles();
        return new ResponseEntity<>(salles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalleConsultationDao> getSalleById(@PathVariable Long id) {
        SalleConsultationDao salle = salleConsultationService.getSalleById(id);
        if (salle != null) {
            return new ResponseEntity<>(salle, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> createSalle(@RequestBody SalleConsultationDao salleDao) {
        try {
            salleConsultationService.createSalle(salleDao);
            return new ResponseEntity<>("Salle created successfully", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Error creating salle: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateSalle(@PathVariable Long id, @RequestBody SalleConsultationDao salleDao) {
        try {
            salleConsultationService.updateSalle(id, salleDao);
            return new ResponseEntity<>("Salle updated successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Error updating salle: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSalle(@PathVariable Long id) {
        try {
            boolean deleted = salleConsultationService.deleteSalle(id);
            if (deleted) {
                return new ResponseEntity<>("Salle deleted successfully", HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>("Salle not found", HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Error deleting salle: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
