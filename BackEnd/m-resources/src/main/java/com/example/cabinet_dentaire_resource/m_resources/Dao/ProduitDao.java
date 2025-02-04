package com.example.cabinet_dentaire_resource.m_resources.Dao;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class ProduitDao {
    private Long id;
    private String nom;
    private Integer quantite;
    private String fournisseur;
    private Double prixUnitaire;
    private LocalDate datePeremption;
}
