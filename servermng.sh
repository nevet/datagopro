#!/usr/bin/expect -f

set passwd [lindex $argv 0]
set action [lindex $argv 1]

if { $action == "monitor"} {
	set cmd "sudo /var/www/html/monitor_remote.sh"
} elseif { $action == "update"} {
	set cmd "sudo /var/www/html/update_remote.sh"
}

spawn ssh admin@datagopro.com $cmd
expect "assword:"
send "$passwd\r"
interact