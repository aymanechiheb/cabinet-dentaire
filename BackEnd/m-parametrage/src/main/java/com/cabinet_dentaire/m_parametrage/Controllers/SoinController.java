package com.cabinet_dentaire.m_parametrage.Controllers;

import com.cabinet_dentaire.m_parametrage.Dto.SoinDto;
import com.cabinet_dentaire.m_parametrage.Entities.Soin;
import com.cabinet_dentaire.m_parametrage.Services.SoinService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/soins")
//@CrossOrigin(origins = "http://localhost:5173")
public class SoinController {
    @Autowired
    private SoinService soinService;

    @Autowired
    private ModelMapper modelMapper;

    // Get all soins
    @GetMapping
    public List<SoinDto> getAllSoins() {
        return soinService.getAllSoins();
    }

    // Get soin by ID
    @GetMapping("/{id}")
    public ResponseEntity<SoinDto> getSoinById(@PathVariable Long id) {
        SoinDto soinDto = soinService.getSoinById(id);
        if (soinDto != null) {
            return new ResponseEntity<>(soinDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Create a new soin
    @PostMapping
    public ResponseEntity<SoinDto> createSoin(@RequestBody Soin soin) {
        SoinDto createdSoin = soinService.createSoin(soin);
        return new ResponseEntity<>(createdSoin, HttpStatus.CREATED);
    }

    // Update an existing soin
    @PutMapping("/{id}")
    public ResponseEntity<SoinDto> updateSoin(@PathVariable Long id, @RequestBody Soin soin) {
        SoinDto updatedSoin = soinService.updateSoin(id, soin);
        if (updatedSoin != null) {
            return new ResponseEntity<>(updatedSoin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // Delete a soin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSoin(@PathVariable Long id) {
        if (soinService.deleteSoin(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
