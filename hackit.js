function startover(ns) {
	var procs = ns.ps();
	for (var i = 0; i < procs.len; i++) {
		if (procs[i].filename == "/jeek/batch.js" |
			procs[i].filename == "/jeek/simplehack.js") {
			ns.kill(procs[i].pid);
		}
	}
}

/** @param {NS} ns **/
export async function main(ns) {
	var z = 0;
	if (ns.fileExists('BruteSSH.exe')) {
		ns.brutessh(ns.args[0]);
		z += 1;
	}
	if (ns.fileExists('RelaySMTP.exe')) {
		ns.relaysmtp(ns.args[0]);
		z += 1;
	}
	if (ns.fileExists('FTPCrack.exe')) {
		ns.ftpcrack(ns.args[0]);
		z += 1;
	}
	if (ns.fileExists('HTTPWorm.exe')) {
		ns.httpworm(ns.args[0]);
		z += 1;
	}
	if (ns.fileExists('SQLInject.exe')) {
		ns.sqlinject(ns.args[0]);
		z += 1;
	}
	if (!ns.hasRootAccess(ns.args[0])) {
		if (z >= ns.getServerNumPortsRequired(ns.args[0])) {
			ns.toast('Gained Access to ' + ns.args[0]);
			ns.nuke(ns.args[0]);
			startover(ns);
		}
	}
}
