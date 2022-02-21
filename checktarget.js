/** @param {NS} ns **/
export async function main(ns) {
	var procs = ns.ps();
	var z = 0;
	// ns.tprint(procs);
	for (var i = 0; i < procs.length; i++) {
		if ((procs[i].filename == "/jeek/batch.js") & (procs[i].args[0] != ns.args[0])) {
			ns.kill(procs[i].pid);
			while (ns.isRunning(procs[i].pid)) {
				await ns.sleep(1);
			}
		}
	}
	ns.run('/jeek/batch.js', 1, ns.args[0]);
	ns.run('/jeek/start2.js');
}
