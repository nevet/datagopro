#!/usr/bin/expect -f

set passwd [lindex $argv 0]

spawn ssh admin@datagopro.com sudo /var/www/html/monitor_remote.sh
expect "assword:"
send "$passwd\r"
interact
