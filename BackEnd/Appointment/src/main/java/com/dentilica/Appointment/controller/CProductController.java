package com.dentilica.Appointment.controller;

import com.dentilica.Appointment.dto.request.CProductRequest;
import com.dentilica.Appointment.dto.response.CProductResponse;
import com.dentilica.Appointment.service.interfaces.CProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cproducts")
@CrossOrigin(origins = "http://localhost:5173")

public class CProductController {

    @Autowired
    private CProductService cProductService;

    // Create a new CProduct
    @PostMapping
    public ResponseEntity<CProductResponse> createCProduct(@RequestBody CProductRequest cProductRequest) {
        CProductResponse createdCProduct = cProductService.createCProduct(cProductRequest);
        return new ResponseEntity<>(createdCProduct, HttpStatus.CREATED);
    }

    // Update an existing CProduct
    @PutMapping("/{id}")
    public ResponseEntity<CProductResponse> updateCProduct(
            @PathVariable Long id,
            @RequestBody CProductRequest cProductRequest
    ) {
        CProductResponse updatedCProduct = cProductService.updateCProduct(id, cProductRequest);
        return ResponseEntity.ok(updatedCProduct);
    }

    // Delete a CProduct by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCProduct(@PathVariable Long id) {
        cProductService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Get all CProducts
    @GetMapping
    public ResponseEntity<List<CProductResponse>> getAllCProducts() {
        List<CProductResponse> cProducts = cProductService.findAll();
        return ResponseEntity.ok(cProducts);
    }

    // Get a CProduct by ID
    @GetMapping("/{id}")
    public ResponseEntity<CProductResponse> getCProductById(@PathVariable Long id) {
        return cProductService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/appointment/{AppointmentId}")
    public ResponseEntity<List<CProductResponse>> getAllCProductsByAppointmentId(@PathVariable("AppointmentId") Long AppointmentId) {
        List<CProductResponse> cProducts = cProductService.findCProductByAppointmentId(AppointmentId);
        return ResponseEntity.ok(cProducts);
}
}

