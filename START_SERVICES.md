# How to Start Frontend and Backend

## Prerequisites
1. MySQL is running on `localhost:3306`
2. Database `suhasproject` exists
3. MySQL user `root` with password `root` has access to `suhasproject`

## Step 1: Start MySQL (if not running)
- Make sure MySQL Server is running
- Verify you can connect via MySQL Workbench

## Step 2: Start Backend Server

Open a **PowerShell** or **Command Prompt** window:

```powershell
cd project1\project\backend
mvn spring-boot:run
```

Wait until you see: **"Started AuctionBackendApplication"**

**Expected output:**
- Server running on port 3000
- Connected to MySQL database
- No connection errors

## Step 3: Start Frontend Server

Open a **NEW** PowerShell or Command Prompt window:

```powershell
cd project1\project\Frontend
npm run dev
```

Wait until you see: **"Local: http://localhost:5174/"**

## Step 4: Test the Connection

1. Open browser: `http://localhost:5174`
2. Click "+ Create Auction"
3. Fill in the form and create an auction
4. Check MySQL Workbench:
   ```sql
   USE suhasproject;
   SELECT * FROM auction ORDER BY id DESC LIMIT 5;
   ```

## Troubleshooting

### Backend won't start:
- Check MySQL is running
- Verify MySQL credentials in `application.properties`
- Check if port 3000 is available

### Frontend can't connect to backend:
- Make sure backend is running on port 3000
- Check browser console for errors
- Verify proxy in `vite.config.js`

### Data not saving:
- Check backend logs for errors
- Verify MySQL connection in backend logs
- Check database table exists: `DESCRIBE auction;`


