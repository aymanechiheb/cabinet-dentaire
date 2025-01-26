package com.example.cabinet_dentaire_resource.m_resources.Repositories;

import com.example.cabinet_dentaire_resource.m_resources.Entities.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProduitRepository extends JpaRepository<Produit,Long> {

}
