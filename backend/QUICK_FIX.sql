-- ============================================
-- QUICK FIX: Create MySQL User for Spring Boot
-- Run this COMPLETE script in MySQL Workbench
-- ============================================

-- Create a dedicated user for the application
CREATE USER IF NOT EXISTS 'auctionapp'@'localhost' IDENTIFIED BY 'auction123';

-- Grant all privileges on suhasproject database
GRANT ALL PRIVILEGES ON suhasproject.* TO 'auctionapp'@'localhost';

-- Refresh privileges
FLUSH PRIVILEGES;

-- Verify user was created
SELECT User, Host FROM mysql.user WHERE User = 'auctionapp';


