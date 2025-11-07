-- ============================================
-- MySQL Queries for suhasproject Database
-- Run these queries in MySQL Workbench
-- ============================================

USE suhasproject;

-- ============================================
-- BASIC QUERIES
-- ============================================

-- 1. View all auctions
SELECT * FROM auction;

-- 2. View all auctions with formatted output
SELECT 
    id,
    title,
    LEFT(description, 50) as description_preview,
    starting_price,
    current_price,
    end_time,
    seller_name,
    seller_id,
    CASE 
        WHEN image IS NOT NULL AND image != '' THEN 'Yes' 
        ELSE 'No' 
    END as has_image
FROM auction
ORDER BY id;

-- 3. View complete auction details by ID
SELECT 
    id,
    title,
    description,
    starting_price,
    current_price,
    end_time,
    seller_id,
    seller_name,
    LENGTH(image) as image_size_bytes
FROM auction
WHERE id = 1;  -- Replace 1 with the auction ID you want to view

-- ============================================
-- STATISTICS QUERIES
-- ============================================

-- 4. Count total auctions
SELECT COUNT(*) as total_auctions FROM auction;

-- 5. Get auction statistics
SELECT 
    COUNT(*) as total_auctions,
    COALESCE(MIN(starting_price), 0) as lowest_starting_price,
    COALESCE(MAX(starting_price), 0) as highest_starting_price,
    COALESCE(AVG(starting_price), 0) as avg_starting_price,
    COALESCE(MIN(current_price), 0) as lowest_current_price,
    COALESCE(MAX(current_price), 0) as highest_current_price,
    COALESCE(AVG(current_price), 0) as avg_current_price
FROM auction;

-- 6. Count auctions by seller
SELECT 
    seller_name,
    seller_id,
    COUNT(*) as auction_count,
    COALESCE(AVG(starting_price), 0) as avg_starting_price
FROM auction
GROUP BY seller_name, seller_id
ORDER BY auction_count DESC;

-- ============================================
-- SEARCH QUERIES
-- ============================================

-- 7. Search auctions by title
SELECT 
    id,
    title,
    starting_price,
    current_price,
    seller_name
FROM auction
WHERE title LIKE '%search_term%'  -- Replace search_term with your search keyword
ORDER BY id;

-- 8. Search auctions by description
SELECT 
    id,
    title,
    LEFT(description, 100) as description_preview,
    starting_price,
    current_price
FROM auction
WHERE description LIKE '%search_term%'  -- Replace search_term with your search keyword
ORDER BY id;

-- ============================================
-- FILTER QUERIES
-- ============================================

-- 9. View active auctions (end_time in the future)
SELECT 
    id,
    title,
    starting_price,
    current_price,
    end_time,
    seller_name
FROM auction
WHERE end_time > NOW()
ORDER BY end_time ASC;

-- 10. View expired auctions (end_time in the past)
SELECT 
    id,
    title,
    starting_price,
    current_price,
    end_time,
    seller_name
FROM auction
WHERE end_time < NOW()
ORDER BY end_time DESC;

-- 11. View auctions by price range
SELECT 
    id,
    title,
    starting_price,
    current_price,
    seller_name
FROM auction
WHERE current_price BETWEEN 100 AND 1000  -- Adjust price range as needed
ORDER BY current_price ASC;

-- 12. View auctions with price changes (bid placed)
SELECT 
    id,
    title,
    starting_price,
    current_price,
    (current_price - starting_price) as price_increase,
    seller_name
FROM auction
WHERE current_price > starting_price
ORDER BY price_increase DESC;

-- ============================================
-- TABLE MANAGEMENT QUERIES
-- ============================================

-- 13. View table structure
DESCRIBE auction;

-- 14. View table creation statement
SHOW CREATE TABLE auction;

-- 15. View all tables in database
SHOW TABLES;

-- ============================================
-- SAMPLE DATA INSERT (OPTIONAL)
-- ============================================

-- 16. Insert sample auction data (for testing)
INSERT INTO auction (title, description, starting_price, current_price, end_time, seller_id, seller_name) 
VALUES 
    ('Vintage Watch', 'Beautiful vintage watch from 1980s', 500.00, 500.00, DATE_ADD(NOW(), INTERVAL 7 DAY), 'seller1', 'John Doe'),
    ('Antique Vase', 'Rare Chinese antique vase', 1200.00, 1350.00, DATE_ADD(NOW(), INTERVAL 5 DAY), 'seller2', 'Jane Smith'),
    ('Collectible Coins', 'Set of rare coins from 1800s', 800.00, 800.00, DATE_ADD(NOW(), INTERVAL 3 DAY), 'seller1', 'John Doe');

-- 17. View inserted data
SELECT * FROM auction;
