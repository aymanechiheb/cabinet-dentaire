package com.dentilica.Billing.dto.request;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FactureRequest {

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
