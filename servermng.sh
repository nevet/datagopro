#!/usr/bin/expect -f

set passwd [lindex $argv 0]
set action [lindex $argv 1]

if { $passwd == "" || $action == ""} {
	puts "usage: \[password_for_admin\] \[action_code\]";
	puts "action_code: monitor, update"
} else {
	if { $action == "monitor"} {
		set cmd "sudo /var/www/html/misc/monitor_remote.sh"
	} elseif { $action == "update"} {
		set cmd "sudo /var/www/html/misc/update_remote.sh"
	}

	spawn ssh admin@datagopro.com $cmd
	expect "assword:"
	send "$passwd\r"
	interact
}