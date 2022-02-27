/** @param {NS} ns **/
export async function main(ns) {
	var parent = Object();
	var serverlist = ['home'];
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
	for (var i = 0; i < serverlist.length; i++) {
		if (serverlist[i] == ns.args[0]) {
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
		}
	}
}
