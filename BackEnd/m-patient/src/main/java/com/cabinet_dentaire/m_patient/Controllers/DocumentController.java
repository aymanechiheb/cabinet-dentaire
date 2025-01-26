package com.cabinet_dentaire.m_patient.Controllers;

import com.cabinet_dentaire.m_patient.Dto.DocumentDto;
import com.cabinet_dentaire.m_patient.Entities.Document;
import com.cabinet_dentaire.m_patient.Services.DocumentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public List<DocumentDto> getAllDocuments() {
        List<Document> documents = documentService.getAllDocuments();
        List<DocumentDto> documentDtos = new LinkedList<>();
        for (Document document : documents) {
            DocumentDto documentDto = modelMapper.map(document, DocumentDto.class);
            documentDto.setFileUrl("/uploads/" + Paths.get(document.getFichier()).getFileName()); // Set file URL
            if (document.getPatient() != null) {
                documentDto.setPatientName(document.getPatient().getFullname());
            }
            documentDtos.add(documentDto);
        }
        return documentDtos;
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentDto> getDocumentById(@PathVariable Long id) {
        return documentService.getDocumentById(id)
                .map(document -> {
                    DocumentDto documentDto = modelMapper.map(document, DocumentDto.class);
                    documentDto.setFileUrl("/uploads/" + Paths.get(document.getFichier()).getFileName());
                    return new ResponseEntity<>(documentDto, HttpStatus.OK);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DocumentDto> createDocument(
            @RequestParam("patientId") Long patientId,
            @RequestParam("file") MultipartFile file) {

        Document document = documentService.createDocument(patientId, file);
        DocumentDto documentDto = modelMapper.map(document, DocumentDto.class);
        documentDto.setFileUrl("/uploads/" + Paths.get(document.getFichier()).getFileName());
        return new ResponseEntity<>(documentDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        if (documentService.deleteDocument(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<DocumentDto>> getDocumentsByPatientId(@PathVariable Long patientId) {
        List<Document> documents = documentService.getDocumentsByPatientId(patientId);

        if (documents.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<DocumentDto> documentDtos = new LinkedList<>();
        for (Document document : documents) {
            DocumentDto documentDto = new DocumentDto();
            documentDto.setId(document.getId());
            documentDto.setFileUrl("/uploads/" + Paths.get(document.getFichier()).getFileName()); // Set file URL

            if (document.getPatient() != null) {
                documentDto.setPatientName(document.getPatient().getFullname());
            }

            documentDtos.add(documentDto);
        }

        return new ResponseEntity<>(documentDtos, HttpStatus.OK);
    }

    @GetMapping("/download/{documentId}")
    public ResponseEntity<InputStreamResource> downloadDocument(@PathVariable Long documentId) {
        Document document = documentService.getDocumentById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        Path filePath = Paths.get(document.getFichier());
        if (Files.exists(filePath)) {
            try {
                InputStreamResource resource = new InputStreamResource(Files.newInputStream(filePath));

                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filePath.getFileName());
                headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

                return ResponseEntity.ok()
                        .headers(headers)
                        .contentLength(Files.size(filePath))
                        .body(resource);
            } catch (IOException e) {
                throw new RuntimeException("Error reading file: " + e.getMessage(), e);
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}