/** @param {NS} ns **/
function startover(ns) {
	var procs = ns.ps();
	for (var i = 0; i < procs.len; i++) {
		if (procs[i].filename == "/jeek/batch.js" |
			procs[i].filename == "/jeek/simplehack.js") {
			ns.kill(procs[i].pid);
		}
	}
}

export async function main(ns) {
	var self = ns.getPlayer();
	var cost = Object();
	cost['BruteSSH.exe'] = 50;
	cost['FTPCrack.exe'] = 100;
	cost['relaySMTP.exe'] = 250;
	cost['HTTPWorm.exe'] = 500;
	cost['SQLInject.exe'] = 750;
	var progs = ['BruteSSH.exe', 'FTPCrack.exe', 'relaySMTP.exe', 'HTTPWorm.exe', 'SQLInject.exe']
	for (var j in progs) {
		var i = progs[j];
		if (self.tor && !ns.fileExists(i)) {
			if (ns.purchaseProgram(i)) {
				ns.toast("Purchased " + i);
				startover(ns);
			}
		}
		if (self['hacking'] >= cost[i] && !ns.fileExists(i)) {
			if (!ns.isBusy()) {
				if (ns.createProgram(i, false)) {
					ns.toast("Writing " + i);
 				}
			}
		}
	}
}
