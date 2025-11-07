# Fix MySQL Connection for Spring Boot Backend

## Problem
The backend cannot connect to MySQL, so data created from the frontend is not saving to the database.

## Solution Options

### Option 1: Find Your MySQL Password and Update application.properties

1. **Check your MySQL Workbench connection:**
   - Open MySQL Workbench
   - Look at your connection settings (the password you use to connect)
   - Note the password

2. **Update application.properties:**
   - Open: `src/main/resources/application.properties`
   - Update line 5 with your actual password:
     ```
     spring.datasource.password=YOUR_ACTUAL_PASSWORD
     ```

### Option 2: Use a Dedicated MySQL User (RECOMMENDED)

**Step 1: Run this in MySQL Workbench:**
```sql
USE suhasproject;

CREATE USER IF NOT EXISTS 'auctionapp'@'localhost' IDENTIFIED BY 'auction123';
GRANT ALL PRIVILEGES ON suhasproject.* TO 'auctionapp'@'localhost';
FLUSH PRIVILEGES;
```

**Step 2: Update application.properties:**
- Change line 4: `spring.datasource.username=auctionapp`
- Change line 5: `spring.datasource.password=auction123`

### Option 3: Reset Root Password to 'root'

**Run in MySQL Workbench:**
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
FLUSH PRIVILEGES;
```

## After Fixing Connection

1. **Restart the backend:**
   ```powershell
   cd project1/project/backend
   mvn spring-boot:run
   ```

2. **Verify it connects:**
   - You should see: "Started AuctionBackendApplication"
   - No MySQL connection errors

3. **Test from frontend:**
   - Create a new auction from the frontend
   - Check MySQL Workbench: `SELECT * FROM auction;`
   - You should see the new auction in the database

## Quick Test Query

After starting the backend, run this in MySQL Workbench to verify data is saving:
```sql
USE suhasproject;
SELECT * FROM auction ORDER BY id DESC LIMIT 5;
```


