@REM this script is used to generate the SDK for the client
@REM this script requires docker to run openapi-generator-cli
@REM for preparation, you need to run up oshicale_server first.
@REM this script access to the server to get the openapi spec. http://127.0.0.1:8000/api/schema/
@REM this script will generate the SDK to client/proj/api
@REM run local windows machine

@echo off
setlocal enabledelayedexpansion
set cwd=%~dp0
set out=/proj/api

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| find "IPv4"') do (
    set ip_address=%%a
)
set ip_address=!ip_address: =!

echo ip address: %ip_address%
echo current working directory: %cwd%
echo output directory: %cwd%%out%

@REM get openapi spec
docker run --rm -v "%cwd%:/local" -e "JAVA_OPTS=-Dio.swagger.parser.util.RemoteUrl.trustAll=true -Dio.swagger.v3.parser.util.RemoteUrl.trustAll=true" ^
    openapitools/openapi-generator-cli generate ^
    -i https://%ip_address%/api/schema ^
    -g javascript ^
    -o /local%out%

set result=%errorlevel%
if %result% neq 0 (
    echo error: %result%
) else (
    echo success: %result%
    echo %out% is generated
)
popd
endlocal
pause
exit /b %result%
