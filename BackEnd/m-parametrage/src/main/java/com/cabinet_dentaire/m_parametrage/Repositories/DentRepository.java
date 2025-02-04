package com.cabinet_dentaire.m_parametrage.Repositories;

import com.cabinet_dentaire.m_parametrage.Entities.Dent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DentRepository extends JpaRepository<Dent,Long> {

}
