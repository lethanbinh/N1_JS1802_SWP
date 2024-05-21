package com.code.BE.model.entity;

import com.code.BE.constant.Regex;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @NotNull
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @NotNull
    @Column(name = "password", nullable = false)
    private String password;

    @Temporal(TemporalType.DATE)
    @Column(name = "register_date")
    private Date registerDate;

    @Pattern(regexp = Regex.PHONE_PATTERN)
    @Column(name = "phone")
    private String phone;

    @Email
    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "avatar", columnDefinition = "LONGTEXT")
    private String avatar;

    @PositiveOrZero
    @Column(name = "point_bonus")
    private double pointBonus;

    @Temporal(TemporalType.DATE)
    @Column(name = "birthday")
    private Date birthday;

    @Column(name = "status")
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "staff")
    private List<Order> staffOrders;

    @OneToMany(mappedBy = "customer")
    private List<Order> customerOrders;

    @OneToOne(mappedBy = "staff")
    private Stall stall;

    @OneToOne(mappedBy = "user")
    private ConfirmationToken confirmationToken;

    // Getters and setters
}
