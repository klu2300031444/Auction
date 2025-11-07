# Complete Setup Guide - Frontend to Backend Connection

## ✅ All Configuration Updated

### Frontend URL: `http://localhost:5175`
All references have been updated from port 5174 to 5175:
- ✅ `vite.config.js` - Port set to 5175
- ✅ `CorsConfig.java` - CORS allows localhost:5175
- ✅ `AuctionController.java` - CORS allows localhost:5175

### Backend URL: `http://localhost:3000`
- ✅ Backend runs on port 3000
- ✅ API endpoints: `/api/auctions`

### MySQL Database: `suhasproject`
- ✅ Database: `suhasproject`
- ✅ Table: `auction`
- ✅ Credentials: `root` / `root`

## 🚀 How to Start Everything

### Step 1: Start MySQL Server
Make sure MySQL is running on `localhost:3306`

### Step 2: Start Backend Server

Open **PowerShell** or **Command Prompt**:

```powershell
cd project1\project\backend
mvn spring-boot:run
```

**Wait for this message:**
```
Started AuctionBackendApplication in X.XXX seconds
```

**If you see errors:**
- Check MySQL is running
- Verify credentials in `application.properties`
- Check database `suhasproject` exists

### Step 3: Start Frontend Server

Open a **NEW** PowerShell or Command Prompt window:

```powershell
cd project1\project\Frontend
npm run dev
```

**Wait for this message:**
```
Local:   http://localhost:5175/
```

### Step 4: Test the Connection

1. Open browser: `http://localhost:5175`
2. You should see your auction listings
3. Click "+ Create Auction"
4. Fill the form and create an auction
5. Check MySQL Workbench:
   ```sql
   USE suhasproject;
   SELECT * FROM auction ORDER BY id DESC;
   ```

## 🔄 Full CRUD Operations

### ✅ CREATE (Add Auction)
- Frontend: Click "+ Create Auction" button
- Backend: `POST /api/auctions`
- Database: New row inserted in `auction` table

### ✅ READ (View Auctions)
- Frontend: Loads auctions on page load
- Backend: `GET /api/auctions`
- Database: Reads from `auction` table

### ✅ UPDATE (Modify Auction)
- Frontend: Can update auction details
- Backend: `PUT /api/auctions/{id}`
- Database: Updates row in `auction` table

### ✅ DELETE (Remove Auction)
- Frontend: Delete functionality available
- Backend: `DELETE /api/auctions/{id}`
- Database: Deletes row from `auction` table

## 📊 Data Flow

```
Frontend (localhost:5175)
    ↓ HTTP Request (/api/auctions)
Vite Proxy
    ↓ Forwards to http://localhost:3000
Backend (localhost:3000)
    ↓ Spring Boot Controller
    ↓ JPA Repository
MySQL Database (suhasproject.auction)
    ↓ Data Persisted
```

## 🔍 Verify Data is Saving

### In MySQL Workbench:
```sql
USE suhasproject;

-- View all auctions
SELECT * FROM auction;

-- Count auctions
SELECT COUNT(*) FROM auction;

-- View latest auctions
SELECT * FROM auction ORDER BY id DESC LIMIT 5;
```

### In Browser Console:
Open Developer Tools (F12) and check:
- Network tab: See API calls to `/api/auctions`
- Console tab: No CORS errors

## 🛠️ Troubleshooting

### Backend won't start:
1. Check MySQL is running
2. Verify database `suhasproject` exists
3. Check `application.properties` credentials
4. Look for error messages in backend terminal

### Frontend can't connect:
1. Verify backend is running on port 3000
2. Check browser console for errors
3. Verify proxy in `vite.config.js` points to port 3000
4. Check CORS configuration allows localhost:5175

### Data not saving:
1. Check backend logs for errors
2. Verify MySQL connection in backend logs
3. Check database table exists: `DESCRIBE auction;`
4. Verify table has proper structure

### Port already in use:
- Backend (3000): Stop any process using port 3000
- Frontend (5175): Stop any process using port 5175
- Or change ports in configuration files

## ✅ Verification Checklist

- [ ] MySQL Server is running
- [ ] Database `suhasproject` exists
- [ ] Table `auction` exists in database
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access `http://localhost:5175`
- [ ] Can create new auction from frontend
- [ ] New auction appears in MySQL database
- [ ] Can view auctions in frontend
- [ ] No CORS errors in browser console

## 🎉 Success!

When everything is working:
- Creating auctions from frontend saves to MySQL
- Viewing auctions loads from MySQL
- Updating auctions saves to MySQL
- Deleting auctions removes from MySQL

All operations persist data in your MySQL database!



