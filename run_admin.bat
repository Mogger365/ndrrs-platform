@echo off
title NDRRS - Government & Admin Command Portal (Laptop Main Station)
color 0C
echo ====================================================================
echo          NDRRS - GOVERNMENT & RESCUE ADMIN COMMAND PORTAL            
echo ====================================================================
echo.
echo Starting Multi-Device Real-Time Sync Server (Port 3001)...
start /b node server.js > nul 2>&1
echo.
echo Launching Admin Command Portal on Laptop Station...
echo Mobile Phone Link for Citizens: http://172.20.10.2:5173/
echo Admin Station Link: http://localhost:5173/?portal=admin
echo.
start http://localhost:5173/?portal=admin
npx vite --host --port 5173
pause
