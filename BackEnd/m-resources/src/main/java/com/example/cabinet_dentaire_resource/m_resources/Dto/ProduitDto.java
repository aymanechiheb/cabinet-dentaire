package com.example.cabinet_dentaire_resource.m_resources.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProduitDto {
    private Long id;
    private String nom;
    private Integer quantite;
    private String fournisseur;
    private Double prixUnitaire;
}
