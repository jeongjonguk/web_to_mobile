#! /bin/sh

CWD="`pwd`"

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-site-isolation-trials --disable-web-security --user-data-dir="${CWD}/tmp" --allow-file-access-from-files ${CWD}/html/web_to_mobile.html
