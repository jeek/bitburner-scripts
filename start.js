/** @param {NS} ns **/

async function bestserver(ns) {
	var self = ns.getPlayer();
	var targetLevel = self['hacking'] / 2;
	var serverlist = ['home'];
	var i = 0;
	var targetserver = "";
	var bestmoney = 0;
	for (var i = 0; i < serverlist.length; i++) {
		if (serverlist[i] != "home") {
			var threads = Math.floor((ns.getServerMaxRam('home') - ns.getServerUsedRam('home')) / ns.getScriptRam('/jeek/simplehack.js'));
			while (threads == 0) {
				await ns.sleep(1);
				threads = Math.floor((ns.getServerMaxRam('home') - ns.getServerUsedRam('home')) / ns.getScriptRam('/jeek/simplehack.js'));
			}
			var pid = ns.run('/jeek/hackit.js', threads, serverlist[i]);
			while (ns.isRunning(pid)) {
				await ns.sleep(1);
			}
		}
		if (ns.hasRootAccess(serverlist[i]) & (ns.getServerRequiredHackingLevel(serverlist[i]) <= targetLevel) & (ns.getServerMaxMoney(serverlist[i]) > bestmoney)) {
			targetserver = serverlist[i];
			bestmoney = ns.getServerMaxMoney(targetserver);
		};
		var current = ns.scan(serverlist[i]);
		for (var j = 0; j < current.length; j++) {
			if (!serverlist.includes(current[j])) {
				serverlist.push(current[j]);
			}
		}
	}
	ns.toast("Best Server: " + targetserver)
	return targetserver;
}

export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	ns.disableLog("scan");

	var self = ns.getPlayer();
	while (self['hacking'] < 10) {
		var bootstrapMem = ns.getScriptRam('/jeek/simplehack.js');
		var pid = ns.run('/jeek/simplehack.js', Math.floor((ns.getServerMaxRam('home') - ns.getServerUsedRam('home')) / ns.getScriptRam('/jeek/simplehack.js')), 'n00dles');
		while (ns.isRunning('/jeek/simplehack.js', 'home', 'n00dles')) {
			await ns.sleep(100);
		}
		var self = ns.getPlayer();
		await ns.sleep(100);
	}
	var bootstrap = ['/jeek/purchasetor.js', '/jeek/checkprogs.js', '/jeek/upgradehomeram.js'];
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
	var target = await bestserver(ns);
	var n00dles = ns.getServer(target);
	if ((n00dles.minDifficulty + 5 < n00dles.hackDifficulty) | (n00dles.moneyAvailable < n00dles.moneyMax)) {
		if (n00dles.minDifficulty + 5 < n00dles.hackDifficulty) {
			ns.toast("Weaken " + target);
			for (var i = 0; i < serverlist.length; i++) {
				if (ns.hasRootAccess(serverlist[i])) {
					if (serverlist[i] != 'home') {
						await ns.scp('/jeek/weaken.js', serverlist[i]);
					}
					if (Math.floor((ns.getServerMaxRam(serverlist[i]) - ns.getServerUsedRam(serverlist[i])) / ns.getScriptRam('/jeek/weaken.js')) >= 1) {
						ns.exec('/jeek/weaken.js', serverlist[i], Math.floor((ns.getServerMaxRam(serverlist[i]) - ns.getServerUsedRam(serverlist[i])) / ns.getScriptRam('/jeek/weaken.js')), target);
					}
				}

				var current = ns.scan(serverlist[i]);
				for (var j = 0; j < current.length; j++) {
					if (!serverlist.includes(current[j])) {
						serverlist.push(current[j]);
					}
				}
			}
			while (ns.isRunning('/jeek/weaken.js', 'home', target)) {
				await ns.sleep(100);
			}
		}
		if (n00dles.moneyAvailable < n00dles.moneyMax) {
			ns.toast("Grow on " + target);
			for (var i = 0; i < serverlist.length; i++) {
				if (ns.hasRootAccess(serverlist[i])) {
					if (serverlist[i] != 'home') {
						await ns.scp('/jeek/grow.js', serverlist[i]);
					}
					if (Math.floor((ns.getServerMaxRam(serverlist[i]) - ns.getServerUsedRam(serverlist[i])) / ns.getScriptRam('/jeek/grow.js')) >= 1) {
						ns.exec('/jeek/grow.js', serverlist[i], Math.floor((ns.getServerMaxRam(serverlist[i]) - ns.getServerUsedRam(serverlist[i])) / ns.getScriptRam('/jeek/grow.js')), target);
					}
				}

				var current = ns.scan(serverlist[i]);
				for (var j = 0; j < current.length; j++) {
					if (!serverlist.includes(current[j])) {
						serverlist.push(current[j]);
					}
				}
			}
			while (ns.isRunning('/jeek/grow.js', 'home', target)) {
				await ns.sleep(100);
			}
		}
		n00dles = ns.getServer(target);
	} else {
		while (n00dles.moneyAvailable * 2 > n00dles.moneyMax) {
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

				var current = ns.scan(serverlist[i]);
				for (var j = 0; j < current.length; j++) {
					if (!serverlist.includes(current[j])) {
						serverlist.push(current[j]);
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
