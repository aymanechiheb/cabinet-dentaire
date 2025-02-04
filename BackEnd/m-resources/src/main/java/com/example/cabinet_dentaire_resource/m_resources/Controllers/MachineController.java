package com.example.cabinet_dentaire_resource.m_resources.Controllers;

import com.example.cabinet_dentaire_resource.m_resources.Dao.MachineDao;
import com.example.cabinet_dentaire_resource.m_resources.Services.MachineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/machines")
//@CrossOrigin(origins = "http://localhost:5173")
public class MachineController {

    @Autowired
    private MachineService machineService;

    @GetMapping
    public ResponseEntity<List<MachineDao>> getAllMachines() {
        List<MachineDao> machines = machineService.getAllMachines();
        return new ResponseEntity<>(machines, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MachineDao> getMachineById(@PathVariable Long id) {
        try {
            MachineDao machine = machineService.getMachineById(id);
            return new ResponseEntity<>(machine, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> createMachine(@RequestBody MachineDao machineDao) {
        try {
            machineService.createMachine(machineDao);
            return new ResponseEntity<>("Machine created successfully", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Error creating machine: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateMachine(@PathVariable Long id, @RequestBody MachineDao machineDao) {
        try {
            machineService.updateMachine(id, machineDao);
            return new ResponseEntity<>("Machine updated successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMachine(@PathVariable Long id) {
        try {
            machineService.deleteMachine(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Machine not found: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
