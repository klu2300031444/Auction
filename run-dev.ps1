# run-dev.ps1
# Helper: start frontend (Vite) and backend (Java JAR or optional Node) in separate PowerShell windows.
# Usage: Right-click -> Run with PowerShell, or run from an elevated terminal:
#   .\run-dev.ps1

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$frontendPath = Join-Path $root 'Frontend'
$backendJar = Join-Path $root 'backend\target\auction-backend-0.0.1-SNAPSHOT.jar'

Write-Output "Starting Frontend (Vite) in new window..."
Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$frontendPath' ; npm install ; npm run dev"

if (Test-Path $backendJar) {
  Write-Output "Starting backend JAR in new window..."
  Start-Process powershell -ArgumentList "-NoExit","-Command","java -jar '$backendJar'"
} else {
  Write-Output "No backend JAR found. If you have a Node backend on port 3000, start it manually."
}
