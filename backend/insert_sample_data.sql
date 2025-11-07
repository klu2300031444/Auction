-- ============================================
-- INSERT SAMPLE DATA INTO AUCTION TABLE
-- Run this in MySQL Workbench to add test data
-- ============================================

USE suhasproject;

-- Insert sample auction data
INSERT INTO auction (title, description, starting_price, current_price, end_time, seller_id, seller_name) 
VALUES 
    ('Vintage Watch', 'Beautiful vintage watch from 1980s in excellent condition', 500.00, 500.00, DATE_ADD(NOW(), INTERVAL 7 DAY), 'seller1', 'John Doe'),
    ('Antique Vase', 'Rare Chinese antique vase from Ming Dynasty', 1200.00, 1350.00, DATE_ADD(NOW(), INTERVAL 5 DAY), 'seller2', 'Jane Smith'),
    ('Collectible Coins', 'Set of rare coins from 1800s, certified authentic', 800.00, 800.00, DATE_ADD(NOW(), INTERVAL 3 DAY), 'seller1', 'John Doe'),
    ('Classic Car', '1967 Mustang in perfect condition, fully restored', 45000.00, 47000.00, DATE_ADD(NOW(), INTERVAL 10 DAY), 'seller3', 'Mike Johnson'),
    ('Rare Painting', 'Original artwork by famous artist', 2500.00, 2500.00, DATE_ADD(NOW(), INTERVAL 14 DAY), 'seller2', 'Jane Smith');

-- Verify data was inserted
SELECT * FROM auction;

-- Count total auctions
SELECT COUNT(*) as total_auctions FROM auction;

