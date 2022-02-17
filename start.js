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
			var pid = ns.run('/jeek/hackit.js', Math.floor((ns.getServerMaxRam('home') - ns.getServerUsedRam('home')) / ns.getScriptRam('/jeek/simplehack.js')), serverlist[i]);
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
	var self = ns.getPlayer();
	ns.tprint(self['hacking']);
	while (self['hacking'] < 10) {
		var bootstrapMem = ns.getScriptRam('/jeek/simplehack.js');
		var pid = ns.run('/jeek/simplehack.js', Math.floor((ns.getServerMaxRam('home') - ns.getServerUsedRam('home')) / ns.getScriptRam('/jeek/simplehack.js')), 'n00dles');
		while (ns.isRunning('/jeek/simplehack.js', 'home', 'n00dles')) {
			await ns.sleep(100);
		}
		var self = ns.getPlayer();
		await ns.sleep(100);
	}
	for (var prog in ['/jeek/purchasetor.js', '/jeek/checkprogs.js', '/jeek/upgradehomeram.js']) {
		var pid = ns.run(prog, 1);
		while (ns.isRunning(pid, 'home')) {
			await ns.sleep(100);
		}
	}
	var target = await bestserver(ns);
	ns.toast('Best Server: ' + target);
	var pid = ns.run('/jeek/simplehack.js', Math.floor((ns.getServerMaxRam('home') - ns.getServerUsedRam('home')) / ns.getScriptRam('/jeek/simplehack.js')), target);
	if (pid > 0) {
		while (ns.isRunning('/jeek/simplehack.js', 'home', target)) {
			await ns.sleep(100);
		}
	}
	await ns.run('start.js', 1)
}
