/** @param {NS} ns **/

function fGetServer(ns, serverName) {
	var data = ns.getServer(serverName);
	if (serverName == "home") {
		data.maxRam = Math.max(0, data.maxRam - 100);
		data.ramUsed = Math.max(0, data.ramUsed);
	}
	return data;
}

export async function main(ns) {
	var startlevel = ns.getPlayer()['hacking'];
	var pickServers = ['home'];
	var trustForm = true;
	for (var i = 0; i < pickServers.length; i++) {
		var procs = ns.ps(pickServers[i]);
		for (var j = 0; j < procs.length; j++) {
			if (procs[j].filename == "/jeek/hack.js" ||
				procs[j].filename == "/jeek/weaken.js" ||
				procs[j].filename == "/jeek/grow.js") {
				//			ns.kill(procs[j].pid);
			}
		}
		var current = ns.scan(pickServers[i]);
		for (var j = 0; j < current.length; j++) {
			if (!pickServers.includes(current[j])) {
				pickServers.push(current[j]);
			}
		}
	}
	ns.disableLog("disableLog");
	ns.disableLog("getServerUsedRam");
	ns.disableLog("getServerMaxRam");
	ns.disableLog("getServerSecurityLevel");
	ns.disableLog("getServerMinSecurityLevel");
	ns.disableLog("scp");
	ns.disableLog("sleep");
	ns.disableLog("run");
	await ns.writePort(19, "PREP " + ns.args[0]);
	var resolution = 125;
	var pids = [];
	var debug = false;
	var didone = false;
	//	var pickServers = ns.getPurchasedServers();
	var pickServers = ['home'];
	for (var i = 0; i < pickServers.length; i++) {
		if (pickServers[i] != "home") {
			await ns.scp('/jeek/hack.js', pickServers[i]);
			await ns.scp('/jeek/weaken.js', pickServers[i]);
			await ns.scp('/jeek/grow.js', pickServers[i]);
		}
		var current = ns.scan(pickServers[i]);
		for (var j = 0; j < current.length; j++) {
			if (!pickServers.includes(current[j])) {
				pickServers.push(current[j]);
			}
		}
	}
	pickServers = pickServers.filter(x => ns.hasRootAccess(x)).filter(x => ns.getServerMaxRam(x) > 0);
	//	pickServers = pickServers.filter(x => ns.hasRootAccess(x)).filter(y => y != "home");
	// Prep -> Weaken / Grow
	while ((ns.getServerMinSecurityLevel(ns.args[0]) < ns.getServerSecurityLevel(ns.args[0])) || (ns.getServerMoneyAvailable(ns.args[0]) < ns.getServerMaxMoney(ns.args[0]))) {
		//		if (ns.getServerMinSecurityLevel(ns.args[0]) < ns.getServerSecurityLevel(ns.args[0])) {
		var threadsNeeded = 1;
		while (ns.weakenAnalyze(threadsNeeded) < ns.getServerSecurityLevel(ns.args[0]) - ns.getServerMinSecurityLevel(ns.args[0])) {
			threadsNeeded = threadsNeeded += 1;
		}
		threadsNeeded += Math.ceil((5 + Math.ceil(ns.growthAnalyze(ns.args[0], Math.max(1, ns.getServerMaxMoney(ns.args[0]) / Math.max(1, ns.getServerMoneyAvailable(ns.args[0]))))) / 12.5));
		if (debug) {
			ns.tprint(threadsNeeded.toString() + " needed for first weaken");
		}
		threadsNeeded = threadsNeeded + 5;
		if (ns.getServerMoneyAvailable(ns.args[0]) < ns.getServerMaxMoney(ns.args[0])) {
			threadsNeeded += (5 + Math.ceil(ns.growthAnalyze(ns.args[0], ns.getServerMaxMoney(ns.args[0]) / Math.max(1, ns.getServerMoneyAvailable(ns.args[0]))))) / 7;
		}
		while (threadsNeeded > 0) {
			pickServers.sort(function compare1(a, b) {
				return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
			})
			if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/weaken.js')) {
				var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/weaken.js')));
				pids.push(ns.exec('/jeek/weaken.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0], "PREP", Math.random()));
				if (pids[pids.length - 1] > 0) {
					threadsNeeded -= threadsUsed;
					if (debug) {
						ns.tprint(threadsUsed.toString() + " weaken threads on " + ns.args[0] + " running on " + pickServers[pickServers.length - 1] + ", " + threadsNeeded.toString() + " threads left to assign");
					}
				} else {
					pids.pop(pids.length - 1);
				}
			}
			await ns.sleep(1);
		}

		//		}
		// Prep -> Grow
		if (ns.getServerMoneyAvailable(ns.args[0]) < ns.getServerMaxMoney(ns.args[0])) {
			var threadsNeeded = 5 + Math.ceil(ns.growthAnalyze(ns.args[0], ns.getServerMaxMoney(ns.args[0]) / Math.max(1, ns.getServerMoneyAvailable(ns.args[0]))));
			if (debug) {
				ns.tprint(threadsNeeded.toString() + " needed for grow");
			}
			while (threadsNeeded > 0) {
				pickServers.sort(function compare2(a, b) {
					return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
				})
				if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/grow.js')) {
					var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/grow.js')));
					pids.push(ns.exec('/jeek/grow.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0], "PREP", Math.random()));
					if (pids[pids.length - 1] > 0) {
						threadsNeeded -= threadsUsed;
						if (debug) {
							ns.tprint(threadsUsed.toString() + " grow threads on " + ns.args[0] + " running on " + pickServers[pickServers.length - 1] + ", " + threadsNeeded.toString() + " threads left to assign");
						}
					} else {
						pids.pop(pids.length - 1);
					}
				}
				await ns.sleep(15);
			}
			if (debug) {
				ns.tprint(pids);
			}
			while (pids.length > 0) {
				if (ns.isRunning(pids[0])) {
					await ns.sleep(1);
				} else {
					pids.pop(0);
				}
			}
		}
		while (pids.length > 0) {
			if (ns.isRunning(pids[0])) {
				await ns.sleep(1);
			} else {
				pids.pop(0);
			}
		}
		if (debug) {
			ns.tprint("Weakened / Grew " + ns.args[0]);
		}
		await ns.sleep(500);
	}
}