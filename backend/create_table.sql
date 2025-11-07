-- ============================================
-- CREATE AUCTION TABLE IN suhasproject DATABASE
-- Run this in MySQL Workbench
-- ============================================

USE suhasproject;

-- Create the auction table
CREATE TABLE IF NOT EXISTS auction (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(2000),
    image LONGTEXT,
    starting_price DOUBLE,
    current_price DOUBLE,
    end_time TIMESTAMP NULL,
    seller_id VARCHAR(255),
    seller_name VARCHAR(255)
);

-- Verify table was created
SHOW TABLES;

-- View table structure
DESCRIBE auction;
