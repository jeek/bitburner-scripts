/** @param {NS} ns **/
export async function main(ns) {
	var parent = Object();
	var serverlist = ['home'];
	var startlevel = ns.getPlayer()['hacking'];
	for (var i = 0; i < serverlist.length; i++) {
		var current = ns.scan(serverlist[i]);
		for (var j = 0; j < current.length; j++) {
			if (!serverlist.includes(current[j])) {
				parent[current[j]] = serverlist[i];
				serverlist.push(current[j]);
			}
		}
		await ns.sleep(1);
	}
	var z = 0;
	serverlist.sort((a, b) => {
		return ns.getServerMaxMoney(b) - ns.getServerMaxMoney(a);
	});
	for (var i = serverlist.length - 1; i >= 0; i--) {
		if (ns.getPlayer()['hacking'] > startlevel) {
			startlevel = ns.getPlayer()['hacking'];
			i = serverlist.length-1;
		}
		if (ns.hasRootAccess(serverlist[i]) & serverlist[i] != "home" && !(ns.getServer(serverlist[i]).purchasedByPlayer) && !(ns.getServer(serverlist[i]).backdoorInstalled) && ns.getServer(serverlist[i]).requiredHackingSkill <= ns.getPlayer()['hacking']) {
			ns.toast("Backdooring " + serverlist[i]);
			ns.connect("home");
			var j = serverlist[i];
			while (ns.getCurrentServer() != serverlist[i]) {
				if (parent[j] == ns.getCurrentServer()) {
					ns.connect(j);
					j = serverlist[i];
				} else {
					j = parent[j];
				}
				await ns.sleep(15);
			}
			z = z + 1;
			await ns.installBackdoor();
			await ns.sleep(15);
		}
	}
	if (z > 0) {
		ns.connect("home");
	}
}