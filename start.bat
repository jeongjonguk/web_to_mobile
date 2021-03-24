rem 시크릿 모드
rem --incognito

cmd /c start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"  --disable-site-isolation-trials --disable-web-security --user-data-dir="%CD%\tmp" --allow-file-access-from-files "%CD%"\html\web_to_mobile.html
