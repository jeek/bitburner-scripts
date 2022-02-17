/** @param {NS} ns **/
export async function main(ns) {
	var self = ns.getPlayer();
	for (var i in [
		    ['BruteSSH.exe', 50],
			['FTPCrack.exe', 100],
			['relaySMTP.exe', 250],
			['HTTPCrack.exe', 500],
			['SQLInject.exe', 750]]) {
		if (self.tor & !ns.fileExists(i[0])) {
			if (ns.purchaseProgram(i[0])) {
				ns.toast("Purchased " + i[0]);
			}
		}
		if (self.hacking >= i[1] & !ns.fileExists(i[0])) {
			if (!ns.isBusy()) {
				ns.toast("Writing " + i[0]);
				ns.createProgram(i[0], false);
			}
		}
	}
}
