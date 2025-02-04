package com.cabinet_dentaire.m_parametrage.Dao;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SoinDao {
    private Long id;

    private String code;
    private String description;
    private double prix;
}
