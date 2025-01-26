package com.dentilica.Appointment.controller;


import com.dentilica.Appointment.dto.request.AppointmentRequest;
import com.dentilica.Appointment.dto.response.AppointmentResponse;
import com.dentilica.Appointment.service.impl.AppointmentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")

public class AppointmentController {
    @Autowired
    private AppointmentServiceImpl appointmentService;

//    @GetMapping
//    public ResponseEntity<List<AppointmentResponse>> getAllAppointments(){
//        List<AppointmentResponse> appointments = appointmentService.getAllAppointments();
//        return ResponseEntity.ok(appointments);
//    }
//
//    @PostMapping
//    public ResponseEntity<Void> addAppointment(@RequestBody AppointmentRequest appointmentRequest) {
//        appointmentService.createAppointment(appointmentRequest);
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }

    @PostMapping("/")
    public ResponseEntity<AppointmentResponse> createAppointment(@RequestBody AppointmentRequest appointmentRequest) {
        AppointmentResponse response = appointmentService.createAppointment(appointmentRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Update an existing appointment
    @PutMapping("/{id}")
    public ResponseEntity<AppointmentResponse> updateAppointment(
            @PathVariable("id") Long appointmentId,
            @RequestBody AppointmentRequest appointmentRequest) {
        AppointmentResponse response = appointmentService.updateAppointment(appointmentId, appointmentRequest);
        return ResponseEntity.ok(response);
    }

    // Delete an appointment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable("id") Long appointmentId) {
        appointmentService.deleteAppointment(appointmentId);
        return ResponseEntity.noContent().build();
    }

    // Get all appointments
    @GetMapping ("/")
    public ResponseEntity<List<AppointmentResponse>> getAllAppointments() {
        List<AppointmentResponse> response = appointmentService.getAllAppointments();
        return ResponseEntity.ok(response);
    }
    @GetMapping("/appointmentByUser/{userId}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByUserId(@PathVariable("userId") Long userId) {
        List<AppointmentResponse> responses = appointmentService.getAppointmentByUserId(userId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/appointmentByPatient/{patientId}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByPatientId(@PathVariable("patientId") Long patientId) {
        List<AppointmentResponse> responses = appointmentService.getAppointmentByPatientId(patientId);
        return ResponseEntity.ok(responses);
}
    // Get an appointment by ID
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> getAppointmentById(@PathVariable("id") Long appointmentId) {
        Optional<AppointmentResponse> response = appointmentService.getAppointmentById(appointmentId);
        return response.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

}
