package com.dentilica.Appointment.dto.request;

import com.dentilica.Appointment.model.CProduct;
import com.dentilica.Appointment.model.PCare;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class AppointmentRequest {
    private Long id;
    private LocalDateTime startDateTime;

    private String status;
    private String motif;
    private String notes;

    private Long idUser;
    private Long idPatient;
    private List<PCare> cares;
    private List<CProduct> cProducts;


}
