package com.code.BE.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "staff_dashboard_daily")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffDashboardDaily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "date")
    private Date date;

    @PositiveOrZero
    @Column(name = "purchase_invoice_revenue")
    private double purchaseInvoiceRevenue;

    @PositiveOrZero
    @Column(name = "sales_invoice_revenue")
    private double salesInvoiceRevenue;

    @PositiveOrZero
    @Column(name = "return_invoice_revenue")
    private double returnInvoiceRevenue;

    @PositiveOrZero
    @Column(name = "total_customers_transacted")
    private int totalCustomersTransacted;

    @PositiveOrZero
    @Column(name = "purchase_invoice_product_quantity")
    private int purchaseInvoiceProductQuantity;

    @PositiveOrZero
    @Column(name = "sales_invoice_product_quantity")
    private int salesInvoiceProductQuantity;

    @PositiveOrZero
    @Column(name = "return_invoice_product_quantity")
    private int returnInvoiceProductQuantity;

    @PositiveOrZero
    @Column(name = "total_invoices_created")
    private int totalInvoicesCreated;

    @PositiveOrZero
    @Column(name = "total_invoices_completed")
    private int totalInvoicesCompleted;

    @PositiveOrZero
    @Column(name = "total_bonus_points_added")
    private int totalBonusPointsAdded;

    @PositiveOrZero
    @Column(name = "total_products_in_stock_start_of_day")
    private int totalProductsInStockStartOfDay;

    @PositiveOrZero
    @Column(name = "total_products_in_stock_end_of_day")
    private int totalProductsInStockEndOfDay;

    @PositiveOrZero
    @Column(name = "total_returned_products")
    private int totalReturnedProducts;

    @Column(name = "best_selling_product")
    private String bestSellingProduct;

    @PositiveOrZero
    @Column(name = "best_selling_product_quantity")
    private int bestSellingProductQuantity;

    @Column(name = "most_stocked_product")
    private String mostStockedProduct;

    @PositiveOrZero
    @Column(name = "most_stocked_product_quantity")
    private int mostStockedProductQuantity;

    @PositiveOrZero
    @Column(name = "total_discount_amount")
    private double totalDiscountAmount;

    @Column(name = "confirm_status")
    private boolean confirmStatus;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private User staff;
}
