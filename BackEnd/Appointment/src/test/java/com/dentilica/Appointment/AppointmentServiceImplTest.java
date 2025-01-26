package com.dentilica.Appointment;

import com.dentilica.Appointment.dao.interfaces.AppointmentDao;
import com.dentilica.Appointment.dto.request.AppointmentRequest;
import com.dentilica.Appointment.dto.response.AppointmentResponse;
import com.dentilica.Appointment.model.Appointment;
import com.dentilica.Appointment.service.impl.AppointmentServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AppointmentServiceImplTest {

    @Mock
    private AppointmentDao appointmentDao;

    @InjectMocks
    private AppointmentServiceImpl appointmentService;

    @Test
    void testCreateAppointment() {
        // Arrange
        AppointmentRequest request = new AppointmentRequest();
        request.setStartDateTime(LocalDateTime.parse("2025-01-14T10:00:00"));
        request.setIdUser(1L);
        request.setIdPatient(2L);

        Appointment appointment = new Appointment();
        appointment.setId(1L);
        appointment.setStartDateTime(LocalDateTime.parse("2025-01-14T10:00:00"));
        appointment.setIdUser(1L);
        appointment.setIdPatient(2L);

        when(appointmentDao.save(any(Appointment.class))).thenReturn(appointment);

        // Act
        AppointmentResponse response = appointmentService.createAppointment(request);

        // Assert
        assertNotNull(response);
        assertEquals(1L, response.getId());

        // Format the date-time to match the expected string
        String expectedDateTime = "2025-01-14T10:00:00";
        String actualDateTime = response.getStartDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"));
        assertEquals(expectedDateTime, actualDateTime);
    }

}

