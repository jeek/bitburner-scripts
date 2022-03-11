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
	if (ns.getServerMaxRam('home') > 32) {
		if (ns.fileExists("relaySMTP.exe")) {
			if (ns.getPurchasedServers().length < ns.getPurchasedServerLimit()) {
				while (ns.purchaseServer("pserv-" + ns.getPurchasedServers().length.toString(), Math.min(ns.getPurchasedServerMaxRam(), 2 ** (5 + ns.getPurchasedServers().length)))) {
					//				while (ns.purchaseServer("pserv-" + ns.getPurchasedServers().length.toString(), Math.min(ns.getPurchasedServerMaxRam(), ns.getServerMaxRam('home')))) {
					ns.toast("Purchased a " + Math.min(ns.getPurchasedServerMaxRam(), ns.getServerMaxRam('home')) + "GB Server...")
					let newname = "pserv-" + (ns.getPurchasedServers().length-1).toString();
					await ns.scp('/jeek/hack.js', newname);
					await ns.scp('/jeek/grow.js', newname);
					await ns.scp('/jeek/weaken.js', newname);
					await ns.sleep(1);
				}
			} else {
				if (ns.fileExists("SQLInject.exe")) {
					var servers = ns.getPurchasedServers().map(x => ns.getServer(x)).sort(function (a, b) {
						return a.maxRam - b.maxRam;
					});
					var targetRam = servers[0].maxRam * servers[0].maxRam;
					var targetRam = ns.getPurchasedServerMaxRam();
					if (targetRam > ns.getPurchasedServerMaxRam()) {
						targetRam = ns.getPurchasedServerMaxRam();
					}
					if ((targetRam > servers[0].maxRam) && (servers[0].maxRam < 1024 || ns.getServer('home').maxRam >= 16 * 1024)) {
						if (ns.getPurchasedServerCost(targetRam) <= ns.getPlayer().money) {
							var newname = servers[0].hostname;
							ns.killall(newname);
							ns.deleteServer(newname);
							if (ns.purchaseServer(newname, targetRam)) {
								ns.toast("Purchased a " + targetRam.toString() + "GB Server...")
								startover(ns);
								await ns.scp('/jeek/hack.js', newname);
								await ns.scp('/jeek/grow.js', newname);
								await ns.scp('/jeek/weaken.js', newname);
							}
						}
					}
				}
			}
		}
	}
}