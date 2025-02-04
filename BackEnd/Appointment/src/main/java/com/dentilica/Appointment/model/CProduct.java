package com.dentilica.Appointment.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idProduct;

//    private Long idAppointment;
    @ManyToOne
    @JoinColumn(name = "appointmentId", nullable = false)
    private Appointment appointment;


    private Long Qte;
}
