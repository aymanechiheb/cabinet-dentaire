package com.example.cabinet_dentaire_resource.m_resources.Services;

import com.example.cabinet_dentaire_resource.m_resources.Dao.MachineDao;
import com.example.cabinet_dentaire_resource.m_resources.Entities.Machine;
import com.example.cabinet_dentaire_resource.m_resources.Entities.SalleConsultation;
import com.example.cabinet_dentaire_resource.m_resources.Repositories.MachineRepository;
import com.example.cabinet_dentaire_resource.m_resources.Repositories.SalleConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MachineService {
    @Autowired
    private MachineRepository machineRepository;

    @Autowired
    private SalleConsultationRepository salleConsultationRepository;

    public List<MachineDao> getAllMachines() {
        List<Machine> machines = machineRepository.findAll();
        return machines.stream()
                .map(this::convertToMachineDao) // Custom conversion
                .collect(Collectors.toList());
    }

    public MachineDao getMachineById(Long id) {
        Machine machine = machineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Machine not found with ID: " + id));
        return convertToMachineDao(machine);
    }

    private MachineDao convertToMachineDao(Machine machine) {
        MachineDao machineDao = new MachineDao();
        machineDao.setId(machine.getId());
        machineDao.setNom(machine.getNom());
        machineDao.setModel(machine.getModel());
        machineDao.setNumerodeserie(machine.getNumerodeserie());
        machineDao.setEtat(machine.getEtat());


        SalleConsultation salleConsultation = machine.getSalleConsultation();
        if (salleConsultation != null) {
            machineDao.setSalleConsultationCode(salleConsultation.getNumero());
            machineDao.setSalleConsultationId(salleConsultation.getId());
        }
        return machineDao;
    }

    public Machine createMachine(MachineDao machineDao) {
        Machine machine = new Machine();
        machine.setNom(machineDao.getNom());
        machine.setModel(machineDao.getModel());
        machine.setNumerodeserie(machineDao.getNumerodeserie());
        machine.setEtat(machineDao.getEtat());


        // Fetch salleConsultation by ID
        SalleConsultation salleConsultation = salleConsultationRepository.findById(machineDao.getSalleConsultationId())
                .orElseThrow(() -> new RuntimeException("SalleConsultation not found with ID: " + machineDao.getSalleConsultationId()));
        machine.setSalleConsultation(salleConsultation);

        return machineRepository.save(machine);
    }

    public Machine updateMachine(Long id, MachineDao machineDao) {
        Machine existingMachine = machineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Machine not found with ID: " + id));

        existingMachine.setNom(machineDao.getNom());
        existingMachine.setModel(machineDao.getModel());
        existingMachine.setNumerodeserie(machineDao.getNumerodeserie());
        existingMachine.setEtat(machineDao.getEtat());


        // Fetch salleConsultation by ID
        SalleConsultation salleConsultation = salleConsultationRepository.findById(machineDao.getSalleConsultationId())
                .orElseThrow(() -> new RuntimeException("SalleConsultation not found with ID: " + machineDao.getSalleConsultationId()));
        existingMachine.setSalleConsultation(salleConsultation);

        return machineRepository.save(existingMachine);
    }

    public void deleteMachine(Long id) {
        if (!machineRepository.existsById(id)) {
            throw new RuntimeException("Machine not found with ID: " + id);
        }
        machineRepository.deleteById(id);
    }
}
