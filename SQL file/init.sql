-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: jewelry_management_at_the_store
-- ------------------------------------------------------
-- Server version	8.0.37

Create database jewelry_management_at_the_store;
use jewelry_management_at_the_store;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `confirmation_token`
--

DROP TABLE IF EXISTS `confirmation_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `confirmation_token` (
  `id` int NOT NULL,
  `confirmation_token` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `expired_date` datetime(6) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_3rtt9efhavjo2dfx9f763sypm` (`user_id`),
  CONSTRAINT `FKhjrtky9wbd6lbk7mu9tuddqgn` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confirmation_token`
--

LOCK TABLES `confirmation_token` WRITE;
/*!40000 ALTER TABLE `confirmation_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `confirmation_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confirmation_token_seq`
--

DROP TABLE IF EXISTS `confirmation_token_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `confirmation_token_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confirmation_token_seq`
--

LOCK TABLES `confirmation_token_seq` WRITE;
/*!40000 ALTER TABLE `confirmation_token_seq` DISABLE KEYS */;
INSERT INTO `confirmation_token_seq` VALUES (1);
/*!40000 ALTER TABLE `confirmation_token_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `bonus_point` double DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_dwk6cx0afu8bs9o4t536v1j5v` (`email`),
  UNIQUE KEY `UK_o3uty20c6csmx5y4uk2tc5r4m` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'123 Maple St','1990-01-01',63000,'2024-06-01','customer1@example.com','John Doe','0791234567',_binary '','2024-06-01'),(2,'456 Oak St','1985-02-14',30000,'2024-06-02','customer2@example.com','Jane Smith','0791234568',_binary '','2024-06-02'),(3,'789 Pine St','1975-03-30',27000,'2024-06-03','customer3@example.com','Alice Johnson','0791234569',_binary '','2024-06-03'),(4,'101 Elm St','1988-04-25',60000,'2024-06-04','customer4@example.com','Bob Brown','0791234570',_binary '','2024-06-04'),(5,'202 Birch St','1992-05-15',54000,'2024-06-05','customer5@example.com','Charlie Davis','0791234571',_binary '','2024-06-05');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_data`
--

