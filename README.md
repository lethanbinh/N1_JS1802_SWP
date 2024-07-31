
# Project Introduction

## Contents
- [Project Description](#project-description)
- [Illustrative Images](#illustrative-images)
- [Major Features (Epics)](#major-features-epics)
- [Technologies Used](#technologies-used)
- [Team Member Assignment Table](#team-member-assignment-table)
  - [Table 1: User Stories of Each Sprint](#table-1-user-stories-of-each-sprint)
  - [Table 2: Member Assignment for Sprint 1](#table-2-member-assignment-for-sprint-1)

## Project Description
The software is designed to manage jewelry sales for a company operating a single store with multiple counters. It handles order creation, invoicing, and warranty slip printing. Products can be inputted via barcode scanning or direct code entry. The software supports pricing calculations based on gold prices, labor costs, and stone prices, along with promotional management and customer-specific discounts.

## Major Features (Epics)
- **Manage Account**: Includes functionalities like login, logout, password reset, view account, create account, edit account, and delete account.
- **Manage Profile**: View and update profile.
- **Manage Staff**: Search, create, edit, and delete staff members.
- **Manage Promotions**: View, create, update, and delete promotions.
- **Manage Policies**: View and edit policies.
- **Manage Orders**: Create, update, delete, and view orders.
- **Manage Stall**: Add, update, and view stalls.
- **Manage Customers**: Add, update, delete, and view customers.
- **Manage Products**: Add, edit, view, and delete products in the stall.
- **Dashboard**: Staff, and Manager dashboards.

## Technologies Used
- **Backend**:
  - Swagger
  - Spring Security
  - Sending Email
  - Sending OTP via mail
  - Spring Data JPA
  - MySQL Database
  - MultipartFile
  - Barbecue (barcode 1D Generator)
  - Metal Price API to update gold price
- **Frontend**:
  - React Js
  - CoreUI React template
  - Quill React JS
