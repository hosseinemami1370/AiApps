#!/usr/bin/env bash
# Verifies server-rendered HTML (no browser/JS). Usage: npm run test:ssr [baseUrl]
B=${1:-http://localhost:8123}; fail=0
chk(){ curl -s "$B$1" | grep -qi -- "$2" && echo "ok   $1 ~ $2" || { echo "FAIL $1 ~ $2"; fail=1; }; }
chk /en '<html lang="en" dir="ltr"'
chk /fa '<html lang="fa" dir="rtl"'
chk /en '<h1'
chk /en/apps 'ChatNova'
chk '/fa/apps?category=audio' 'TuneGen'
chk /en/app/chatnova 'application/ld+json'
chk /en/app/chatnova 'rel="canonical"'
chk /en/app/chatnova 'hreflang="fa"'
chk /fa/app/chatnova 'hreflang="x-default"'
chk /en/app/chatnova/versions/2.0.0 'older version'
chk /fa/app/chatnova/versions/2.0.0 'قدیمی'
chk /sitemap.xml 'hreflang\|xhtml:link'
chk /robots.txt 'Sitemap:'
chk /en/blog "Best AI chatbot"
chk /fa/blog "وبلاگ"
chk /en/blog/check-apk-checksum '"Article"'
chk "/en/compare?a=chatnova&b=voxa" "<table"
chk "/en/apps?page=2" 'aria-current="page"'
chk /en/app/chatnova "<dialog"
chk /en "localStorage.theme"
[ "$(curl -s $B/fa/apps | grep -c 'id="S:')" = 0 ] && echo "ok   no hidden streamed content" || { echo "FAIL hidden streamed content"; fail=1; }
[ "$(curl -s -o /dev/null -w '%{http_code}' $B/favicon.ico)" = 404 ] && echo "ok   favicon 404" || echo "note favicon status differs"
chk /en/category/audio 'TuneGen'
chk /fa/category/audio 'rel="canonical"'
chk /en/category/audio 'BreadcrumbList'
chk /en/app/chatnova '"FAQPage"'
chk /en/app/chatnova '<details'
chk /en/app/chatnova 'Pros'
chk /fa/app/chatnova 'سوالات متداول'
chk /en/app/chatnova/versions 'versions/1.0.0'
chk /sitemap.xml 'category/audio'
[ "$(curl -s -o /dev/null -w '%{http_code}' $B/en/category/nope)" = 404 ] && echo "ok   invalid category 404" || { echo "FAIL invalid category 404"; fail=1; }
[ "$(curl -s -o /dev/null -w '%{http_code}' $B/en/app/nope/versions)" = 404 ] && echo "ok   versions of unknown app 404" || { echo "FAIL versions 404"; fail=1; }
curl -sI "$B/api/download/chatnova-3.0.0" | grep -qi 'attachment' && echo "ok   download header" || { echo "FAIL download header"; fail=1; }
[ "$(curl -s -o /dev/null -w '%{http_code}' $B/en/nope)" = 404 ] && echo "ok   404 status" || { echo "FAIL 404 status"; fail=1; }
exit $fail
