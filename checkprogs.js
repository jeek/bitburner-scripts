/** @param {NS} ns **/
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
		if (self.tor & !ns.fileExists(i)) {
			if (ns.purchaseProgram(i)) {
				ns.toast("Purchased " + i);
			}
		}
		if (self['hacking'] >= cost[i] & !ns.fileExists(i)) {
			if (!ns.isBusy()) {
				ns.toast("Writing " + i);
				ns.createProgram(i, false);
			}
		}
	}
}
