package com.safepi.safepi.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.safepi.safepi.Entities.Enums.RegulatoryItemsStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "item_completion_history")
public class ItemCompletionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long completionId;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private RegulatoryItem item;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate completionDate;

    private String comments;

    @Enumerated(EnumType.STRING)
    private RegulatoryItemsStatus status;
}
