package com.safepi.safepi.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.safepi.safepi.Entities.Enums.WorkStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "followups")
public class FollowUp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "workEventId", nullable = false)
    @JsonBackReference
    private WorkEvent workEvent;

    @NotNull
    private LocalDate date;

    @NotNull
    @Enumerated(EnumType.STRING)
    private WorkStatus workStatus;

    private String medicalEvolution;

    private String doctorNotes;

    private LocalDate nextCheckupDate;

    private String prenventiveMesures;

    private String employeeFeedback;

    private String comments;


}
