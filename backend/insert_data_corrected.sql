-- ============================================
-- CORRECTED INSERT STATEMENT - NO SYNTAX ERRORS
-- The issue was: DATE ADD should be DATE_ADD (with underscore)
-- Copy and paste this COMPLETE statement in MySQL Workbench
-- ============================================

USE suhasproject;

-- CORRECTED INSERT statement - Notice DATE_ADD (with underscore, not space)
INSERT INTO auction (title, description, starting_price, current_price, end_time, seller_id, seller_name) 
VALUES 
    ('Vintage Watch', 'Beautiful vintage watch from 1980s', 500.00, 500.00, DATE_ADD(NOW(), INTERVAL 7 DAY), 'seller1', 'John Doe'),
    ('Antique Vase', 'Rare Chinese antique vase', 1200.00, 1350.00, DATE_ADD(NOW(), INTERVAL 5 DAY), 'seller2', 'Jane Smith'),
    ('Collectible Coins', 'Set of rare coins from 1800s', 800.00, 800.00, DATE_ADD(NOW(), INTERVAL 3 DAY), 'seller1', 'John Doe');

-- Verify data was inserted
SELECT * FROM auction;

-- Count total auctions
SELECT COUNT(*) as total_auctions FROM auction;


