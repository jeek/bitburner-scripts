/** @param {NS} ns **/
export async function main(ns) {
	var serverlist = ['home'];
	var i = 0;
	var targetserver = "";
	var bestmoney = 0;
	var done = false;
	let reallydone = false;
	while (!reallydone) {
		reallydone = true;
		for (var i = 0; i < serverlist.length; i++) {
			if (ns.hasRootAccess(serverlist[i])) {
				ns.toast("Big Prep on " + serverlist[i]);
				if ((ns.getServerMinSecurityLevel(serverlist[i]) < ns.getServerSecurityLevel(serverlist[i])) || (ns.getServerMoneyAvailable(serverlist[i]) < ns.getServerMaxMoney(serverlist[i]))) {
					while (ns.getServerMinSecurityLevel(serverlist[i]) < ns.getServerSecurityLevel(serverlist[i])) {
						await ns.weaken(serverlist[i]);
						reallydone = false;
					}
					if (ns.getServerMoneyAvailable(serverlist[i]) < ns.getServerMaxMoney(serverlist[i])) {
						await ns.grow(serverlist[i]);
						reallydone = false;
					}
					while (ns.getServerMinSecurityLevel(serverlist[i]) < ns.getServerSecurityLevel(serverlist[i])) {
						await ns.weaken(serverlist[i]);
						reallydone = false;
					}
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
