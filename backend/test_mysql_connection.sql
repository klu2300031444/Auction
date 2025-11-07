-- ============================================
-- TEST MYSQL CONNECTION AND PERMISSIONS
-- Run this to check if root user can access suhasproject database
-- ============================================

-- Check current user
SELECT USER(), CURRENT_USER();

-- Check if suhasproject database exists
SHOW DATABASES LIKE 'suhasproject';

-- Check user privileges
SHOW GRANTS FOR 'root'@'localhost';

-- Try to use the database
USE suhasproject;

-- Check if we can see the auction table
SHOW TABLES;

-- Try to select from auction table
SELECT COUNT(*) FROM auction;

