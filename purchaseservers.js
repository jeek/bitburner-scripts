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
	if (ns.fileExists("relaySMTP.exe")) {
		if (ns.getPurchasedServers().length < ns.getPurchasedServerLimit()) {
			if (ns.purchaseServer("pserv-" + ns.getPurchasedServers().length.toString(), 32)) {
				ns.toast("Purchased a 32GB Server...")
				startover(ns);
			}
		} else {
			if (ns.fileExists("SQLInject.exe")) {
				var servers = ns.getPurchasedServers().map(x => ns.getServer(x)).sort(function (a, b) {
					a.maxRam - b.maxRam;
				});
				var targetRam = servers[0].maxRam * servers[0].maxRam;
				if (targetRam > ns.getPurchasedServerMaxRam()) {
					targetRam = ns.getPurchasedServerMaxRam();
				}
				if (targetRam > servers[0].maxRam) {
					if (ns.getPurchasedServerCost(targetRam) <= ns.getPlayer().money) {
						var newname = servers[0].hostname;
						ns.deleteServer(newname);
						if (ns.purchaseServer(newname, targetRam)) {
							ns.toast("Purchased a " + targetRam.toString() + "GB Server...")
							startover(ns);
							ns.scp('/jeek/hack.js', newname);
							ns.scp('/jeek/grow.js', newname);
							ns.scp('/jeek/weaken.js', newname);
						}
					}
				}
			}
		}
	}
}
