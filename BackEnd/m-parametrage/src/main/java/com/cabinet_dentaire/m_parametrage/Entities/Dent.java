package com.cabinet_dentaire.m_parametrage.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Dent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String Position;
    private String code;



}
