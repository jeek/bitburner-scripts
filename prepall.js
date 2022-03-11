function fGetServer(ns, serverName) {
	var data = ns.getServer(serverName);
	if (serverName == "home") {
		data.maxRam = Math.max(0, data.maxRam - 80);
		data.ramUsed = Math.max(0, data.ramUsed);
	}
	return data;
}
/** @param {NS} ns **/
export async function main(ns) {
	ns.exit();
	ns.disableLog('disableLog');
	ns.disableLog('sleep');
	let pids = [];
	var serverlist = ['home'];
	var pickServers = ['home'];
	for (let i = 0; i < pickServers.length; i++) {
		let current = ns.scan(pickServers[i]);
		for (let j = 0; j < current.length; j++) {
			if (!pickServers.includes(current[j])) {
				pickServers.push(current[j]);
			}
		}
	}
	pickServers = pickServers.filter(x => ns.hasRootAccess(x));
	ns.toast(pickServers);
	var i = 0;
	var debug = false;
	var targetserver = "";
	var bestmoney = 0;
	var done = false;
	let reallydone = false;
	while (!reallydone) {
		reallydone = true;
		for (var i = 0; i < serverlist.length; i++) {
			if (ns.hasRootAccess(serverlist[i])) {
				ns.toast("Big Prep on " + serverlist[i]);
				while (ns.getServerMinSecurityLevel(serverlist[i]) < ns.getServerSecurityLevel(serverlist[i])) {
					let target = serverlist[i];
					pids.push(ns.run('/jeek/prep.js', 1, target));
					if (pids[0] == 0) {
						pids.pop();
					}
					while (pids.length > 0) {
						while (ns.isRunning(pids[0])) {
							await ns.sleep(100);
						}
						pids.shift();
					}
					ns.spawn('/jeek/prepall.js');
				}
			}
			if (!done) {
				var current = ns.scan(serverlist[i]);
				for (var j = 0; j < current.length; j++) {
					if (!serverlist.includes(current[j])) {
						serverlist.push(current[j]);
					}
				}
			}
		}
		done = true;
	}
}