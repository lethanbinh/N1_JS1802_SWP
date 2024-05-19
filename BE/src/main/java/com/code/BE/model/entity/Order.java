package com.code.BE.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "status")
    private String status;

    @Column(name = "type")
    private String type;

    @Temporal(TemporalType.DATE)
    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "address")
    private String address;

    @PositiveOrZero
    @Column(name = "total_price")
    private double totalPrice;

    @PositiveOrZero
    @Column(name = "tax")
    private double tax;

    @PositiveOrZero
    @Column(name = "final_price")
    private double finalPrice;

    @PositiveOrZero
    @Column(name = "total_bonus_point")
    private double totalBonusPoint;

    @PositiveOrZero
    @Column(name = "customer_give_money")
    private double customerGiveMoney;

    @PositiveOrZero
    @Column(name = "refund_money")
    private double refundMoney;

    @OneToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private User staff;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;

    @OneToMany(mappedBy = "order")
    private List<OrderDetail> orderDetails;

    @OneToOne(mappedBy = "orderWarranty")
    private WarrantyCard warrantyCard;

    // Getters and setters
}
