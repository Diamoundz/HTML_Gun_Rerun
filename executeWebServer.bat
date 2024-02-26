@echo off
setlocal enabledelayedexpansion

set "filename=port.txt"
cd .\Web_Gun_Rerun\Web\
start cmd /k python autohttpd
cd ..\..\

:waitLoop
if not exist %filename% (
    timeout /nobreak /t 1 >nul
    goto waitLoop
)

set /p port=<%filename%

start http://localhost:%port%
del %filename%

endlocal