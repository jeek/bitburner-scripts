/** @param {NS} ns **/
export async function main(ns) {
	if (ns.ps().filter(x => x.filename=='/jeek/checktarget.js').length > 1) {
		ns.exit();
	};
	var procs = ns.ps();
	var z = 0;
	// ns.tprint(procs);
	let pid=ns.run('/jeek/prep.js', 1, ns.args[0]);
	if (pid > 0) {
		while (ns.isRunning(pid)) {
			await ns.sleep(1000);
		}
	}
	if (!ns.args.includes("everyone")) {
		for (var i = 0; i < procs.length; i++) {
			if ((procs[i].filename == "/jeek/batch.js") & (procs[i].args[0] != ns.args[0])) {
				ns.kill(procs[i].pid);
				while (ns.isRunning(procs[i].pid)) {
					await ns.sleep(1);
				}
			}
			if ((procs[i].filename == "/jeek/batch2.js") & (procs[i].args[0] != ns.args[0])) {
				ns.kill(procs[i].pid);
				while (ns.isRunning(procs[i].pid)) {
					await ns.sleep(1);
				}
			}
		}
	}
//	if (ns.getServerMaxRam('home') >= 1024 && ns.fileExists('Formulas.exe')) {
//		ns.run('/jeek/batch2.js', 1, ns.args[0], "5");
//	} else {
		ns.run('/jeek/batch.js', 1, ns.args[0], 'home');
//	}
	ns.run('/jeek/start2.js');
}