package com.cabinet_dentaire.m_patient.Services;

import com.cabinet_dentaire.m_patient.Entities.Document;
import com.cabinet_dentaire.m_patient.Entities.Patient;
import com.cabinet_dentaire.m_patient.Repositories.DocumentRepository;
import com.cabinet_dentaire.m_patient.Repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    private final Path uploadDir = Paths.get("uploads");

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private PatientRepository patientRepository;

    // Ensure the upload directory exists
    public DocumentService() {
        try {
            Files.createDirectories(uploadDir);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize upload directory.", e);
        }
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Optional<Document> getDocumentById(Long id) {
        return documentRepository.findById(id);
    }

    public Document createDocument(Long patientId, MultipartFile file) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        String filePath = saveFile(file);

        Document document = new Document();
        document.setPatient(patient);
        document.setFichier(filePath);

        return documentRepository.save(document);
    }

    private String saveFile(MultipartFile file) {
        try {
            String filename = file.getOriginalFilename();
            Path filePath = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), filePath);
            return filePath.toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file.", e);
        }
    }

    public boolean deleteDocument(Long id) {
        if (documentRepository.existsById(id)) {
            documentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Document> getDocumentsByPatientId(Long patientId) {
        return documentRepository.findByPatientId(patientId);
    }
}
