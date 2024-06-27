package com.code.BE.constant;

public class Enums {
    public enum OrderStatus {
        PENDING,
        CONFIRMED,
        SHIPPED,
        DELIVERED,
        CANCELLED
    }

    public enum OrderType {
        SELL,
        PURCHASE
    }

    public enum PolicyType {
        EXCHANGE_AND_RETURN,
        WARRANTY
    }

    public enum Role {
        ADMIN, STAFF, MANAGER
    }

    public enum PaymentMethod {
        CASH, BANK_TRANSFER, DOMESTIC_ATM, CREDIT_OR_DEBIT_CARD, INSTALLMENT_CREDIT_CARD, PAYMENT_GATEWAY
    }
}
