# Fix Port 5175 Issue

## Problem
Vite is using port 5176 instead of 5175 because port 5175 is already in use.

## Solution 1: Free Port 5175 (Recommended)

### Option A: Using PowerShell Script
Run this in PowerShell from the Frontend folder:
```powershell
cd project1\project\Frontend
.\free-port-5175.ps1
```

### Option B: Manual PowerShell Command
```powershell
# Find and kill process on port 5175
$process = Get-NetTCPConnection -LocalPort 5175 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($process) {
    Stop-Process -Id $process -Force
    Write-Host "Port 5175 is now free!"
}
```

### Option C: Using Task Manager
1. Open Task Manager (Ctrl + Shift + Esc)
2. Go to "Details" tab
3. Find any Node.js or Vite processes
4. End those processes
5. Restart the frontend

## Solution 2: Restart Frontend

After freeing port 5175:

1. **Stop the current frontend server** (Ctrl + C in the terminal)
2. **Start it again:**
   ```powershell
   cd project1\project\Frontend
   npm run dev
   ```

Now it should use port 5175!

## Configuration Updates Made

✅ **vite.config.js** - Added `strictPort: true` to force port 5175
✅ **CorsConfig.java** - Allows both ports 5175 and 5176
✅ **AuctionController.java** - Allows both ports 5175 and 5176

## Verify

After restarting, you should see:
```
Local:   http://localhost:5175/
```

Not 5176!



