@echo off
cd ..
"D:/Program Files/7-Zip/7z.exe" a RetroUI-P5e.zip "I:\DnD\FoundryVtt\Data\modules\RetroUI-P5e" -xr!*.git* -xr!makezip.bat -xr!Thumbs.db -xr!*.zip -xr!*.pdn -xr!exclude
pause

