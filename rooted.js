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
	serverlist = serverlist.filter(x => ns.getServerMaxMoney(x) > 0);
	serverlist = serverlist.filter(y => ns.getServerRequiredHackingLevel(y) <= targetLevel);
	serverlist = serverlist.sort(function (a, b) {
		return ns.hackAnalyzeChance(a) * (100 - ns.getServer(a).hackDifficulty) * (ns.getPlayer()['hacking'] - (ns.getServerRequiredHackingLevel(a) - 1)) * ns.getServerMaxMoney(a) / (ns.getHackTime(a) * ns.hackAnalyzeThreads(a, 1)) -
			ns.hackAnalyzeChance(b) * (100 - ns.getServer(b).hackDifficulty) * (ns.getPlayer()['hacking'] - (ns.getServerRequiredHackingLevel(b) - 1)) * ns.getServerMaxMoney(b) / (ns.getHackTime(b) * ns.hackAnalyzeThreads(b, 1))
	});
	serverlist = serverlist.filter(x => x != "The-Cave").filter(x => x != "run4theh111z").filter(x => x != "avmnite-02h" ).filter(x => x != ".").filter(x => x != "I.I.I.I" ).filter(y => !(ns.getPurchasedServers().includes(y)));
    return serverlist;
	if (serverlist.length > 0) {
		targetserver = serverlist[serverlist.length - 1];
	} else {
		targetserver = "n00dles";
	}
	// ns.toast("Best Server: " + targetserver);
	return targetserver;
}

/** @param {NS} ns **/
export async function main(ns) {
	var self = ns.getPlayer();
	var serverlist = ['home'];
	var i = 0;
	var targetserver = "";
	var bestmoney = 0;
	for (var i = 0; i < serverlist.length; i++) {
		var current = ns.scan(serverlist[i]);
		if (ns.hasRootAccess(serverlist[i])) {
//			ns.tprint(serverlist[i] + " (" + ns.getServerRequiredHackingLevel(serverlist[i]) + ") ");// + ns.getServer(serverlist[i]).backdoorInstalled);
		}
		for (var j = 0; j < current.length; j++) {
			if (!serverlist.includes(current[j])) {
				serverlist.push(current[j]);
			}
		}
	}
	serverlist.sort(function compy(a, b) {
		return ns.getServer(a).moneyMax - ns.getServer(b).moneyMax;
	});
	serverlist = bestserver(ns);
	while (serverlist.length > 0) {
		ns.run('/jeek/batch.js', 1, serverlist[serverlist.length-1], 'everyone');
		serverlist.pop();
	}
}
