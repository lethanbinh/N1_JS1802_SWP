package com.code.BE.model.entity;

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
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image")
    private String image;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @PositiveOrZero
    @Column(name = "purchase_price")
    private double purchasePrice;

    @PositiveOrZero
    @Column(name = "sell_price")
    private double sellPrice;

    @PositiveOrZero
    @Column(name = "quantity")
    private int quantity;

    @Column(name = "status")
    private boolean status;

    @PositiveOrZero
    @Column(name = "weight")
    private double weight;

    @Column(name = "size")
    private String size;

    @Column(name = "stall_location")
    private String stallLocation;

    @Column(name = "type")
    private String type;

    @Column(name = "code")
    @Pattern(regexp = Regex.PRODUCT_CODE_PATTERN)
    private String code;

    @Column(name = "barcodeText", nullable = false, unique = true)
    private String barCodeText;

    @Column(name = "barcode", columnDefinition = "LONGTEXT")
    private String barCode;

    @Column(name = "qrcode", columnDefinition = "LONGTEXT")
    private String qrCode;

    @ManyToOne
    @JoinColumn(name = "stall_id")
    private Stall stall;

    @OneToMany(mappedBy = "product")
    private List<OrderDetail> orderDetails;

    // Getters and setters
}
