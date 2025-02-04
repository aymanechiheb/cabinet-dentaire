package com.example.cabinet_dentaire_resource.m_resources.Dao;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SalleConsultationDao {

    private Long id;
    private String numero;
    private boolean disponibilite;
    private List<MachineDao> machines;
}
