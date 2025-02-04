package com.dentilica.Billing.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FactureResponse {
    private Long id;


    private LocalDateTime date;

    private Long amount;

    private String status;

    private String paymentMethod;

    private LocalDateTime dueDate;

    private String numFacture;

    private Long patientId;

    private Long userId;
}
