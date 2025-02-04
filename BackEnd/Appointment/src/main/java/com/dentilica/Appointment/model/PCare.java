package com.dentilica.Appointment.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PCare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime dateTime;

    private String comment;

    private Long idFacture;

    //idSoin
    private Long idSoin;
    //idRDV
    @ManyToOne
    @JoinColumn(name = "appointmentId", nullable = false)
    private Appointment appointment;
}
