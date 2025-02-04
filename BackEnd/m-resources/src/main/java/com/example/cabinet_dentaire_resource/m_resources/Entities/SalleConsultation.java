package com.example.cabinet_dentaire_resource.m_resources.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SalleConsultation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String numero;
    private boolean disponibilite;

    @OneToMany(mappedBy = "salleConsultation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Machine> machines; // A list of machines in the salle
}
