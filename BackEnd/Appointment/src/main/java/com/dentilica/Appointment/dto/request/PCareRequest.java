package com.dentilica.Appointment.dto.request;

import com.dentilica.Appointment.model.Appointment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PCareRequest {
    private Long id;
    private LocalDateTime dateTime;
    private String comment;
    private Long idFacture;
    private Long idSoin;
    private Long appointmentId;

}
