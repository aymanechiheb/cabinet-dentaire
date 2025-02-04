package com.dentilica.Appointment.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime startDateTime;



    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String motif;

    @Column(nullable = false)
    private String notes;



    private Long idUser;

    private Long idPatient;

    //List "soin effectue" PCare
    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PCare> cares;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CProduct> cProducts;

    //ID produit rdv -> foreign key from productRDV

    //    public LocalDateTime getEndDateTime() {
//        return endDateTime;
//    }
//
//    public void setEndDateTime(LocalDateTime endDateTime) {
//        this.endDateTime = endDateTime;
//    }

    //    public Long getIdConsultationRoom() {
//        return idConsultationRoom;
//    }
//
//    public void setIdConsultationRoom(Long idConsultationRoom) {
//        this.idConsultationRoom = idConsultationRoom;
//    }

    //    private Long idConsultationRoom; each doctor has his own room

//    @Column(nullable = true)
//    private LocalDateTime endDateTime;



}
