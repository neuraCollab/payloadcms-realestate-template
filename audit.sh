#!/bin/bash
echo "=== Аудит секретов и приватных данных ===" > audit_report.txt
echo "" >> audit_report.txt

echo "--- 1. Email-адреса ---" >> audit_report.txt
grep -r -I -o -E "[a-zA-Z0-9_\.\+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+" src/endpoints/seed* docs/labs/ src/app/\(frontend\)/next/seed* | sort | uniq >> audit_report.txt

echo "" >> audit_report.txt
echo "--- 2. Номера телефонов (+7 / 8) ---" >> audit_report.txt
grep -r -I -o -E "(\+7|8)[ \-\(]*[0-9]{3}[ \-\)]*[0-9]{3}[ \-]*[0-9]{2}[ \-]*[0-9]{2}" src/endpoints/seed* docs/labs/ src/app/\(frontend\)/next/seed* | grep -v "81000000000" | sort | uniq >> audit_report.txt

echo "" >> audit_report.txt
echo "--- 3. Банковские аккаунты (20 цифр) ---" >> audit_report.txt
grep -r -I -o -E "[0-9]{20}" src/endpoints/seed* docs/labs/ src/app/\(frontend\)/next/seed* | sort | uniq >> audit_report.txt

echo "" >> audit_report.txt
echo "--- 4. Пароли, Секреты и Токены (hardcoded) ---" >> audit_report.txt
grep -r -I -E "(password|secret|token|api_?key|API_?KEY)[ \t]*[:=][ \t]*['\"][^'\"]+['\"]" src/endpoints/seed* docs/labs/ src/app/\(frontend\)/next/seed* | sort | uniq >> audit_report.txt

echo "" >> audit_report.txt
echo "--- 5. Реальные домены (исключая example.com, localhost) ---" >> audit_report.txt
grep -r -I -o -E "https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" src/endpoints/seed* docs/labs/ src/app/\(frontend\)/next/seed* | grep -v -i -E "(example\.com|localhost|payloadcms\.com|github\.com|unsplash\.com)" | sort | uniq >> audit_report.txt

echo "=======================================" >> audit_report.txt
cat audit_report.txt
