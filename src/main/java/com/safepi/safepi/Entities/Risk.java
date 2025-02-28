package com.safepi.safepi.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.safepi.safepi.Entities.Enums.Impact;
import com.safepi.safepi.Entities.Enums.Location;
import com.safepi.safepi.Entities.Enums.Probability;
import com.safepi.safepi.Entities.Enums.State;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@Table(name = "risks")
public class Risk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @NotNull(message = "La fecha no puede estar vacía")
    @JsonFormat(pattern = "dd-MM-yyy")
    private Date date;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Location location;

    @NotBlank(message = "La descripción no puede estar vacía")
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Probability probability;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Impact impact;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private State state = State.PENDIENTE;

    @Transient
    private String risk;

    @Transient
    private Integer gravity;

    public Risk() {}

    public Integer getGravity() {
        Integer num1 = 0;
        Integer num2 = 0;

        if (this.probability == Probability.BAJA) {
            num1 = 1;
        } else if (this.probability == Probability.MEDIA) {
            num1 = 2;
        } else if (this.probability == Probability.ALTA) {
            num1 = 3;
        }

        if (this.impact == Impact.BAJO) {
            num2 = 1;
        } else if (this.impact == Impact.MEDIO) {
            num2 = 2;
        } else if (this.impact == Impact.ALTO) {
            num2 = 3;
        }

        return num1 * num2;
    }

    public String getRisk() {
        int gravity = getGravity();

        if (gravity < 4) {
            return "Riesgo bajo";
        } else if (gravity < 7) {
            return "Riesgo medio";
        } else {
            return "Riesgo alto";
        }
    }
}
