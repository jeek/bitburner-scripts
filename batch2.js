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

		let threadsNeeded = (ns.getServer(target).hackDifficulty - ns.getServer(target).minDifficulty) / .05;
		while (threadsNeeded > 0) {
			for (let i = 0; i < pickServers.length; i++) {
				let current = ns.scan(pickServers[i]);
				for (let j = 0; j < current.length; j++) {
					if (!pickServers.includes(current[j])) {
						pickServers.push(current[j]);
					}
				}
			}
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
	}
}

async function growp(target, pickServers, ns) {
	let pids = [];
	while (ns.getServer(target).hackDifficulty > ns.getServer(target).minDifficulty) {
		let threadsNeeded = (ns.getServer(target).hackDifficulty - ns.getServer(target).minDifficulty) / .05;
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
	}
}

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("scan");
	ns.disableLog("scp");
	ns.disableLog("sleep");

	let ratio = .5;
	let resolution = 100;
	let target = ns.args[0];

	//ns.tail();
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

	await weakenp(target, pickServers, ns);
	await growp(target, pickServers, ns);
	await weakenp(target, pickServers, ns);
	let future = ns.formulas.hacking.weakenTime(getOptimalServer(target, ns), ns.getPlayer()) - ((Date.now() + ns.formulas.hacking.weakenTime(getOptimalServer(target, ns), ns.getPlayer()) % (5 * resolution)) + 5 * resolution - Date.now());
	let starttime = Date.now();
	//ns.tprint(Date.now(), " ", future);
	let h = 1;
	let w1 = 1;
	let g = 1;
	let w2 = 1;
	let pids = [];
	while (true) {
		var pickServers = ['home'];
		for (var i = 0; i < pickServers.length; i++) {
			var current = ns.scan(pickServers[i]);
			//			await ns.scp('/jeek/hack.js', pickServers[i]);
			//			await ns.scp('/jeek/weaken.js', pickServers[i]);
			//			await ns.scp('/jeek/grow.js', pickServers[i]);
			for (var j = 0; j < current.length; j++) {
				if (!pickServers.includes(current[j])) {
					pickServers.push(current[j]);
				}
			}
		}
		pickServers = pickServers.filter(x => ns.hasRootAccess(x));
		// Hack
		if (Date.now() > starttime + future - ns.formulas.hacking.hackTime(getOptimalServer(target, ns), ns.getPlayer()) + h * 5 * resolution) {
			if ((ns.getServer(target).minDifficulty == ns.getServer(target).hackDifficulty) && (ns.getServer(target).moneyAvailable == ns.getServer(target).moneyMax)) {
				// THIS IS THE LINE YOU NEED TO WORK ON
				var threadsNeeded = Math.max(1, Math.floor(ratio / ns.formulas.hacking.hackPercent(getOptimalServer(target, ns), ns.getPlayer())));
				if (threadsNeeded > 0) {
					pickServers.sort(function compare3(a, b) {
						return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
					})
					//				if ((fGetServer(ns, pickServers[pickServers.length - 4]).maxRam - fGetServer(ns, pickServers[pickServers.length - 4]).RamUsed) >= minMem) {
					if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/hack.js')) {
						var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/hack.js')));
						pids.push(ns.exec('/jeek/hack.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0], h, Math.random()));
						if (pids[pids.length - 1] > 0) {
							threadsNeeded -= threadsUsed;
							pids.pop(pids.length - 1);
						} else {
							threadsNeeded = 0;
							await ns.sleep(1);
							//						threadsNeeded -= threadsUsed;
							//						pids.pop(pids.length - 1);
							//						ns.tprint("This shouldn't be happening now.")
							//						ns.exec('/jeek/' + doItNow[i][1] + '.js', 'home', threadsUsed, ns.args[0], Math.random())
							//						await ns.sleep(1);
						}
					} else {
						threadsNeeded = 0;
						await ns.sleep(1);
					}
				}
			}
			h = h + 1;
		}
		// Weaken 1
		if (Date.now() > starttime + future - ns.formulas.hacking.weakenTime(getOptimalServer(target, ns), ns.getPlayer()) + w1 * 5 * resolution + resolution) {
			//			if (ns.getServer(target).minDifficulty == ns.getServer(target).hackDifficulty) {
			// THIS IS THE LINE YOU NEED TO WORK ON
			var threadsNeeded = 1 + 25 * Math.max(1, Math.floor(ratio / ns.formulas.hacking.hackPercent(getOptimalServer(target, ns), ns.getPlayer())));
			if (threadsNeeded > 0) {
				pickServers.sort(function compare3(a, b) {
					return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
				})
				//				if ((fGetServer(ns, pickServers[pickServers.length - 4]).maxRam - fGetServer(ns, pickServers[pickServers.length - 4]).RamUsed) >= minMem) {
				if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/weaken.js')) {
					var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/weaken.js')));
					pids.push(ns.exec('/jeek/weaken.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0], w1, Math.random()));
					if (pids[pids.length - 1] > 0) {
						threadsNeeded -= threadsUsed;
						pids.pop(pids.length - 1);
					} else {
						await ns.sleep(0);
						//							threadsNeeded = 0;
						//						threadsNeeded -= threadsUsed;
						//						pids.pop(pids.length - 1);
						//						ns.tprint("This shouldn't be happening now.")
						//						ns.exec('/jeek/' + doItNow[i][1] + '.js', 'home', threadsUsed, ns.args[0], Math.random())
						//						await ns.sleep(1);
					}
				} else {
					await ns.sleep(0);
					//						threadsNeeded = 0;
				}
			}
			w1 = w1 + 1;
			//			}
		}
		// Grow
		if (Date.now() > starttime + future - ns.formulas.hacking.growTime(getOptimalServer(target, ns), ns.getPlayer()) + g * 5 * resolution + 2 * resolution) {
			//			if (ns.getServer(target).minDifficulty == ns.getServer(target).hackDifficulty) {
			// THIS IS THE LINE YOU NEED TO WORK ON
			var threadsNeeded = 1 + ns.growthAnalyze(target, 1 / ratio);
			if (threadsNeeded > 0) {
				pickServers.sort(function compare3(a, b) {
					return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
				})
				//				if ((fGetServer(ns, pickServers[pickServers.length - 4]).maxRam - fGetServer(ns, pickServers[pickServers.length - 4]).RamUsed) >= minMem) {
				if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/grow.js')) {
					var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/grow.js')));
					pids.push(ns.exec('/jeek/grow.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0], g, Math.random()));
					if (pids[pids.length - 1] > 0) {
						threadsNeeded -= threadsUsed;
						pids.pop(pids.length - 1);
					} else {
						await ns.sleep(0);
						//							threadsNeeded = 0;
						//						threadsNeeded -= threadsUsed;
						//						pids.pop(pids.length - 1);
						//						ns.tprint("This shouldn't be happening now.")
						//						ns.exec('/jeek/' + doItNow[i][1] + '.js', 'home', threadsUsed, ns.args[0], Math.random())
						//						await ns.sleep(1);
					}
				} else {
					await ns.sleep(0);
					//						threadsNeeded = 0;
				}
			}
			g = g + 1;
			//			}
		}
		// Weaken 2
		if (Date.now() > starttime + future - ns.formulas.hacking.weakenTime(getOptimalServer(target, ns), ns.getPlayer()) + w2 * 5 * resolution + resolution * 3) {
			//		if (ns.getServer(target).minDifficulty == ns.getServer(target).hackDifficulty) {
			// THIS IS THE LINE YOU NEED TO WORK ON
			var threadsNeeded = 1 + 25 * Math.max(1, Math.floor(ratio / ns.formulas.hacking.hackPercent(getOptimalServer(target, ns), ns.getPlayer())));
			if (threadsNeeded > 0) {
				pickServers.sort(function compare3(a, b) {
					return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
				})
				//				if ((fGetServer(ns, pickServers[pickServers.length - 4]).maxRam - fGetServer(ns, pickServers[pickServers.length - 4]).RamUsed) >= minMem) {
				if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/weaken.js')) {
					var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/weaken.js')));
					pids.push(ns.exec('/jeek/weaken.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0], w2, Math.random()));
					if (pids[pids.length - 1] > 0) {
						threadsNeeded -= threadsUsed;
						pids.pop(pids.length - 1);
					} else {
						await ns.sleep(0);
						//							threadsNeeded = 0;
						//						threadsNeeded -= threadsUsed;
						//						pids.pop(pids.length - 1);
						//						ns.tprint("This shouldn't be happening now.")
						//						ns.exec('/jeek/' + doItNow[i][1] + '.js', 'home', threadsUsed, ns.args[0], Math.random())
						//						await ns.sleep(1);
					}
				} else {
					await ns.sleep(0);
					//						threadsNeeded = 0;
				}
			}
			w2 = w2 + 1;
			//			}
		}
		await ns.sleep(1);
	}
}
