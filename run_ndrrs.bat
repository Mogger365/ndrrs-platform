@echo off
title NDRRS - National Disaster Response System (Multi-Device Wi-Fi Server)
color 0A
echo ====================================================================
echo               NDRRS - NATIONAL DISASTER RESPONSE SYSTEM            
echo ====================================================================
echo.
echo Starting Multi-Device Real-Time Sync Server (Port 3001)...
start /b node server.js > nul 2>&1
echo.
echo Launching Citizen Portal on Wi-Fi Network...
echo Mobile Phone Link: http://172.20.10.2:5173/
echo.
start http://localhost:5173/
npx vite --host --port 5173
pause
