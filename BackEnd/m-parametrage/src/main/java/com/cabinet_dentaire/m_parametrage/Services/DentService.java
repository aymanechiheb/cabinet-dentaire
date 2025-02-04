package com.cabinet_dentaire.m_parametrage.Services;

import com.cabinet_dentaire.m_parametrage.Dao.DentDao;
import com.cabinet_dentaire.m_parametrage.Entities.Dent;
import com.cabinet_dentaire.m_parametrage.Repositories.DentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DentService {
    @Autowired
    private DentRepository dentRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Fetch all dents
    public List<Dent> getAllDents() {
        return dentRepository.findAll();
    }

    // Fetch a dent by ID
    public DentDao getDentById(Long id) {
        Optional<Dent> searchedDent = dentRepository.findById(id);
        return searchedDent.isEmpty() ? null : modelMapper.map(searchedDent.get(), DentDao.class);
    }

    // Create a new dent
    public Dent createDent(Dent dent) {
        return dentRepository.save(dent);
    }

    // Update an existing dent
    public Dent updateDent(Long id, Dent updatedDent) {
        Dent existingDent = dentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dent not found with ID: " + id));

        existingDent.setPosition(updatedDent.getPosition());
        existingDent.setCode(updatedDent.getCode());

        return dentRepository.save(existingDent);
    }

    // Delete a dent
    public boolean deleteDent(Long id) {
        if (dentRepository.existsById(id)) {
            dentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

