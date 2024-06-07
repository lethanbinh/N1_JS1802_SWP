package com.code.BE.model.entity;

import com.code.BE.constant.ErrorMessage;
import com.code.BE.constant.Regex;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @NotNull
    @Pattern(regexp = Regex.STALL_CODE_PATTERN)
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "status")
    private boolean status;

    @OneToOne(mappedBy = "stall")
    private User staff;

    @OneToMany(mappedBy = "stall")
    private List<Product> products;
    // Getters and setters
}
