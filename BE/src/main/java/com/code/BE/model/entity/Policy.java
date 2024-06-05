package com.code.BE.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "detail", columnDefinition = "LONGTEXT")
    private String detail;

    @NotNull
    @Column(name = "type", nullable = false)
    private String type;

    // Getters and setters
}
