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
}
