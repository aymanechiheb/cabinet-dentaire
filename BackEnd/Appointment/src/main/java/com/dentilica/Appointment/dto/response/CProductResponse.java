package com.dentilica.Appointment.dto.response;

import com.dentilica.Appointment.model.Appointment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CProductResponse {
    private Long id;
    private Long idProduct;
    private Long appointmentId;
    private Long Qte;
}
