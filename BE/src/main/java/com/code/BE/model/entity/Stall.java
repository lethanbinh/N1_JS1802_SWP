package com.code.BE.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @PositiveOrZero
    @Column(name = "revenue")
    private double revenue;

    @OneToOne
    @JoinColumn(name = "staff_id")
    private User staff;

    @OneToMany(mappedBy = "stall")
    private List<Product> products;
    // Getters and setters
}
