package com.example.cabinet_dentaire_resource.m_resources.Services;

import com.example.cabinet_dentaire_resource.m_resources.Dao.ProduitDao;
import com.example.cabinet_dentaire_resource.m_resources.Dto.ProduitDto;
import com.example.cabinet_dentaire_resource.m_resources.Entities.Produit;
import com.example.cabinet_dentaire_resource.m_resources.Repositories.ProduitRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProduitService {
    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Get all products
    public List<ProduitDto> getAllProduits() {
        List<Produit> produits = produitRepository.findAll();
        return produits.stream()
                .map(produit -> modelMapper.map(produit, ProduitDto.class))
                .collect(Collectors.toList());
    }

    // Get product by ID
    public ProduitDto getProduitById(Long id) {
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit not found with ID: " + id));
        return modelMapper.map(produit, ProduitDto.class);
    }

    // Create product
    public Produit createProduit(ProduitDao produitDao) {
        Produit produit = modelMapper.map(produitDao, Produit.class);
        return produitRepository.save(produit);
    }

    // Update product
    public Produit updateProduit(Long id, ProduitDao produitDao) {
        Produit existingProduit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit not found with ID: " + id));

        // Map updated data from ProduitDao to existingProduit
        modelMapper.map(produitDao, existingProduit);
        return produitRepository.save(existingProduit);
    }

    // Delete product
    public void deleteProduit(Long id) {
        if (!produitRepository.existsById(id)) {
            throw new RuntimeException("Produit not found with ID: " + id);
        }
        produitRepository.deleteById(id);
    }
}
