package com.safepi.safepi.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.safepi.safepi.Entities.Enums.RegulatoryCategory;
import com.safepi.safepi.Entities.Enums.RegulatoryChecklistStatus;
import com.safepi.safepi.Entities.Enums.RegulatoryType;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.*;

@Data
@Entity
@Table(name = "regulatory_checklists")
public class RegulatoryChecklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checklistId;

    @NotNull
    @Size(min = 5, max = 200)
    private String title;

    @NotNull
    @Enumerated(EnumType.STRING)
    private RegulatoryType type;

    @Enumerated(EnumType.STRING)
    private RegulatoryChecklistStatus status;

    @JsonFormat(pattern = "dd-MM-yyy")
    private LocalDate creationDate;

    @JsonFormat(pattern = "dd-MM-yyy")
    private LocalDate completionDate;

    @JsonFormat(pattern = "dd-MM-yyy")
    private LocalDate expirationDate;

    @OneToMany(mappedBy = "checklist", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<RegulatoryItem> items = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private RegulatoryCategory category;


}
