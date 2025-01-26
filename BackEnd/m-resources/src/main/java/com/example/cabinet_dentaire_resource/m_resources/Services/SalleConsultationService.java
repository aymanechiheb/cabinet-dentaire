package com.example.cabinet_dentaire_resource.m_resources.Services;

import com.example.cabinet_dentaire_resource.m_resources.Dao.MachineDao;
import com.example.cabinet_dentaire_resource.m_resources.Dao.SalleConsultationDao;
import com.example.cabinet_dentaire_resource.m_resources.Dto.SalleConsultationDto;
import com.example.cabinet_dentaire_resource.m_resources.Entities.SalleConsultation;
import com.example.cabinet_dentaire_resource.m_resources.Repositories.SalleConsultationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SalleConsultationService {
    @Autowired
    private SalleConsultationRepository salleConsultationRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Method to get all salles and return SalleConsultationDao objects
    public List<SalleConsultationDao> getAllSalles() {
        List<SalleConsultation> salles = salleConsultationRepository.findAll();
        return salles.stream()
                .map(salle -> {
                    // Map SalleConsultation to SalleConsultationDao
                    SalleConsultationDao salleDao = modelMapper.map(salle, SalleConsultationDao.class);
                    // Set the machines in SalleConsultationDao
                    salleDao.setMachines(salle.getMachines().stream()
                            .map(machine -> modelMapper.map(machine, MachineDao.class))
                            .collect(Collectors.toList()));
                    return salleDao;
                })
                .collect(Collectors.toList());
    }

    public SalleConsultationDao getSalleById(Long id) {
        Optional<SalleConsultation> salle = salleConsultationRepository.findById(id);
        return salle.map(value -> modelMapper.map(value, SalleConsultationDao.class)).orElse(null);
    }

    public SalleConsultation createSalle(SalleConsultationDao salleDao) {
        SalleConsultation salle = modelMapper.map(salleDao, SalleConsultation.class);
        return salleConsultationRepository.save(salle);
    }

    public SalleConsultation updateSalle(Long id, SalleConsultationDao salleDao) {
        // Validate the payload
        if (salleDao == null) {
            throw new RuntimeException("Update payload cannot be null");
        }

        // Fetch the existing SalleConsultation entity from the database
        SalleConsultation salle = salleConsultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salle not found with ID: " + id));

        // Log the existing entity and the update payload
        System.out.println("Existing Salle: " + salle.toString());
        System.out.println("Update Payload: " + salleDao.toString());

        // Manually update the fields
        salle.setNumero(salleDao.getNumero());
        salle.setDisponibilite(salleDao.isDisponibilite());

        // Save the updated entity to the database
        return salleConsultationRepository.save(salle);
    }

    public boolean deleteSalle(Long id) {
        if (!salleConsultationRepository.existsById(id)) {
            return false;
        }
        salleConsultationRepository.deleteById(id);
        return true;
    }
}
