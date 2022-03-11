let debug = 0;

function fGetServer(ns, serverName) {
	var data = ns.getServer(serverName);
	if (serverName == "home") {
		data.maxRam = Math.max(0, data.maxRam - 100);
		data.ramUsed = Math.max(0, data.ramUsed);
	}
	return data;
}

function getOptimalServer(target, ns) {
	let result = ns.getServer(target);
	result.hackDifficulty = result.minDifficulty;
	result.moneyAvailable = result.moneyMax;
	return result;
}

async function weakenp(target, pickServers, ns) {
	let pids = [];
	while (ns.getServer(target).hackDifficulty > ns.getServer(target).minDifficulty) {

		let threadsNeeded = 1 + Math.ceil((ns.getServer(target).hackDifficulty - ns.getServer(target).minDifficulty) / .05);
		while (threadsNeeded > 0) {
			for (let i = 0; i < pickServers.length; i++) {
				let current = ns.scan(pickServers[i]);
				for (let j = 0; j < current.length; j++) {
					if (!pickServers.includes(current[j])) {
						pickServers.push(current[j]);
					}
				}
			}
			pickServers = pickServers.filter(x => ns.hasRootAccess(x));
			pickServers.sort(function compare2(a, b) {
				return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
			})
			if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/weaken.js')) {
				var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/weaken.js')));
				pids.push(ns.exec('/jeek/weaken.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0], "PREP", Math.random()));
				if (pids[pids.length - 1] > 0) {
					threadsNeeded -= threadsUsed;
					if (debug) {
						ns.tprint(threadsUsed.toString() + " weaken threads on " + ns.args[0] + " running on " + pickServers[pickServers.length - 1] + ", " + threadsNeeded.toString() + " threads left to assign");
					}
				} else {
					pids.pop(pids.length - 1);
				}
			}
			await ns.sleep(15);
		}
		while (pids.length > 0) {
			while (ns.isRunning(pids[0])) {
				await ns.sleep(100);
			}
			pids.shift();
		}
			await ns.sleep(15);
	}
}

async function growp(target, pickServers, ns) {
	let pids = [];
	while (ns.getServer(target).moneyMax > ns.getServer(target).moneyAvailable) {
		let threadsNeeded = 5 + Math.ceil(ns.growthAnalyze(target, ns.getServerMaxMoney(target) / (Math.max(1, ns.getServerMoneyAvailable(target)))));
		while (threadsNeeded > 0) {
			pickServers.sort(function compare2(a, b) {
				return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
			})
			if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/grow.js')) {
				var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/grow.js')));
				pids.push(ns.exec('/jeek/grow.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0], "PREP", Math.random()));
				if (pids[pids.length - 1] > 0) {
					threadsNeeded -= threadsUsed;
					if (debug) {
						ns.tprint(threadsUsed.toString() + " grow threads on " + ns.args[0] + " running on " + pickServers[pickServers.length - 1] + ", " + threadsNeeded.toString() + " threads left to assign");
					}
				} else {
					pids.pop(pids.length - 1);
				}
			}
			await ns.sleep(15);
		}
		while (pids.length > 0) {
			while (ns.isRunning(pids[0])) {
				await ns.sleep(100);
			}
			pids.shift();
		}
		await ns.sleep(0);
		await weakenp(target, pickServers, ns);
	}
}

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("scan");
	ns.disableLog("scp");
	ns.disableLog("sleep");
	let ratio = .25;
	let resolution = 100;
	let target = ns.args[0];
	let memtotal = 0;
		var serverlist = ['home'];
		for (var i = 0; i < serverlist.length; i++) {
			var current = ns.scan(serverlist[i]);
			if (ns.hasRootAccess(serverlist[i])) {
				memtotal += ns.getServerMaxRam(serverlist[i]) - ns.getServerUsedRam(serverlist[i]);
			}
			for (var j = 0; j < current.length; j++) {
				if (!serverlist.includes(current[j])) {
					serverlist.push(current[j]);
				}
			}
		}
	while (true) {
	let lifespan = Math.max(1, Math.floor( 1 / 15 *  (memtotal / (.15 * (1 + ns.growthAnalyze(target, 1 / (1-ratio)) + 1 + 25 * Math.max(1, Math.floor(ratio / ns.formulas.hacking.hackPercent(getOptimalServer(target, ns), ns.getPlayer()))) + 1 + 25 * Math.max(1, Math.floor(ratio / ns.formulas.hacking.hackPercent(getOptimalServer(target, ns), ns.getPlayer()))) + Math.max(1, Math.floor(ratio / ns.formulas.hacking.hackPercent(getOptimalServer(target, ns), ns.getPlayer()))))))));
    ns.toast(target+ " " + lifespan.toString());
		var pickServers = ['home'];
		for (var i = 0; i < pickServers.length; i++) {
			if (pickServers[i] != "home") {
				await ns.scp('/jeek/hack.js', pickServers[i]);
				await ns.scp('/jeek/weaken.js', pickServers[i]);
				await ns.scp('/jeek/grow.js', pickServers[i]);
			}
			var current = ns.scan(pickServers[i]);
			for (var j = 0; j < current.length; j++) {
				if (!pickServers.includes(current[j])) {
					pickServers.push(current[j]);
				}
			}
		}
		pickServers = pickServers.filter(x => ns.hasRootAccess(x));

		let pid = ns.run('/jeek/prep.js', 1, target);
		while (pid > 0 && ns.isRunning(pid)) {
			await ns.sleep(1000);
		}
		let future = ns.formulas.hacking.weakenTime(getOptimalServer(target, ns), ns.getPlayer()) - ((Date.now() + ns.formulas.hacking.weakenTime(getOptimalServer(target, ns), ns.getPlayer()) % (5 * resolution)) + 5 * resolution - Date.now());
		let starttime = Date.now();
		let h = 1;
		let w1 = 1;
		let g = 1;
		let w2 = 1;
		let pids = [];
		while (h < lifespan) {
			var pickServers = ['home'];
			for (var i = 0; i < pickServers.length; i++) {
				var current = ns.scan(pickServers[i]);
				for (var j = 0; j < current.length; j++) {
					if (!pickServers.includes(current[j])) {
						pickServers.push(current[j]);
					}
				}
			}
			pickServers = pickServers.filter(x => ns.hasRootAccess(x));
			// Hack
			if (h <= lifespan) {
				if (Date.now() > starttime + future - ns.formulas.hacking.hackTime(getOptimalServer(target, ns), ns.getPlayer()) + h * 5 * resolution) {
					if ((ns.getServer(target).minDifficulty == ns.getServer(target).hackDifficulty) && (ns.getServer(target).moneyAvailable == ns.getServer(target).moneyMax)) {
						var threadsNeeded = Math.max(1, Math.floor(ratio / ns.formulas.hacking.hackPercent(getOptimalServer(target, ns), ns.getPlayer())));
						if (threadsNeeded > 0) {
							pickServers.sort(function compare3(a, b) {
								return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
							})
							if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/hack.js')) {
								var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/hack.js')));
								pids.push(ns.exec('/jeek/hack.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0], h, Math.random()));
								if (pids[pids.length - 1] > 0) {
									threadsNeeded -= threadsUsed;
									pids.pop(pids.length - 1);
								} else {
									threadsNeeded = 0;
									await ns.sleep(1);
								}
							} else {
								threadsNeeded = 0;
								await ns.sleep(1);
							}
						}
					}
					h = h + 1;
				}
			}
			// Weaken 1
			if (w1 <= lifespan) {
				if (Date.now() > starttime + future - ns.formulas.hacking.weakenTime(getOptimalServer(target, ns), ns.getPlayer()) + w1 * 5 * resolution + resolution) {
					var threadsNeeded = 1 + 25 * Math.max(1, Math.floor(ratio / ns.formulas.hacking.hackPercent(getOptimalServer(target, ns), ns.getPlayer())));
					if (threadsNeeded > 0) {
						pickServers.sort(function compare3(a, b) {
							return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
						})
						if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/weaken.js')) {
							var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/weaken.js')));
							pids.push(ns.exec('/jeek/weaken.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0], w1, Math.random()));
							if (pids[pids.length - 1] > 0) {
								threadsNeeded -= threadsUsed;
								pids.pop(pids.length - 1);
							} else {
								await ns.sleep(0);
							}
						} else {
							await ns.sleep(0);
						}
					}
					w1 = w1 + 1;
				}
			}
			// Grow
			if (g <= lifespan) {
				if (Date.now() > starttime + future - ns.formulas.hacking.growTime(getOptimalServer(target, ns), ns.getPlayer()) + g * 5 * resolution + 2 * resolution) {
					var threadsNeeded = 1 + ns.growthAnalyze(target, 1 / (1-ratio));
					if (threadsNeeded > 0) {
						pickServers.sort(function compare3(a, b) {
							return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
						})
						if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/grow.js')) {
							var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/grow.js')));
							pids.push(ns.exec('/jeek/grow.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0], g, Math.random()));
							if (pids[pids.length - 1] > 0) {
								threadsNeeded -= threadsUsed;
								pids.pop(pids.length - 1);
							} else {
								await ns.sleep(0);
							}
						} else {
							await ns.sleep(0);
						}
					}
					g = g + 1;
				}
			}
			// Weaken 2
			if (w2 <= lifespan) {
				if (Date.now() > starttime + future - ns.formulas.hacking.weakenTime(getOptimalServer(target, ns), ns.getPlayer()) + w2 * 5 * resolution + resolution * 3) {
					var threadsNeeded = 1 + 25 * Math.max(1, Math.floor(ratio / ns.formulas.hacking.hackPercent(getOptimalServer(target, ns), ns.getPlayer())));
					if (threadsNeeded > 0) {
						pickServers.sort(function compare3(a, b) {
							return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
						})
						if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/weaken.js')) {
							var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/weaken.js')));
							pids.push(ns.exec('/jeek/weaken.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0], w2, Math.random()));
							if (pids[pids.length - 1] > 0) {
								threadsNeeded -= threadsUsed;
								pids.pop(pids.length - 1);
							} else {
								await ns.sleep(0);
							}
						} else {
							await ns.sleep(0);
						}
					}
					w2 = w2 + 1;
				}
			}
			await ns.sleep(1);
		}
		await ns.sleep(2000 + ns.formulas.hacking.hackTime(getOptimalServer(target, ns), ns.getPlayer()));
	}
}