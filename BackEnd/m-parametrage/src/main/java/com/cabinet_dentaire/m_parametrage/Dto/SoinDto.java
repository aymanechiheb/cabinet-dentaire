package com.cabinet_dentaire.m_parametrage.Dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SoinDto {

    private Long id;

    private String code;
    private String description;
    private double prix;
}
