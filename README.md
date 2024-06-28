
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

## Team Member Assignment Table

### Table 1: User Stories of Each Sprint
| Sprint   | User Story ID | Description                |
|----------|----------------|----------------------------|
| Sprint 1 | UC-10    | Login                      |
|          | UC-11    | Logout                     |
|          | UC-12    | Reset Password             |
|          | UC-13    | View Account               |
|          | UC-14    | Create Account             |
|          | UC-15    | Edit Account               |
|          | UC-16    | Delete Account             |
|          | UC-17    | View Profile               |
|          | UC-18    | Update Profile             |
| Sprint 2 | UC-19    | Search Staff               |
|          | UC-20    | Create Staff               |
|          | UC-21    | Edit Staff                 |
|          | UC-22    | Delete Staff               |
|          | UC-32    | View Promotion             |
|          | UC-35    | Create Promotion           |
|          | UC-37    | Update Promotion           |
|          | UC-38    | Delete Promotion           |
|          | UC-25    | View Policies              |
|          | UC-29    | Edit Policies              |
| Sprint 3 | UC-31    | Print bill from Order      |
|          | UC-33    | Export bills               |
|          | UC-36    | Import product by barcode  |
|          | UC-39    | Apply Promotion to Order   |
|          | UC-40    | Add stall                  |
|          | UC-41    | Update stall               |
|          | UC-43    | View stall                 |
|          | UC-53    | Add customers              |
|          | UC-54    | Update customers           |
|          | UC-55    | Delete customers           |
|          | UC-56    | View customers             |
|          | UC-30    | Delete Policies            |
| Sprint 4 | UC-42    | Add Product to Stall       |
|          | UC-44    | Edit Product               |
|          | UC-45    | View Products in Stall     |
|          | UC-46    | Delete Product             |
|          | UC-47    | Manager Dashboard          |
|          | UC-48    | Staff Dashboard            |
|          | UC-50    | Create Policies            |
|          | UC-23    | Create Orders              |
|          | UC-24    | Update Orders              |
|          | UC-26    | Delete Orders              |
|          | UC-28    | View Orders                |

### Table 2: Member Assignment for Sprint 1
| Member Name | User Story ID | Description            |
|-------------|---------------|------------------------|
| Le Thanh Binh    | UC-10   | Login                  |
| Le Thanh Binh    | UC-11   | Logout                 |
| Nguyen Tran Khanh Ha    | UC-12   | Reset Password         |
| Luu Thien An    | UC-13   | View Account           |
| Luu Thien An    | UC-14   | Create Account         |
| Tran Nhat Quang    | UC-15   | Edit Account           |
| Le Xuan Phuong Nam    | UC-16   | Delete Account         |
| Nguyen Thanh Phong    | UC-17   | View Profile           |
| Nguyen Thanh Phong    | UC-18   | Update Profile         |
### Table 3: Member Assignment for Sprint 2
| Member Name | User Story ID | Description            |
|-------------|---------------|------------------------|
| Le Thanh Binh    | UC-19    | Search Customer               |
| Le Thanh Binh    | UC-20    | Create Staff               |
| Nguyen Tran Khanh Ha    | UC-21    | Edit Staff                 |
| Nguyen Tran Khanh Ha    | UC-22    | Delete Staff               |
| Le Xuan Phuong Nam    | UC-35    | Create Promotion           |
| Luu Thien An    | UC-37    | Update Promotion           |
| Tran Nhat Quang    | UC-38    | Delete Promotion           |
| Nguyen Thanh Phong    | UC-29    | Edit Policies              |
### Table 4: Member Assignment for Sprint 3
| Member Name | User Story ID | Description            |
|-------------|---------------|------------------------|
| Nguyen Thanh Phong    | UC-33    | Export bills               |
| Luu Thien An    | UC-40    | Add stall                  |
| Luu Thien An    | UC-41    | Update stall               |
| Tran Nhat Quang    | UC-53    | Add customers              |
| Nguyen Tran Khanh Ha    | UC-54    | Update customers           |
| Le Xuan Phuong Nam    | UC-55    | Delete customers           |
### Table 5: Member Assignment for Sprint 4
| Member Name | User Story ID | Description            |
|-------------|---------------|------------------------|
| Luu Thien An    | UC-23    | Create Orders              |
| Nguyen Thanh Phong    | UC-42    | Add Product to Stall       |
| Le Xuan Phuong Nam    | UC-44    | Edit Product               |
| Le Xuan Phuong Nam    | UC-45    | View Products in Stall     |
| Le Thanh Binh    | UC-48    | Staff Dashboard            |
| Le Thanh Binh    | UC-49    | Manager Dashboard          |
| Tran Nhat Quang    | UC-50    | Create Policies            |
