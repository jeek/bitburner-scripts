/** @param {NS} ns **/

async function bestserver(ns) {
	var self = ns.getPlayer();
	var targetLevel = self['hacking'] / 2;
	if (targetLevel < 5) {
		targetLevel = 5;
	}
	var serverlist = ['home'];
	var i = 0;
	var targetserver = "";
	var bestmoney = 0;
	for (var i = 0; i < serverlist.length; i++) {
		var current = ns.scan(serverlist[i]);
		for (var j = 0; j < current.length; j++) {
			if (!serverlist.includes(current[j])) {
				serverlist.push(current[j]);
			}
		}
		await ns.sleep(1);
	}
	serverlist = serverlist.filter(x => ns.hasRootAccess(x));
	serverlist = serverlist.filter(y => ns.getServerRequiredHackingLevel(y) <= targetLevel);
	serverlist = serverlist.sort(function (a, b) {
		ns.hackAnalyzeChance(a) * (100 - ns.getServer(a).hackDifficulty) * (ns.getPlayer()['hacking'] - (ns.getServerRequiredHackingLevel(a) - 1)) * ns.getServerMaxMoney(a) / (ns.getHackTime(a) * ns.hackAnalyzeThreads(a, 1)) -
			ns.hackAnalyzeChance(b) * (100 - ns.getServer(b).hackDifficulty) * (ns.getPlayer()['hacking'] - (ns.getServerRequiredHackingLevel(b) - 1)) * ns.getServerMaxMoney(b) / (ns.getHackTime(b) * ns.hackAnalyzeThreads(b, 1))
	});
	if (serverlist.length > 0) {
		targetserver = serverlist[serverlist.length - 1];
	} else {
		targetserver = n00dles;
	}
	ns.toast("Best Server: " + targetserver);
	return targetserver;
}

export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	ns.disableLog("scan");

	var self = ns.getPlayer();
	var startlevel = self['hacking'];
	var bootstrap = ['/jeek/pop_all.js', '/jeek/purchasetor.js', '/jeek/checkprogs.js', '/jeek/upgradehomeram.js', '/jeek/purchaseservers.js', '/jeek/installbackdoors.js', '/jeek/commitcrime.js'];
	for (var progi in bootstrap) {
		var prog = bootstrap[progi];
		var pid = ns.run(prog, 1);
		if (pid > 0) {
			while (ns.isRunning(pid)) {
				await ns.sleep(100);
			}
		}
	}
	var serverlist = ['home'];
	for (var i = 0; i < serverlist.length; i++) {
		var current = ns.scan(serverlist[i]);
		for (var j = 0; j < current.length; j++) {
			if (!serverlist.includes(current[j])) {
				serverlist.push(current[j]);
			}
		}
	}
	var target = "n00dles";
	if (ns.getPlayer()['hacking'] > 5) {
		target = await bestserver(ns);
	} else {
		ns.nuke('n00dles');
	}
	var n00dles = ns.getServer(target);
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
			ns.toast("Hacking " + target);
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
