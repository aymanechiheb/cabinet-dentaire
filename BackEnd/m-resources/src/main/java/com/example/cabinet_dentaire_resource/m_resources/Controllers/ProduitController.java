package com.example.cabinet_dentaire_resource.m_resources.Controllers;

import com.example.cabinet_dentaire_resource.m_resources.Dao.ProduitDao;
import com.example.cabinet_dentaire_resource.m_resources.Dto.ProduitDto;
import com.example.cabinet_dentaire_resource.m_resources.Entities.Produit;
import com.example.cabinet_dentaire_resource.m_resources.Services.ProduitService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
//@CrossOrigin(origins = "http://localhost:5173")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<List<ProduitDto>> getAllProduits() {
        List<ProduitDto> produits = produitService.getAllProduits();
        return new ResponseEntity<>(produits, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProduitDto> getProduitById(@PathVariable Long id) {
        try {
            ProduitDto produit = produitService.getProduitById(id);
            return new ResponseEntity<>(produit, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> createProduit(@RequestBody ProduitDao produitDao) {
        try {
            Produit createdProduit = produitService.createProduit(produitDao);
            return new ResponseEntity<>("Produit created successfully with ID: " + createdProduit.getId(), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Error creating product: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduit(@PathVariable Long id, @RequestBody ProduitDao produitDao) {
        try {
            Produit updatedProduit = produitService.updateProduit(id, produitDao);
            return new ResponseEntity<>("Produit updated successfully with ID: " + updatedProduit.getId(), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduit(@PathVariable Long id) {
        try {
            produitService.deleteProduit(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Product not found: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
