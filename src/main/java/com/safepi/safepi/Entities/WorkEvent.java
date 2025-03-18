package com.safepi.safepi.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.safepi.safepi.Entities.Enums.Category;
import com.safepi.safepi.Entities.Enums.Impact;
import com.safepi.safepi.Entities.Enums.Location;
import com.safepi.safepi.Entities.Enums.TypeWorkEvent;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "work_events")
public class WorkEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "workEvent", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<FollowUp> followUps = new ArrayList<>();

    @NotNull
    @Enumerated(EnumType.STRING)
    private Category category;

    @NotNull
    @JsonFormat(pattern = "dd-MM-yyy")
    private LocalDate date;

    @NotNull
    @Size(min = 5, max = 350)
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TypeWorkEvent typeWorkEvent;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Location location;

    @NotNull
    @Size(min = 3, max = 25)
    private String affectedPerson;

    @Size(min = 3, max = 25)
    private String witnesses;

    @Size(min = 5, max = 350)
    private String firstAid;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Impact impact;
}
