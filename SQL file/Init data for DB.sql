Create database jewelry_management_at_the_store;
use jewelry_management_at_the_store;

INSERT INTO `role` (description, name) VALUES ('test', 'admin');
INSERT INTO `role` (description, name) VALUES ('test', 'staff');
INSERT INTO `role` (description, name) VALUES ('test', 'manager');

INSERT INTO `stall` (`code`, `description`, `name`, `status`, `type`)
VALUES
('ST0001', 'High-end jewelry store', 'Golden Rings', 1, 'SELL'),
('ST0002', 'Luxury diamonds', 'Diamond Dreams', 1, 'SELL'),
('ST0003', 'Handcrafted silver', 'Silver Stars', 1, 'PURCHASE'),
('ST0004', 'Affordable fashion jewelry', 'Fashion Bling', 1, 'PURCHASE'),
('ST0005', 'Exclusive watches', 'Watch Wonderland', 1, 'PURCHASE');

INSERT INTO `promotion` (`description`, `discount`, `end_date`, `maximum_prize`, `minimum_prize`, `name`, `start_date`, `status`)
VALUES
('Summer Sale', 0.1, '2024-07-31', 1000.00, 100.00, 'Summer Delight', '2024-06-01', true),
('Winter Bonanza', 0.2, '2024-12-31', 1500.00, 200.00, 'Winter Wonderland', '2024-11-01', true),
('Spring Fling', 0.3, '2024-05-31', 800.00, 50.00, 'Spring Special', '2024-04-01', true),
('Autumn Festival', 0.4, '2024-10-31', 1200.00, 100.00, 'Autumn Fest', '2024-09-01', true),
('New Year Bash', 0.33, '2025-01-15', 2000.00, 300.00, 'New Year Celebration', '2024-12-15', true);

INSERT INTO `customer` (`address`, `birthday`, `create_date`, `email`, `full_name`, `phone`, `status`, `update_date`, `bonus_point`)
VALUES
('123 Maple St', '1990-01-01', '2024-06-01', 'customer1@example.com', 'John Doe', '0791234567', 1, '2024-06-01', 0),
('456 Oak St', '1985-02-14', '2024-06-02', 'customer2@example.com', 'Jane Smith', '0791234568', 1, '2024-06-02', 0),
('789 Pine St', '1975-03-30', '2024-06-03', 'customer3@example.com', 'Alice Johnson', '0791234569', 1, '2024-06-03', 0),
('101 Elm St', '1988-04-25', '2024-06-04', 'customer4@example.com', 'Bob Brown', '0791234570', 1, '2024-06-04', 0),
('202 Birch St', '1992-05-15', '2024-06-05', 'customer5@example.com', 'Charlie Davis', '0791234571', 1, '2024-06-05', 0);

INSERT INTO `product` (barcode,barcode_text,code,description,image,name,purchase_price,qrcode,quantity,sell_price,`size`,stall_location,status,`type`,weight,stall_id) VALUES
	 ('http://localhost:8080/api/v1/images/1.png','8931234567890','56789','Elegant gold necklace','https://beautifulearthboutique.com/cdn/shop/products/nura-pearl-18k-gold-necklace-507240.jpg?v=1683765158','Gold Necklace 1',200.0,'https://example.com/qrcode_1.png',10,250.0,'L','S1','SELL','necklace',0.05,1),
	 ('http://localhost:8080/api/v1/images/2.png','8932345678901','67890','Stylish silver ring','https://th.pandora.net/dw/image/v2/BJRN_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwea663109/productimages/singlepackshot/168289C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5','Silver Ring 2',100.0,'https://example.com/qrcode_2.png',15,150.0,'M','S2','SELL','ring',0.02,2),
	 ('http://localhost:8080/api/v1/images/3.png','8933456789012','78901','Diamond stud earrings','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIDyd1Y261NJUALcPezC2mcVxjGpTMQXgjhg&s','Diamond Earrings 3',500.0,'https://example.com/qrcode_3.png',5,600.0,'S','S3','SELL','earrings',0.03,3),
	 ('http://localhost:8080/api/v1/images/4.png','8934567890123','89012','Platinum bracelet','https://www.proclamationjewelry.com/cdn/shop/files/silver_franco_bracelet_5mm_2747ba15-1226-4f99-921a-4730abdd6b11_580x@2x.jpg?v=1704749992','Platinum Bracelet 4',300.0,'https://example.com/qrcode_4.png',8,350.0,'L','S4','SELL','bracelet',0.04,4),
	 ('http://localhost:8080/api/v1/images/5.png','8935678901234','90123','Emerald pendant','https://www.orra.co.in/media/catalog/product/cache/a062e776095ada03f265202079309f18/o/p/ops16723_1_1lx6ldefj7yrq6wg.jpg','Emerald Pendant 5',400.0,'https://example.com/qrcode_5.png',7,450.0,'M','S5','SELL','pendant',0.05,5);
	 
INSERT INTO orders (address, create_date, customer_give_money, description, refund_money, status, tax, total_bonus_point, total_price, type, customer_id, promotion_id, staff_id, send_money_method) VALUES
('123 Main St', '2024-06-01', 5000.00, 'Order 1 description', 275.00, 'CONFIRMED', 5.00, 5, 4500.00, 'SELL', 1, 1, 2, 'CASH'),
('124 Main St', '2024-06-02', 9000.00, 'Order 2 description', 75.00, 'CONFIRMED', 5.00, 10, 8500.00, 'SELL', 2, 2, 2, 'CASH'),
('125 Main St', '2024-06-03', 14000.00, 'Order 3 description', 875.00, 'CONFIRMED', 5.00, 20, 12500.00, 'PURCHASE', 3, 3, 3, 'CASH'),
('126 Main St', '2024-06-04', 18000.00, 'Order 4 description', 675.00, 'CONFIRMED', 5.00, 30, 16500.00, 'PURCHASE', 4, 4, 3, 'CASH'),
('127 Main St', '2024-06-05', 22000.00, 'Order 5 description', 475.00, 'CONFIRMED', 5.00, 40, 20500.00, 'PURCHASE', 5, 5, 3, 'CASH');

-- Thêm lại dữ liệu cho bảng `order_detail`
INSERT INTO order_detail (product_name, product_price, product_quantity, total_price, order_id, product_id) VALUES
('Elegant gold necklace', 100.00, 1, 100.00, 1, 1),
('Stylish silver ring', 200.00, 1, 200.00, 2, 2),
('Diamond stud earrings', 300.00, 1, 300.00, 3, 3),
('Platinum bracelet', 150.00, 2, 300.00, 4, 4),
('Emerald pendant', 50.00, 1, 50.00, 5, 5);
