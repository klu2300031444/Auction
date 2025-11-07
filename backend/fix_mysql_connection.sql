-- ============================================
-- FIX MYSQL CONNECTION FOR SPRING BOOT
-- Run this in MySQL Workbench to grant proper access
-- ============================================

-- Option 1: Update root user password to 'root' (if it's different)
-- ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
-- FLUSH PRIVILEGES;

-- Option 2: Grant all privileges to root@localhost (if permissions are the issue)
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- Option 3: Create a dedicated user for the application (RECOMMENDED)
CREATE USER IF NOT EXISTS 'auctionapp'@'localhost' IDENTIFIED BY 'auction123';
GRANT ALL PRIVILEGES ON suhasproject.* TO 'auctionapp'@'localhost';
FLUSH PRIVILEGES;

-- Verify the user was created
SELECT User, Host FROM mysql.user WHERE User = 'auctionapp';

-- Test connection (you can test this separately)
-- mysql -u auctionapp -pauction123 suhasproject


