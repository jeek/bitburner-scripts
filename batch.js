/** @param {NS} ns **/

function fGetServer(ns, serverName) {
	var data = ns.getServer(serverName);
	if (serverName == "home") {
		data.maxRam = Math.max(0, data.maxRam - 100);
		data.ramUsed = Math.max(0, data.ramUsed - 100);
	}
	return data;
}

export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("getServerUsedRam");
	ns.disableLog("getServerMaxRam");
	ns.disableLog("getServerSecurityLevel");
	ns.disableLog("getServerMinSecurityLevel");
	ns.disableLog("scp");
	ns.disableLog("sleep");
	var resolution = 100;
	var ratio = 0.1;
	var pids = [];
	var debug = false;
	//	var pickServers = ns.getPurchasedServers();
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
	pickServers = pickServers.filter(x => ns.hasRootAccess(x)).filter(y => y != "home");
	// Prep -> Weaken / Grow
	while ((ns.getServerMinSecurityLevel(ns.args[0]) < ns.getServerSecurityLevel(ns.args[0])) | (ns.getServerMoneyAvailable(ns.args[0]) < ns.getServerMaxMoney(ns.args[0]))) {
		if (ns.getServerMinSecurityLevel(ns.args[0]) < ns.getServerSecurityLevel(ns.args[0])) {
			var threadsNeeded = 1;
			while (ns.weakenAnalyze(threadsNeeded) < ns.getServerSecurityLevel(ns.args[0]) - ns.getServerMinSecurityLevel(ns.args[0])) {
				threadsNeeded = threadsNeeded += 1;
			}
			if (debug) {
				ns.tprint(threadsNeeded.toString() + " needed for first weaken");
			}
			threadsNeeded = threadsNeeded + 5;
			while (threadsNeeded > 0) {
				pickServers.sort(function compare1(a, b) {
					return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
				})
				if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/weaken.js')) {
					var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/weaken.js')));
					pids.push(ns.exec('/jeek/weaken.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0]));
					if (pids[pids.length - 1] > 0) {
						threadsNeeded -= threadsUsed;
						if (debug) {
							ns.tprint(threadsUsed.toString() + " weaken threads on " + ns.args[0] + " running on " + pickServers[pickServers.length - 1] + ", " + threadsNeeded.toString() + " threads left to assign");
						}
					} else {
						pids.pop(pids.length - 1);
					}
				}
				await ns.sleep(1);
			}

		}
		// Prep -> Grow
		if (ns.getServerMoneyAvailable(ns.args[0]) < ns.getServerMaxMoney(ns.args[0])) {
			var threadsNeeded = 5 + Math.ceil(ns.growthAnalyze(ns.args[0], ns.getServerMaxMoney(ns.args[0]) / ns.getServerMoneyAvailable(ns.args[0])));
			if (debug) {
				ns.tprint(threadsNeeded.toString() + " needed for grow");
			}
			while (threadsNeeded > 0) {
				pickServers.sort(function compare2(a, b) {
					return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
				})
				if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/grow.js')) {
					var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/grow.js')));
					pids.push(ns.exec('/jeek/grow.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0]));
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
			if (debug) {
				ns.tprint(pids);
			}
			while (pids.length > 0) {
				if (ns.isRunning(pids[0])) {
					await ns.sleep(1);
				} else {
					pids.pop(0);
				}
			}
		}
		while (pids.length > 0) {
			if (ns.isRunning(pids[0])) {
				await ns.sleep(1);
			} else {
				pids.pop(0);
			}
		}
		if (debug) {
			ns.tprint("Weakened / Grew " + ns.args[0]);
		}
	}
	// Measure Hack Time
	var hackThreads = Math.ceil(ratio / (ns.hackAnalyze(ns.args[0])));
	var hackStartTime = Date.now();
	var threadsNeeded = hackThreads;
	if (debug) {
		ns.tprint(hackThreads);
	}
	while (threadsNeeded > 0) {
		pickServers.sort(function compare3(a, b) {
			return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
		})
		if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/hack.js')) {
			var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/hack.js')));
			pids.push(ns.exec('/jeek/hack.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0]));
			if (pids[pids.length - 1] > 0) {
				threadsNeeded -= threadsUsed;
				if (debug) {
					ns.tprint(threadsUsed.toString() + " hack threads on " + ns.args[0] + " running on " + pickServers[pickServers.length - 1] + ", " + threadsNeeded.toString() + " threads left to assign");
				}
			} else {
				pids.pop(pids.length - 1);
			}
		}
		await ns.sleep(1);
	}
	while (pids.length > 0) {
		if (ns.isRunning(pids[0])) {
			await ns.sleep(1);
		} else {
			pids.pop(0);
		}
	}
	var hackStopTime = Date.now();
	if (debug) {
		ns.tprint(hackStartTime.toString() + " " + hackStopTime.toString() + " " + (hackStopTime - hackStartTime).toString());
	}
	// Measure Weaken 1 Time
	var weaken1ThreadsNeeded = 1;
	while (ns.weakenAnalyze(weaken1ThreadsNeeded) < ns.getServerSecurityLevel(ns.args[0]) - ns.getServerMinSecurityLevel(ns.args[0])) {
		weaken1ThreadsNeeded = weaken1ThreadsNeeded += 1;
	}
	weaken1ThreadsNeeded = weaken1ThreadsNeeded + 5;
	var weaken1StartTime = Date.now();
	var threadsNeeded = weaken1ThreadsNeeded;
	while (threadsNeeded > 0) {
		pickServers.sort(function compare3(a, b) {
			return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
		})
		if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/weaken.js')) {
			var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/weaken.js')));
			pids.push(ns.exec('/jeek/weaken.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0]));
			if (pids[pids.length - 1] > 0) {
				threadsNeeded -= threadsUsed;
			} else {
				pids.pop(pids.length - 1);
			}
		}
		await ns.sleep(1);
	}
	while (pids.length > 0) {
		if (ns.isRunning(pids[0])) {
			await ns.sleep(1);
		} else {
			pids.pop(0);
		}
	}
	var weaken1StopTime = Date.now();
	if (debug) {
		ns.tprint(weaken1StartTime.toString() + " " + weaken1StopTime.toString() + " " + (weaken1StopTime - weaken1StartTime).toString());
	}
	// Measure Grow Time
	var growThreadsNeeded = 5 + Math.ceil(ns.growthAnalyze(ns.args[0], ns.getServerMaxMoney(ns.args[0]) / ns.getServerMoneyAvailable(ns.args[0])));
	var growStartTime = Date.now();
	var threadsNeeded = growThreadsNeeded;
	while (threadsNeeded > 0) {
		pickServers.sort(function compare2(a, b) {
			return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
		})
		if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/grow.js')) {
			var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/grow.js')));
			pids.push(ns.exec('/jeek/grow.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0]));
			if (pids[pids.length - 1] > 0) {
				threadsNeeded -= threadsUsed;
			} else {
				pids.pop(pids.length - 1);
			}
		}
		await ns.sleep(15);
	}
	while (pids.length > 0) {
		if (ns.isRunning(pids[0])) {
			await ns.sleep(1);
		} else {
			pids.pop(0);
		}
	}
	var growStopTime = Date.now();
	ns.tprint(growStartTime.toString() + " " + growStopTime.toString() + " " + (growStopTime - growStartTime).toString());
	// Measure Weaken 2 Time
	var weaken2ThreadsNeeded = 1;
	while (ns.weakenAnalyze(weaken2ThreadsNeeded) < ns.getServerSecurityLevel(ns.args[0]) - ns.getServerMinSecurityLevel(ns.args[0])) {
		weaken2ThreadsNeeded = weaken2ThreadsNeeded += 1;
	}
	weaken2ThreadsNeeded = weaken2ThreadsNeeded + 5;
	var weaken2StartTime = Date.now();
	var threadsNeeded = weaken2ThreadsNeeded;
	while (threadsNeeded > 0) {
		pickServers.sort(function compare3(a, b) {
			return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
		})
		if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/weaken.js')) {
			var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/weaken.js')));
			pids.push(ns.exec('/jeek/weaken.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0]));
			if (pids[pids.length - 1] > 0) {
				threadsNeeded -= threadsUsed;
			} else {
				pids.pop(pids.length - 1);
			}
		}
		await ns.sleep(1);
	}
	while (pids.length > 0) {
		if (ns.isRunning(pids[0])) {
			await ns.sleep(1);
		} else {
			pids.pop(0);
		}
	}
	var weaken2StopTime = Date.now();
	if (debug) {
		ns.tprint(weaken2StartTime.toString() + " " + weaken2StopTime.toString() + " " + (weaken2StopTime - weaken2StartTime).toString());

		ns.tprint(hackThreads, " ", weaken1ThreadsNeeded, " ", growThreadsNeeded, " ", weaken2ThreadsNeeded);
	}
	var ramNeeded = hackThreads * ns.getScriptRam('/jeek/hack.js') + (weaken1ThreadsNeeded + weaken2ThreadsNeeded) * ns.getScriptRam('/jeek/weaken.script') + growThreadsNeeded * ns.getScriptRam('/jeek/grow.script');
	if (debug) {
		ns.tprint(hackThreads * ns.getScriptRam('/jeek/hack.js') + (weaken1ThreadsNeeded + weaken2ThreadsNeeded) * ns.getScriptRam('/jeek/weaken.script') + growThreadsNeeded * ns.getScriptRam('/jeek/grow.script'));
	}
	var weaken1Dur = weaken1StopTime - weaken1StartTime;
	var weaken2Dur = weaken2StopTime - weaken2StartTime;
	var hackDur = hackStopTime - hackStartTime;
	var growDur = growStopTime - growStartTime;
	var adjust = Math.min(ns.getWeakenTime(ns.args[0]), ns.getHackTime(ns.args[0]), ns.getGrowTime(ns.args[0]));

	var queue = []; // [timestamp, action, threads]
	while (true) {
		ns.run('/jeek/pop_all.js');
		var final = [
			['hack', hackThreads, adjust - ns.getHackTime(ns.args[0])],
			['weaken', weaken1ThreadsNeeded, adjust - ns.getWeakenTime(ns.args[0]) + resolution],
			['grow', growThreadsNeeded, adjust - ns.getGrowTime(ns.args[0]) + resolution * 2],
			['weaken', weaken2ThreadsNeeded, adjust - ns.getWeakenTime(ns.args[0]) + resolution * 3],
			['null', hackThreads, adjust],
			['null', hackThreads, adjust + resolution],
			['null', hackThreads, adjust + resolution * 2],
			['null', hackThreads, adjust + resolution * 3],
		]
		// Stack Them Up
		var freeMem = pickServers.map(x => ns.getServerMaxRam(x) - ns.getServerUsedRam(x)).filter(w => w >= 0.15).reduce((a, b) => a + b, 0) - queue.filter(y => y[1] != null).map(z => ns.getScriptRam('/jeek/' + z[1] + ".js") * z[2]).reduce((c, d) => c + d, 0);
		if (freeMem > ramNeeded) {
			var goodToGo = true;
			for (var i = 0; i < final.length; i++) {
				if (queue.filter(x => (Date.now() + final[i][2] - resolution <= x[0]) & (Date.now() + final[i][2] + resolution >= x[0])).length > 0) {
					var goodToGo = false;
				}
			}
			if (goodToGo) {
				for (var i = 0; i < final.length; i++) {
					queue.push([Date.now() + final[i][2], final[i][0], final[i][1]]);
				}
			} else {
				if (debug) {
					ns.tprint("Collision. " + queue.filter(y => y[1] != null).map(z => ns.getScriptRam('/jeek/' + z[1] + ".js") * z[2]).reduce((c, d) => c + d, 0).toString());
				}
			}
		} else {
			if (debug) {
				ns.tprint("Not enough free memory: " + freeMem.toString())
			}
		}
		if (debug) {
			ns.tprint("Queue: ", queue);
		}
		var doItNow = queue.filter(x => x[0] <= Date.now()).filter(y => y[1] != "null");
		queue = queue.filter(x => x[0] > Date.now());
		for (var i = 0; i < doItNow.length; i++) {
			var threadsNeeded = doItNow[i][2];
			while (threadsNeeded > 0) {
				pickServers.sort(function compare3(a, b) {
					return (fGetServer(ns, a).maxRam - fGetServer(ns, a).ramUsed) - (fGetServer(ns, b).maxRam - fGetServer(ns, b).ramUsed);
				})
				if (fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed > ns.getScriptRam('/jeek/' + doItNow[i][1] + '.js')) {
					var threadsUsed = Math.min(threadsNeeded, Math.floor((fGetServer(ns, pickServers[pickServers.length - 1]).maxRam - fGetServer(ns, pickServers[pickServers.length - 1]).ramUsed) / ns.getScriptRam('/jeek/' + doItNow[i][1] + '.js')));
					pids.push(ns.exec('/jeek/' + doItNow[i][1] + '.js', pickServers[pickServers.length - 1], threadsUsed, ns.args[0], Math.random()));
					if (pids[pids.length - 1] > 0) {
						threadsNeeded -= threadsUsed;
						pids.pop(pids.length - 1);
					} else {
						threadsNeeded -= threadsUsed;
						pids.pop(pids.length - 1);
						//						ns.tprint("This shouldn't be happening now.")
						ns.exec('/jeek/' + doItNow[i][1] + '.js', 'home', threadsUsed, ns.args[0], Math.random())
						await ns.sleep(1);
					}
				}
				await ns.sleep(1);
			}

		}
		await ns.sleep(15);
	}
}
