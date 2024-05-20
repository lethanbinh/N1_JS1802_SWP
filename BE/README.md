# BACKEND JEWELRY SALE SYSTEM AT THE STORE

## **Introduction**

This is the Spring Boot code of the 5 members project including Web Application and Mobile application. The project is about managing Jewelry sale with 3 roles which is Admin, Staff, Manager

Deployed on Docker

## **Basic functional features**

### **API for Admin, Staff and Manager**

- Authentication
    - Login/Logout
    - Manage profile (view, update profile)
    - Reset password
- Admin
    - Manage account (View, create, update, delete account)
- Manager
    - Manage staff (View, create, update, delete staff)
    - Handle staff (Confirm promotion apply)
    - View products in stall
    - Promotions management (View, add, update, delete promotion)
    - View customer purchase history
    - Manage return and exchange policy (View return and exchange policy, update policy)
    - View dashboard (View revenue statistics, staff statistics and orders statistics)
- Staff
    - Orders management (create sell bill, input customer info, import product by barcode and product code, remove product, export bill)
    - Examine customer old product
    - Stall management (add stall, update stall, view, create, update products in stall)
    - View promotions
    - View customer purchase history
    - View return and exchange policy

## **Libraries and Integration**

- Swagger
- Spring Security
- Sending Email
- Sending OTP via mail
- Spring Data JPA
- MySQL Database
- MultipartFile
- Barbecue (barcode 1D Generator)
- Dynamic update gold price

Commit message syntax

Person - functions/task- description

How to use API:
Syntax: api/version/object?key=value