
REM Copyright 2019 Or Chuban(choban), orchoban@gmail.com

REM    Licensed under the Apache License, Version 2.0 (the "License");
REM    you may not use this file except in compliance with the License.
REM    You may obtain a copy of the License at

REM      http://www.apache.org/licenses/LICENSE-2.0

REM    Unless required by applicable law or agreed to in writing, software
REM    distributed under the License is distributed on an "AS IS" BASIS,
REM    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
REM    See the License for the specific language governing permissions and
REM    limitations under the License.


REM echo off
if "%~1" == "init" goto init
if "%~1" == "build" goto build
if "%~1" == "react" goto react
if "%~1" == "cordova" goto cordovaRun
if "%~1" == "info" echo info=> #####Created by Or Chuban#####

:react
cd react
call npm %2 %3 %4
cd..
goto end


:cordovaRun

cd cordova
call cordova %2 %3 %4 %5
cd..

goto end



:init

call cordova create cordova %3 %2

cd react
call npm run build

cd ../cordova 
call cordova platform add android
call cordova platform add ios
call cordova platform ls

call cordova build

RD /S /Q www
mkdir www

cd ..
xcopy /s "react/build" "cordova/www"

cd cordova
call cordova build

cd..
goto end



:build
cd react
call npm run build

cd ../cordova
RD /S /Q www
mkdir www

cd..
xcopy /s "react/build" "cordova/www"

cd cordova
call cordova build

cd ..
goto end




:end
echo #####Created by Or Chuban#####
echo ######orchoban@gmail.com######