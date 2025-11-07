# PowerShell script to free up port 5175
# Run this if port 5175 is already in use

Write-Host "Checking for processes using port 5175..." -ForegroundColor Yellow

# Find process using port 5175
$process = Get-NetTCPConnection -LocalPort 5175 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

if ($process) {
    Write-Host "Found process using port 5175: PID $process" -ForegroundColor Red
    
    # Get process details
    $procInfo = Get-Process -Id $process -ErrorAction SilentlyContinue
    if ($procInfo) {
        Write-Host "Process Name: $($procInfo.ProcessName)" -ForegroundColor Yellow
        Write-Host "Process Path: $($procInfo.Path)" -ForegroundColor Yellow
        
        # Ask to kill it
        $response = Read-Host "Do you want to kill this process? (Y/N)"
        if ($response -eq 'Y' -or $response -eq 'y') {
            Stop-Process -Id $process -Force
            Write-Host "Process killed! Port 5175 is now free." -ForegroundColor Green
        } else {
            Write-Host "Process not killed. Please stop it manually." -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "Port 5175 is free!" -ForegroundColor Green
}

Write-Host "`nYou can now start the frontend with: npm run dev" -ForegroundColor Cyan



