package com.cabinet_dentaire.m_parametrage.Controllers;

import com.cabinet_dentaire.m_parametrage.Dao.DentDao;
import com.cabinet_dentaire.m_parametrage.Dto.DentDto;
import com.cabinet_dentaire.m_parametrage.Entities.Dent;
import com.cabinet_dentaire.m_parametrage.Services.DentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dents")
//@CrossOrigin(origins = "http://localhost:5173")
public class DentController {
    @Autowired
    private DentService dentService;

    @Autowired
    private ModelMapper modelMapper;

    // Get all dents
    @GetMapping
    public List<Dent> getAllDents() {
        return dentService.getAllDents();
    }

    // Get dent by ID
    @GetMapping("/{id}")
    public ResponseEntity<DentDto> getDentById(@PathVariable Long id) {
        DentDao dentDao = dentService.getDentById(id);
        if (dentDao != null) {
            DentDto dentDto = modelMapper.map(dentDao, DentDto.class);
            return new ResponseEntity<>(dentDto, HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }

    // Create a new dent
    @PostMapping
    public ResponseEntity<String> createDent(@RequestBody Dent dent) {
        try {
            Dent createdDent = dentService.createDent(dent);
            return new ResponseEntity<>("Dent created successfully with ID: " + createdDent.getId(), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update an existing dent
    @PutMapping("/{id}")
    public ResponseEntity<String> updateDent(@PathVariable Long id, @RequestBody Dent updatedDent) {
        try {
            Dent dent = dentService.updateDent(id, updatedDent);
            return new ResponseEntity<>("Dent updated successfully with ID: " + dent.getId(), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Delete a dent
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDent(@PathVariable Long id) {
        if (dentService.deleteDent(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