DROP TABLE IF EXISTS `image_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_data` longblob,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_data`
--

LOCK TABLES `image_data` WRITE;
/*!40000 ALTER TABLE `image_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `image_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_price` double DEFAULT NULL,
  `product_quantity` int DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrws2q0si6oyd6il8gqe2aennc` (`order_id`),
  KEY `FKb8bg2bkty0oksa3wiq5mp5qnc` (`product_id`),
  CONSTRAINT `FKb8bg2bkty0oksa3wiq5mp5qnc` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKrws2q0si6oyd6il8gqe2aennc` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,'Elegant gold necklace',7000000,1,7000000,1,1),(2,'Stylish silver ring',3000000,1,3000000,2,2),(3,'Diamond stud earrings',30000000,1,30000000,3,3),(4,'Platinum bracelet',3000000,2,6000000,4,4),(5,'Emerald pendant',6000000,1,6000000,5,5);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `customer_give_money` double DEFAULT NULL,
  `description` text,
  `refund_money` double DEFAULT NULL,
  `send_money_method` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `tax` double DEFAULT NULL,
  `total_bonus_point` double DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `promotion_id` int DEFAULT NULL,
  `staff_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK624gtjin3po807j3vix093tlf` (`customer_id`),
  KEY `FKkl19lst67x545047o4n1d0jpv` (`promotion_id`),
  KEY `FKt00kinkf6xry4b0h9k5wum1tx` (`staff_id`),
  CONSTRAINT `FK624gtjin3po807j3vix093tlf` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `FKkl19lst67x545047o4n1d0jpv` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`),
  CONSTRAINT `FKt00kinkf6xry4b0h9k5wum1tx` FOREIGN KEY (`staff_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'123 Main St','2024-06-01',10000000,'Order 1 description',3700000,'CASH','CONFIRMED',0.1,63000,6300000,'SELL',1,2,2),(2,'124 Main St','2024-06-02',10000000,'Order 2 description',7000000,'CASH','CONFIRMED',0.1,30000,3000000,'SELL',2,NULL,2),(3,'125 Main St','2024-06-03',30000000,'Order 3 description',3000000,'CASH','CONFIRMED',0.1,27000,27000000,'PURCHASE',3,2,3),(4,'126 Main St','2024-06-04',10000000,'Order 4 description',4000000,'CASH','CONFIRMED',0.1,60000,6000000,'PURCHASE',4,NULL,3),(5,'127 Main St','2024-06-05',10000000,'Order 5 description',4600000,'CASH','CONFIRMED',0.1,54000,5400000,'PURCHASE',5,2,3);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy`
--

DROP TABLE IF EXISTS `policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `detail` longtext,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy`
--

LOCK TABLES `policy` WRITE;
/*!40000 ALTER TABLE `policy` DISABLE KEYS */;
INSERT INTO `policy` VALUES (1,'<p>At GoldenB, we strive to ensure that you are fully satisfied with your purchase. Our exchange and return policy is designed to be transparent and fair, reflecting our commitment to providing high-quality service and products.</p><h4>Eligibility for Exchange and Return</h4><ol><li><strong>Time Frame</strong>:</li></ol><ul><li class=\"ql-indent-1\">Items must be returned or exchanged within 30 days of the original purchase date.</li></ul><ol><li><strong>Condition</strong>:</li></ol><ul><li class=\"ql-indent-1\">Items must be in their original, unused condition, with all tags attached and accompanied by the original sales receipt.</li><li class=\"ql-indent-1\">Items showing signs of wear, alteration, or damage will not be accepted.</li></ul><ol><li><strong>Non-Returnable Items</strong>:</li></ol><ul><li class=\"ql-indent-1\">Custom-made jewelry, engraved items, and items marked as final sale are not eligible for returns or exchanges.</li><li class=\"ql-indent-1\">Gift cards and jewelry care products are non-refundable.</li></ul><h4>Exchange Policy</h4><ol><li><strong>In-Store Exchange</strong>:</li></ol><ul><li class=\"ql-indent-1\">Bring the item(s) to any GoldenB store location.</li><li class=\"ql-indent-1\">Our staff will assist you in selecting an exchange item of equal or greater value.</li><li class=\"ql-indent-1\">If the new item is of greater value, you will be responsible for paying the difference.</li><li class=\"ql-indent-1\">If the new item is of lesser value, the difference will be issued as a store credit.</li></ul><ol><li><strong>Mail-In Exchange</strong>:</li></ol><ul><li class=\"ql-indent-1\">Contact our customer service to initiate an exchange and receive a return authorization number.</li><li class=\"ql-indent-1\">Securely package the item(s) with the return authorization number and the original receipt.</li><li class=\"ql-indent-1\">Ship the package to the address provided by our customer service team.</li><li class=\"ql-indent-1\">Upon receipt and inspection of the returned item(s), we will process the exchange and ship the new item to you.</li></ul><h4>Return Policy</h4><ol><li><strong>In-Store Return</strong>:</li></ol><ul><li class=\"ql-indent-1\">Bring the item(s) to any GoldenB store location.</li><li class=\"ql-indent-1\">Our staff will inspect the item(s) and process your return.</li><li class=\"ql-indent-1\">Refunds will be issued in the original form of payment.</li><li class=\"ql-indent-1\">Please allow up to 7 business days for the refund to reflect in your account.</li></ul><ol><li><strong>Mail-In Return</strong>:</li></ol><ul><li class=\"ql-indent-1\">Contact our customer service to initiate a return and receive a return authorization number.</li><li class=\"ql-indent-1\">Securely package the item(s) with the return authorization number and the original receipt.</li><li class=\"ql-indent-1\">Ship the package to the address provided by our customer service team.</li><li class=\"ql-indent-1\">Upon receipt and inspection of the returned item(s), we will process your refund.</li><li class=\"ql-indent-1\">Please allow up to 7 business days for the refund to reflect in your account.</li></ul><h4>Important Notes</h4><ul><li>Shipping and handling charges are non-refundable.</li><li>GoldenB is not responsible for lost or damaged packages during the return shipment.</li><li>We recommend using a trackable shipping method and purchasing shipping insurance for items of high value.</li></ul><p>For any questions or concerns regarding our exchange and return policy, please contact our customer service team at [Customer Service Phone Number] or email us at [Customer Service Email Address]. Thank you for shopping at GoldenB.</p><p><br></p><p><strong>GoldenB Store Locations</strong>: [List of Store Locations]</p><p><strong>Customer Service</strong>: [Customer Service Phone Number] [Customer Service Email Address]</p>','Exchange and Return GoldenB Jewelry Policy','EXCHANGE_AND_RETURN'),(2,'<p>At GoldenB, we take pride in the quality and craftsmanship of our jewelry. Our warranty policy ensures that you can enjoy your purchase with peace of mind.</p><h4>Warranty Coverage</h4><ul><li>All jewelry pieces are covered by a 1-year warranty from the date of purchase.</li><li>The warranty covers manufacturing defects in materials and workmanship.</li><li>The warranty does not cover damage caused by accidents, misuse, or normal wear and tear.</li></ul><h4>Warranty Services</h4><p><strong>Repair Services</strong></p><ul><li>If your jewelry piece has a manufacturing defect, we will repair it free of charge within the warranty period.</li><li>For repairs outside the warranty period, a fee will be charged based on the extent of the repair needed.</li><li>All repairs must be handled by GoldenB to ensure the integrity of the jewelry piece.</li></ul><p><strong>Replacement Services</strong></p><ul><li>If the jewelry piece cannot be repaired due to a manufacturing defect, we will replace it with an identical piece.</li><li>If an identical piece is not available, you can choose a replacement of equal or lesser value.</li><li>If the replacement is of greater value, you will be responsible for paying the difference.</li></ul><h4>Warranty Claims Process</h4><ul><li>Contact our customer service team to initiate a warranty claim.</li><li>Provide proof of purchase and a description of the issue.</li><li>Our customer service team will provide instructions for sending the jewelry piece to us.</li><li>Once received, our experts will inspect the piece and determine the appropriate action (repair or replacement).</li><li>We will notify you of the inspection results and the next steps within 7 business days of receiving the piece.</li></ul><h4>Important Notes</h4><ul><li>The warranty is void if the jewelry piece has been altered or repaired by anyone other than GoldenB.</li><li>The warranty is non-transferable and only applies to the original purchaser.</li><li>Shipping costs for warranty claims are the responsibility of the customer.</li><li>We recommend using a trackable shipping method and purchasing shipping insurance for high-value items.</li></ul><h4>Contact Information</h4><p>For any questions or concerns regarding our warranty policy, please contact our customer service team at [Customer Service Phone Number] or email us at [Customer Service Email Address]. Thank you for choosing GoldenB.</p><p><strong>GoldenB Store Locations:</strong> [List of Store Locations]</p><p><strong>Customer Service:</strong> [Customer Service Phone Number]</p><p>[Customer Service Email Address]</p>','GoldenB Jewelry Warranty Policy','WARRANTY');
/*!40000 ALTER TABLE `policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `barcode` longtext,
  `barcode_text` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `purchase_price` double DEFAULT NULL,
  `qrcode` longtext,
  `quantity` int DEFAULT NULL,
  `sell_price` double DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `stall_location` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `stall_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_aoy5j4wqsfh6rlwsmk9016fbx` (`barcode_text`),
  KEY `FKi1hicbqi0prc86l1bklij9mu2` (`stall_id`),
  CONSTRAINT `FKi1hicbqi0prc86l1bklij9mu2` FOREIGN KEY (`stall_id`) REFERENCES `stall` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'https://i.imgur.com/MpzK6pZ.png','8931234567890','56789','Elegant gold necklace','https://beautifulearthboutique.com/cdn/shop/products/nura-pearl-18k-gold-necklace-507240.jpg?v=1683765158','Gold Necklace 1',7000000,'https://example.com/qrcode_1.png',10,8000000,'L','S1','SELL','necklace',0.05,1),(2,'https://i.imgur.com/Sw1XYab.png','8932345678901','67890','Stylish silver ring','https://th.pandora.net/dw/image/v2/BJRN_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwea663109/productimages/singlepackshot/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5','Silver Ring 2',3000000,'https://example.com/qrcode_2.png',15,4000000,'M','S2','SELL','ring',0.02,2),(3,'https://i.imgur.com/0xV5b5q.png','8933456789012','78901','Diamond stud earrings','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIDyd1Y261NJUALcPezC2mcVxjGpTMQXgjhg&s','Diamond Earrings 3',30000000,'https://example.com/qrcode_3.png',5,3200000,'S','S3','SELL','earrings',0.03,3),(4,'https://i.imgur.com/DLKhnN3.png','8934567890123','89012','Platinum bracelet','https://www.proclamationjewelry.com/cdn/shop/files/silver_franco_bracelet_5mm_2747ba15-1226-4f99-921a-4730abdd6b11_580x@2x.jpg?v=1704749992','Platinum Bracelet 4',3000000,'https://example.com/qrcode_4.png',8,4000000,'L','S4','SELL','bracelet',0.04,4),(5,'https://i.imgur.com/b5tNeMw.png','8935678901234','90123','Emerald pendant','https://www.orra.co.in/media/catalog/product/cache/a062e776095ada03f265202079309f18/o/p/ops16723_1_1lx6ldefj7yrq6wg.jpg','Emerald Pendant 5',6000000,'https://example.com/qrcode_5.png',3,7000000,'M','S5','SELL','pendant',0.05,5);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` text,
  `discount` double DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `maximum_prize` double DEFAULT NULL,
  `minimum_prize` double DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `start_date` date DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
INSERT INTO `promotion` VALUES (1,'Summer Sales',0.33,'2024-07-31',100000000,10000000,'Summer Delight','2024-06-01',_binary ''),(2,'Winter Bonanza',0.2,'2024-07-31',50000000,5000000,'Winter Wonderland','2024-06-01',_binary ''),(3,'Spring Fling',0.3,'2024-07-31',70000000,7000000,'Spring Special','2024-06-01',_binary ''),(4,'Autumn Festival',0.4,'2024-07-31',200000000,20000000,'Autumn Fest','2024-06-01',_binary ''),(5,'New Year Bash',0.33,'2024-07-31',100000000,10000000,'New Year Celebration','2024-06-01',_binary '');
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` text,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'test','admin'),(2,'test','staff'),(3,'test','manager');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_dashboard_daily`
--

DROP TABLE IF EXISTS `staff_dashboard_daily`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_dashboard_daily` (
  `id` int NOT NULL AUTO_INCREMENT,
  `confirm_status` bit(1) DEFAULT NULL,
  `daily_revenue` double DEFAULT NULL,
  `purchase_amount` double DEFAULT NULL,
  `purchased_amount` int DEFAULT NULL,
  `return_amount` double DEFAULT NULL,
  `returned_product_count` int DEFAULT NULL,
  `sold_product_count` int DEFAULT NULL,
  `total_customers` int DEFAULT NULL,
  `staff_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKn9rt7f92jisjghejlgh3eifl8` (`staff_id`),
  CONSTRAINT `FKn9rt7f92jisjghejlgh3eifl8` FOREIGN KEY (`staff_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_dashboard_daily`
--

LOCK TABLES `staff_dashboard_daily` WRITE;
/*!40000 ALTER TABLE `staff_dashboard_daily` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_dashboard_daily` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stall`
--

DROP TABLE IF EXISTS `stall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stall` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `description` text,
  `name` varchar(255) NOT NULL,
  `status` bit(1) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stall`
--

LOCK TABLES `stall` WRITE;
/*!40000 ALTER TABLE `stall` DISABLE KEYS */;
INSERT INTO `stall` VALUES (1,'ST0001','High-end jewelry store','Golden Rings',_binary '','SELL'),(2,'ST0002','Luxury diamonds','Diamond Dreams',_binary '','SELL'),(3,'ST0003','Handcrafted silver','Silver Stars',_binary '','PURCHASE'),(4,'ST0004','Affordable fashion jewelry','Fashion Bling',_binary '','PURCHASE'),(5,'ST0005','Exclusive watches','Watch Wonderland',_binary '','PURCHASE');
/*!40000 ALTER TABLE `stall` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `avatar` longtext,
  `birthday` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `point_bonus` double DEFAULT NULL,
  `register_date` date DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `role_id` int DEFAULT NULL,
  `stall_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`),
  UNIQUE KEY `UK_589idila9li6a4arw1t8ht1gx` (`phone`),
  UNIQUE KEY `UK_igkivxkmpi865idin2ce3jxm9` (`stall_id`),
  KEY `FKn82ha3ccdebhokx3a8fgdqeyy` (`role_id`),
  CONSTRAINT `FKn82ha3ccdebhokx3a8fgdqeyy` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FKsn8qwj7e3ou36jhdulsl2ibx2` FOREIGN KEY (`stall_id`) REFERENCES `stall` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'123 Main St','http://localhost:8080/api/v1/images/https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg','2024-06-06','user1@example.com','User One','$2a$10$uID9g5ML3T5bNzAuGrFK1urXN/kct.AhcNUVF5wtwrhwLVZI0HYSq','0794163535',0,'2024-07-08',_binary '','user1',1,NULL),(2,'124 Main St','http://localhost:8080/api/v1/images/http://localhost:8080/api/v1/images/','2024-06-06','user2@example.com','User Two','$2a$10$y2ipKpKNdWCvGR4qgUmfeewYwquXR62x0ht5J52XmaZtMMaSaTf3y','0794163536',0,'2024-07-08',_binary '','user2',2,1),(3,'125 Main St','http://localhost:8080/api/v1/images/https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg','2024-06-06','user3@example.com','User Three','$2a$10$EBIYiScloGvMiLFsl01wMeXisy0quvWil7ldzAdcaci6V5WohWdl6','0794163537',0,'2024-07-08',_binary '','user3',2,2),(4,'126 Main St','http://localhost:8080/api/v1/images/','2024-06-06','user4@example.com','User Four','$2a$10$rEaTxzNbzLKETJ/mbwZhB.KE75Q/JKdDlPPaz8lEluodWczPwYEcS','0794163538',0,'2024-07-08',_binary '','user4',2,3),(5,'127 Main St','http://localhost:8080/api/v1/images/https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg','2024-06-06','user5@example.com','User Five','$2a$10$lbJT/RFbdNRjEebraZy.IODMq66zknn35nJFdMATEz49xAvncBrfG','0794163539',0,'2024-07-08',_binary '','user5',3,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warranty_card`
--

DROP TABLE IF EXISTS `warranty_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warranty_card` (
  `id` int NOT NULL AUTO_INCREMENT,
  `end_date` date DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `start_date` date DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_84sytgpys2qi7coxin6c2vvll` (`order_id`),
  CONSTRAINT `FK2f87jdwk8d5smfcjmn5q954lo` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warranty_card`
--

LOCK TABLES `warranty_card` WRITE;
/*!40000 ALTER TABLE `warranty_card` DISABLE KEYS */;
/*!40000 ALTER TABLE `warranty_card` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-09 20:29:00
INSERT INTO jewelry_management_at_the_store.policy (detail,name,`type`) VALUES
	 ('Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.','Returns','EXCHANGE_AND_RETURN'),
	 ('Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.','Refunds','EXCHANGE_AND_RETURN'),
	 ('<p>If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next contact your bank. There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund yet, please contact us at anltse173297@fpt.edu.vn</p>','Late or missing refunds
','EXCHANGE_AND_RETURN'),
	 ('<p>GoldenB Jewelry ("the Company") provides a Limited Warranty covering defects in materials and workmanship for jewelry items purchased directly from the Company.</p>','Warranty Coverage','WARRANTY'),
	 ('Each jewelry item purchased from the Company is covered under warranty for a period of 30 days from the date of receipt goods.','Warranty Duration','WARRANTY'),
	 ('<p>The Limited Warranty does not cover: </p><ol><li>Jewelry items purchased from unauthorized retailers or individuals. </li><li>Normal wear and tear, including scratches, dents, and faded colors.</li><li> Damage caused by misuse, neglect, accidents, or any external causes. </li><li>Damage caused by unauthorized modifications, repairs, or alterations. </li><li>Loss or theft.</li><li>Direct or consequential damages to persons or property.</li></ol>','Exclusions','WARRANTY'),
	 ('<p>To make a warranty claim:</p><ol><li>Provide a valid proof of date of receipt of product within the warranty period.</li><li>Send a clear photograph of the defective item, along with a detailed description of the defect.</li><li>Send the aforementioned details via email to anltse173297@fpt.edu.vn.</li><li>Wait for confirmation and further instructions from our Customer Service department.</li><li>If replacement product is needed quickly, another order can be placed while the warranty claim is processed.</li></ol>','Warranty Claim Process','WARRANTY');
