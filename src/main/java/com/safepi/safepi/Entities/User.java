package com.safepi.safepi.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.safepi.safepi.Entities.Enums.Position;
import com.safepi.safepi.Entities.Enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre no debe estar vacío")
    @Size(min = 3, max = 50)
    private String name;

    @NotBlank(message = "Los apellidos no deben estar vacíos")
    @Size(min = 3, max = 50)
    private String last_name;

    @NotBlank(message = "El nombre de usuario no debe estar vacio")
    @Size(min = 5, max = 50)
    @Column(unique = true)
    private String username;

    @NotBlank(message = "La contraseña no debe estar vacía")
    private String password;

    @Email(message = "El email tiene que estar en el formato correcto")
    @Column(unique = true)
    private String email;

    @Past(message = "La fecha de nacimiento deber ser en el pasado")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthday;

    @Past(message = "La fecha de nacimiento deber ser en el pasado")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate start_date;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private Position position;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Risk> risks = new ArrayList<>();

    @Transient
    private Integer age;

    public User() {}

    public Integer getAge() {
        if (this.birthday != null) {
            LocalDate birthDate = this.birthday.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            return Period.between(birthDate, LocalDate.now()).getYears();
        }

        return null;
    }
}
