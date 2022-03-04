/** @param {NS} ns **/

function bestserver(ns) {
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

	}
	serverlist = serverlist.filter(x => ns.hasRootAccess(x));
	serverlist = serverlist.filter(y => ns.getServerRequiredHackingLevel(y) <= targetLevel);
	serverlist = serverlist.sort(function (a, b) {
		return ns.hackAnalyzeChance(a) * (100 - ns.getServer(a).hackDifficulty) * (ns.getPlayer()['hacking'] - (ns.getServerRequiredHackingLevel(a) - 1)) * ns.getServerMaxMoney(a) / (ns.getHackTime(a) * ns.hackAnalyzeThreads(a, 1)) -
			ns.hackAnalyzeChance(b) * (100 - ns.getServer(b).hackDifficulty) * (ns.getPlayer()['hacking'] - (ns.getServerRequiredHackingLevel(b) - 1)) * ns.getServerMaxMoney(b) / (ns.getHackTime(b) * ns.hackAnalyzeThreads(b, 1))
	});
	serverlist = serverlist.filter(x => x != "The-Cave").filter(x => x != "run4theh111z").filter(x => x != "avmnite-02h").filter(x => x != ".").filter(x => x != "I.I.I.I").filter(y => !(ns.getPurchasedServers().includes(y)));
	if (serverlist.length > 0) {
		targetserver = serverlist[serverlist.length - 1];
	} else {
		targetserver = "n00dles";
	}
	// ns.toast("Best Server: " + targetserver);
	return targetserver;
}

export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	ns.disableLog("scan");
	while (true) {
		if (ns.getServerMaxRam('home') >= 64) {
			ns.run('/jeek/overview.js', 1);
			ns.run('/jeek/prepall.js', 1);
		}
		var self = ns.getPlayer();
		var startlevel = self['hacking'];
		var bootstrap = ['/jeek/contracts.js', '/jeek/pop_all.js', '/jeek/purchasetor.js', '/jeek/checkprogs.js', '/jeek/upgradehomeram.js', '/jeek/purchaseservers.js', '/jeek/installbackdoors.js', '/jeek/buyaugs.js'
			//, '/jeek/commitcrime.js'
		];
		for (var progi in bootstrap) {
			var prog = bootstrap[progi];
			var pid = ns.run(prog, 1);
			if (ns.getServerMaxRam('home') < 1024) {
				if (pid > 0) {
					while (ns.isRunning(pid)) {
						await ns.sleep(100);
					}
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
		await ns.sleep(100);
		var target = "n00dles";
		if (ns.getPlayer()['hacking'] > 5) {
			target = bestserver(ns);
		} else {
			ns.nuke('n00dles');
		}
		if ((ns.getServer('home').maxRam + ns.getPurchasedServers().map(x => ns.getServer(x).maxRam).reduce((a, b) => a + b, 0) < 1024)) {
			ns.spawn('/jeek/bootstraphack.js', 1, target);
		} else if ((ns.getServer('home').maxRam + ns.getPurchasedServers().map(x => ns.getServer(x).maxRam).reduce((a, b) => a + b, 0) < 32 * 1024)) {
			ns.run('/jeek/checktarget.js', 1, target);
		} else {
			ns.run('/jeek/rooted.js');
		}
		await ns.sleep(1);
	}
	ns.run('quicktest.js', 1);
}
