/** @param {NS} ns **/
export async function main(ns) {
	var serverlist = ['home'];
	var i = 0;
	var pids = [];
	for (var i = 0; i < serverlist.length; i++) {
		if (serverlist[i] != "home") {
			pids.push(ns.run('/jeek/hackit.js', 1, serverlist[i]));
		}
		var current = ns.scan(serverlist[i]);
		for (var j = 0; j < current.length; j++) {
			if (!serverlist.includes(current[j])) {
				serverlist.push(current[j]);
			}
		}
		while (pids.length > 0) {
			while (ns.isRunning(pids[0])) {
				await ns.sleep(1);
			}
			pids.pop(0);
		}
	}
}
