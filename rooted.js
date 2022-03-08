function getOptimalServer(target, ns) {
	let result = ns.getServer(target);
	result.hackDifficulty = result.minDifficulty;
	result.moneyAvailable = result.moneyMax;
	return result;
}

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
		return ns.getServer(a).maxMoney*ns.getServer(a).serverGrowth - ns.getServer(b).maxMoney*ns.getServer(b).serverGrowth;
		return ns.hackAnalyzeChance(a) * (100 - ns.getServer(a).minDifficulty) * (ns.getPlayer()['hacking'] - (ns.getServerRequiredHackingLevel(a) - 1)) * ns.getServerMaxMoney(a) / (ns.formulas.hacking.hackTime(getOptimalServer(a, ns), ns.getPlayer()) * ns.hackAnalyzeThreads(a, 1)) -
			ns.hackAnalyzeChance(b) * (100 - ns.getServer(b).minDifficulty) * (ns.getPlayer()['hacking'] - (ns.getServerRequiredHackingLevel(b) - 1)) * ns.getServerMaxMoney(b) / (ns.formulas.hacking.hackTime(getOptimalServer(b, ns), ns.getPlayer()) * ns.hackAnalyzeThreads(b, 1))
	});
	serverlist = serverlist.filter(x => x != "The-Cave").filter(x => x != "run4theh111z").filter(x => x != "avmnite-02h").filter(x => x != ".").filter(x => x != "I.I.I.I").filter(y => !(ns.getPurchasedServers().includes(y)));
	return serverlist;
}

/** @param {NS} ns **/
export async function main(ns) {
	//ns.tail();
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
	let z = 0;
	let totalram = ns.getServer('home').maxRam + ns.getPurchasedServers().map(x => ns.getServer(x).maxRam).reduce((a, b) => a + b, 0);
	while (serverlist.length > 3) {
		serverlist.shift();
	}
	let procs = ns.ps('home');
	for (let i = 0; i < procs.length; i++) {
		if (procs[i].filename == '/jeek/batch2.js' && !serverlist.includes(procs[i].args[0])) {
			ns.kill(procs[i].pid);
		}
	}
	let massacre = ['home'];
	for (let i = 0; i < massacre.length; i++) {
		let procs = ns.ps('home');
		for (let j = 0; j < procs.length; j++) {
			if (['/jeek/grow.js', '/jeek/weaken.js', '/jeek/hack.js'].includes(procs[j].filename)) {
				if (!serverlist.includes(procs[j].args[0])) {
					ns.kill(procs[j].pid);
				}
			}
			if (['/jeek/batch.js'].includes(procs[j].filename)) {
				ns.kill(procs[j].pid);
			}
		}
		var current = ns.scan(massacre[i]);
		for (let j = 0; j < current.length; j++) {
			if (!massacre.includes(current[j])) {
				massacre.push(current[j]);
			}
		}
	}
	ns.print(serverlist);
	//	ns.toast(serverlist);
	//	ns.tail();
	while (serverlist.length > 0) {
		ns.run('/jeek/batch2.js', 1, serverlist[serverlist.length - 1], 'everyone');
		serverlist.pop();
		z += 1;
		if (z * 2048 > totalram) {
			//while (serverlist.length > 0) {
			//	serverlist.pop();
			//}
		}
		await ns.sleep(0);
	}
	await ns.sleep(300);
}
