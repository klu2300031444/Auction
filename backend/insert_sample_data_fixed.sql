-- ============================================
-- CORRECTED INSERT STATEMENT - NO SYNTAX ERRORS
-- Copy and paste this complete statement in MySQL Workbench
-- ============================================

USE suhasproject;

-- Delete any existing test data (optional - remove this if you want to keep existing data)
-- DELETE FROM auction;

-- CORRECTED INSERT statement with complete values
INSERT INTO auction (title, description, starting_price, current_price, end_time, seller_id, seller_name) 
VALUES 
    ('Vintage Watch', 'Beautiful vintage watch from 1980s', 500.00, 500.00, DATE_ADD(NOW(), INTERVAL 7 DAY), 'seller1', 'John Doe'),
    ('Antique Vase', 'Rare Chinese antique vase', 1200.00, 1350.00, DATE_ADD(NOW(), INTERVAL 5 DAY), 'seller2', 'Jane Smith'),
    ('Collectible Coins', 'Set of rare coins from 1800s', 800.00, 800.00, DATE_ADD(NOW(), INTERVAL 3 DAY), 'seller1', 'John Doe');

-- Verify data was inserted successfully
SELECT * FROM auction;

-- Count total auctions
SELECT COUNT(*) as total_auctions FROM auction;


