@echo off
TITLE Customer Churn Predictor - Startup Script
COLOR 0B

echo ==========================================
echo    CUSTOMER CHURN PREDICTOR STARTUP
echo ==========================================
echo.

:: Start Backend in a new window
echo [1/2] Launching FastAPI Backend...
start "Churn Backend API" cmd /k "cd backend && python main.py"

:: Start Frontend in a new window
echo [2/2] Launching React Frontend...
:: Using npm run dev -- --port 5173 to try and force a port if needed, 
:: but usually it auto-increments if busy.
start "Churn Frontend" cmd /k "npm run dev"

echo.
echo ==========================================
echo  DONE! Both servers are starting...
echo  Backend API:  http://localhost:10000
echo  Frontend UI:  http://localhost:5175 
echo.
echo  (Note: If 5175 is busy, check the terminal window 
echo   for the actual "Local" URL)
echo ==========================================
echo.
pause
