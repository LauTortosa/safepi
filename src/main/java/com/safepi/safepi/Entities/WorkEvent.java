package com.safepi.safepi.Entities;

import com.safepi.safepi.Entities.Enums.Category;
import com.safepi.safepi.Entities.Enums.Impact;
import com.safepi.safepi.Entities.Enums.Location;
import com.safepi.safepi.Entities.Enums.TypeWorkEvent;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "workevents")
public class WorkEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Category category;

    private LocalDate date;

    private String description;

    @Enumerated(EnumType.STRING)
    private TypeWorkEvent typeWorkEvent;

    @Enumerated(EnumType.STRING)
    private Location location;

    private String affectedPerson;

    private String witnesses;

    private String firstAid;

    @Enumerated(EnumType.STRING)
    private Impact impact;
}
