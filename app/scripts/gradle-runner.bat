@echo off
setlocal
set GRADLE_HOME=D:\TOOLS WEB TOOLS\ytplayables\app\android\gradle-8.7
set PROJECT_DIR=D:\TOOLS WEB TOOLS\ytplayables\app\android
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.10-hotspot

set PATH=%GRADLE_HOME%\bin;%JAVA_HOME%\bin;%PATH%

cd /d "%PROJECT_DIR%"
gradle %*
endlocal