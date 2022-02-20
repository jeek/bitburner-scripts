/** @param {NS} ns **/
export async function main(ns) {
	var serverlist = ['home'];
	var i = 0;
	var pid;
	for (var i = 0; i < serverlist.length; i++) {
		if (serverlist[i] != "home") {
			pid = ns.run('/jeek/hackit.js', 1, serverlist[i]);
			while (ns.isRunning(pid)) {
				await ns.sleep(1);
			}
		}
		var current = ns.scan(serverlist[i]);
		for (var j = 0; j < current.length; j++) {
			if (!serverlist.includes(current[j])) {
				serverlist.push(current[j]);
			}
		}
	}
}
