/** @param {NS} ns **/
export async function main(ns) {
//	ns.tprint("Starting BSHack " + ns.args[0]);
	var startlevel = ns.getPlayer()['hacking'];
	var target = ns.args[0];
	var serverlist = ['home'];
	for (var i = 0; i < serverlist.length; i++) {
		var current = ns.scan(serverlist[i]);
		for (var j = 0; j < current.length; j++) {
			if (!serverlist.includes(current[j])) {
				serverlist.push(current[j]);
			}
		}
	}
	var n00dles = ns.getServer(target);
//	ns.tprint(n00dles.minDifficulty, " ", n00dles.hackDifficulty, " ", n00dles.moneyAvailable, " ", n00dles.moneyMax)
	while ((ns.getPlayer()['hacking'] == startlevel) & ((n00dles.minDifficulty + 5 < n00dles.hackDifficulty) | (n00dles.moneyAvailable < n00dles.moneyMax * .95))) {
		while ((ns.getPlayer()['hacking'] == startlevel) & (n00dles.minDifficulty + 5 < n00dles.hackDifficulty)) {
			ns.toast("Weaken " + target);
			for (var i = 0; i < serverlist.length; i++) {
				if (ns.hasRootAccess(serverlist[i])) {
					if (serverlist[i] != 'home') {
						await ns.scp('/jeek/weaken.js', serverlist[i]);
					}
					if (Math.floor((ns.getServerMaxRam(serverlist[i]) - ns.getServerUsedRam(serverlist[i])) / ns.getScriptRam('/jeek/weaken.js')) >= 1) {
						while (0 == ns.exec('/jeek/weaken.js', serverlist[i], Math.floor((ns.getServerMaxRam(serverlist[i]) - ns.getServerUsedRam(serverlist[i])) / ns.getScriptRam('/jeek/weaken.js')), target)) {
							await ns.sleep(15);
						}
					}
				}
			}
			while (ns.isRunning('/jeek/weaken.js', 'home', target)) {
				await ns.sleep(100);
			}
			n00dles = ns.getServer(target);
		}
		if (n00dles.moneyAvailable < n00dles.moneyMax * .95) {
			ns.toast("Grow on " + target);
			for (var i = 0; i < serverlist.length; i++) {
				if (ns.hasRootAccess(serverlist[i])) {
					if (serverlist[i] != 'home') {
						await ns.scp('/jeek/grow.js', serverlist[i]);
					}
					if (Math.floor((ns.getServerMaxRam(serverlist[i]) - ns.getServerUsedRam(serverlist[i])) / ns.getScriptRam('/jeek/grow.js')) >= 1) {
						while (0 == ns.exec('/jeek/grow.js', serverlist[i], Math.floor((ns.getServerMaxRam(serverlist[i]) - ns.getServerUsedRam(serverlist[i])) / ns.getScriptRam('/jeek/grow.js')), target)) {
							await ns.sleep(15);
						}
					}
				}

			}
			while (ns.isRunning('/jeek/grow.js', 'home', target)) {
				await ns.sleep(100);
			}
		}
		n00dles = ns.getServer(target);
		await ns.sleep(16 * serverlist.length);
	}
	if ((n00dles.minDifficulty + 5 >= n00dles.hackDifficulty) & (n00dles.moneyAvailable >= n00dles.moneyMax * .94)) {
		while ((ns.getPlayer()['hacking'] == startlevel) & (n00dles.moneyAvailable * 2 > n00dles.moneyMax)) {
			ns.tprint("Hacking " + target);
			for (var i = 0; i < serverlist.length; i++) {
				if (ns.hasRootAccess(serverlist[i])) {
					if (serverlist[i] != 'home') {
						await ns.scp('/jeek/hack.js', serverlist[i]);
					}
					if (Math.floor((ns.getServerMaxRam(serverlist[i]) - ns.getServerUsedRam(serverlist[i])) / ns.getScriptRam('/jeek/hack.js')) >= 1) {
						ns.exec('/jeek/hack.js', serverlist[i], Math.floor((ns.getServerMaxRam(serverlist[i]) - ns.getServerUsedRam(serverlist[i])) / ns.getScriptRam('/jeek/hack.js')), target);
					}
				}
			}
			while (ns.isRunning('/jeek/hack.js', 'home', target)) {
				await ns.sleep(100);
			}
			n00dles = ns.getServer(target);
			await ns.sleep(10);
		}
	}
	while (!ns.isRunning('/jeek/start2.js', 'home')) {
		await ns.sleep(100);
		ns.run('/jeek/start2.js', 1)
	}

}
