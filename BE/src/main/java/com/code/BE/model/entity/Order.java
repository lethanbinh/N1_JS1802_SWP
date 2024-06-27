package com.code.BE.model.entity;

import jakarta.persistence.*;
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
    private int id;

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
    private double totalPrice = 0;

    @PositiveOrZero
    @Column(name = "tax")
    private double tax = 0;

    @PositiveOrZero
    @Column(name = "total_bonus_point")
    private double totalBonusPoint = 0;

    @PositiveOrZero
    @Column(name = "customer_give_money")
    private double customerGiveMoney = 0;

    @Column(name = "refund_money")
    private double refundMoney = 0;

    @Column(name = "send_money_method")
    private String sendMoneyMethod;

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private User staff;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "order")
    private List<OrderDetail> orderDetails;

    @OneToOne(mappedBy = "orderWarranty")
    private WarrantyCard warrantyCard;

    // Getters and setters
}
