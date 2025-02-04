package com.dentilica.Appointment.dto.response;

import com.dentilica.Appointment.model.CProduct;
import com.dentilica.Appointment.model.PCare;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {
    private Long id;
    private LocalDateTime startDateTime;

    private String status;
    private String motif;
    private String notes;

    private Long idUser;
    private Long idPatient;
    private List<PCareResponse> cares;
    private List<CProductResponse> cProducts;



}
