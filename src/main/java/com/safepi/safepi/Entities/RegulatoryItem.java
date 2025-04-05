package com.safepi.safepi.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.safepi.safepi.Entities.Enums.RegulatoryItemsStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "regulatory_items")
public class RegulatoryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "checklist_id", nullable = false)
    @JsonBackReference
    private RegulatoryChecklist checklist;

    @Enumerated(EnumType.STRING)
    private RegulatoryItemsStatus status;

    private String itemName;

    @JsonFormat(pattern = "dd-MM-yyy")
    private LocalDate completionDate;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ItemCompletionHistory> history = new ArrayList<>();

    private String comments;

}
