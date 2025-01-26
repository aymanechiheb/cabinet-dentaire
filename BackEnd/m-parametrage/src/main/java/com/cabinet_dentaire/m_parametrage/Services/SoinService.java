package com.cabinet_dentaire.m_parametrage.Services;

import com.cabinet_dentaire.m_parametrage.Dto.SoinDto;
import com.cabinet_dentaire.m_parametrage.Entities.Soin;
import com.cabinet_dentaire.m_parametrage.Repositories.SoinRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SoinService {
    @Autowired

    private SoinRepository soinRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Fetch all soins and map to SoinDto
    public List<SoinDto> getAllSoins() {
        List<Soin> soins = soinRepository.findAll();
        return soins.stream()
                .map(soin -> modelMapper.map(soin, SoinDto.class))
                .collect(Collectors.toList());
    }

    // Fetch a soin by ID and map to SoinDto
    public SoinDto getSoinById(Long id) {
        Optional<Soin> soin = soinRepository.findById(id);
        return soin.map(s -> modelMapper.map(s, SoinDto.class)).orElse(null);
    }

    // Create a new soin and return the created SoinDto
    public SoinDto createSoin(Soin soin) {
        Soin createdSoin = soinRepository.save(soin);
        return modelMapper.map(createdSoin, SoinDto.class);
    }

    // Update an existing soin
    public SoinDto updateSoin(Long id, Soin soin) {
        Optional<Soin> existingSoinOpt = soinRepository.findById(id);
        if (existingSoinOpt.isPresent()) {
            Soin existingSoin = existingSoinOpt.get();

            // Update only the fields provided in the request
            if (soin.getCode() != null) {
                existingSoin.setCode(soin.getCode());
            }
            if (soin.getDescription() != null) {
                existingSoin.setDescription(soin.getDescription());
            }
            if (soin.getPrix() != 0) {
                existingSoin.setPrix(soin.getPrix());
            }



            Soin updatedSoin = soinRepository.save(existingSoin);
            return modelMapper.map(updatedSoin, SoinDto.class);
        }
        return null;
    }


    public boolean deleteSoin(Long id) {
        if (soinRepository.existsById(id)) {
            soinRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
