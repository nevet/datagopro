#!/usr/bin/expect -f

set passwd [lindex $argv 0]
set action [lindex $argv 1]

if ($action == "monitor") {
	spawn ssh admin@datagopro.com sudo /var/www/html/monitor_remote.sh
} else
if ($action == "update") {
	spawn ssh admin@datagopro.com sudo /var/www/html/update_remote.sh
}

expect "assword:"
send "$passwd\r"
interact