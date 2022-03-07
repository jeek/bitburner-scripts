globalThis.augplan = [
	[[4,
		["CyberSec", ["Cranial Signal Processors - Gen I", "BitWire", "Synaptic Enhancement Implant", "Neurotrainer I"]],
		["Tian Di Hui", ["Speech Enhancement"]],
		["Tian Di Hui", ["ADR-V1 Pheromone Gene"]],
		["Tian Di Hui", ["Nuoptimal Nootropic Injector Implant"]],
		["Tian Di Hui", ["Social Negotiation Assistant (S.N.A)"]],
		["Tian Di Hui", ["Neuroreceptor Management Implant"]],
		["Sector-12", ["CashRoot Starter Kit", "Speech Processor Implant", "Wired Reflexes"]],
		["NiteSec", ["Cranial Signal Processors - Gen II", "Cranial Signal Processors - Gen III", "CRTX42-AA Gene Modification", "Neural-Retention Enhancement", "Embedded Netburner Module", "Neurotrainer II", "Artificial Synaptic Potentiation"]],
		["NWO", ["Power Recirculation Core", "Neurotrainer III"]],
		["The Black Hand", ["Neuralstimulator", "Embedded Netburner Module Core Implant", "Enhanced Myelin Sheathing", "Cranial Signal Processors - Gen III", "Cranial Signal Processors - Gen IV", "The Black Hand", "DataJack", "Embedded Netburner Module", "Artificial Synaptic Potentiation"]],
		["BitRunners", ["Embedded Netburner Module Core Implant", "Embedded Netburner Module Core V2 Upgrade", "BitRunners Neurolink", "Artificial Bio-neural Network Implant", "Cranial Signal Processors - Gen V", "Neural Accelerator", "Enhanced Myelin Sheathing", "Cranial Signal Processors - Gen III", "Cranial Signal Processors - Gen IV", "DataJack", "Embedded Netburner Module", "Neurotrainer II"]],
		["Clarke Incorporated", ["nextSENS Gene Modification", "Neuronal Densification", "FocusWire", "ADR-V2 Pheromone Gene", "Enhanced Social Interaction Implant"]],
		["Blade Industries", ["Embedded Netburner Module", "HyperSight Corneal Implant", "Embedded Netburner Module Core Implant", "PC Direct-Neural Interface", "PC Direct-Neural Interface Optimization Submodule", "Embedded Netburner Module Core V2 Upgrade"]],
		["ECorp", ["Embedded Netburner Module Core V3 Upgrade", "Embedded Netburner Module Direct Memory Access Upgrade", "Embedded Netburner Module Analyze Engine", "ECorp HVMind Implant"]],
		["NWO", ["Xanipher", "Power Recirculation Core", "ADR-V1 Pheromone Gene", "Embedded Netburner Module Analyze Engine", "Embedded Netburner Module", "Neurotrainer III"]],
		["Fulcrum Technologies", ["PC Direct-Neural Interface NeuroNet Injector", "Artificial Bio-neural Network Implant", "Enhanced Myelin Sheathing", "Embedded Netburner Module Core V3 Upgrade", "PC Direct-Neural Interface Optimization Submodule", "Embedded Netburner Module Analyze Engine"]],
		["Daedalus", ["The Red Pill"]]
	]]
];

function intersection(setA, setB, ns) {
	//	ns.tprint("A: ", Array.from(setA));
	//	ns.tprint("B: ", Array.from(setB));
	let _intersection = new Set()
	for (let elem of setB) {
		if (setA.has(elem)) {
			_intersection.add(elem)
		}
	}
	return _intersection
}

/** @param {NS} ns **/
export async function main(ns) {
	// ns.tail();
	let installedAugs = new Set(ns.getOwnedAugmentations(false));
	//	ns.tprint(Array.from(installedAugs));
	let target = null;
	for (let i = 1; i < globalThis.augplan[0][0].length; i++) {
		//		ns.tprint("Intersect: ", Array.from(intersection(new Set(globalThis.augplan[0][0][i][1]), installedAugs, ns)));
		//		ns.tprint(globalThis.augplan[0][0][i][1]);
		//		ns.tprint(intersection(new Set(globalThis.augplan[0][0][i][1]), installedAugs, ns).size, " ", globalThis.augplan[0][0][i][1].length)
		if (intersection(new Set(globalThis.augplan[0][0][i][1]), installedAugs, ns).size < globalThis.augplan[0][0][i][1].length) {
			target = i;
			i = 1000000;
		}
	}
	// ns.tprint(globalThis.augplan[0][0][target]);
	if (target != null) {
		//ns.toast(globalThis.augplan[0][0][target], "success", 10000);
		if (globalThis.augplan[0][0][target][0] == "CyberSec") {
			if (!ns.getPlayer().factions.includes("CyberSec")) {
				ns.joinFaction("CyberSec");
			}
		}
		if (globalThis.augplan[0][0][target][0] == "NiteSec") {
			if (!ns.getPlayer().factions.includes("NiteSec")) {
				ns.joinFaction("NiteSec");
			}
		}
		if (globalThis.augplan[0][0][target][0] == "Tian Di Hui") {
			if (!ns.getPlayer().factions.includes("Tian Di Hui")) {
				if (ns.getPlayer().city != "New Tokyo" && ns.getPlayer().money >= 200000) {
					ns.travelToCity("New Tokyo");
				}
				ns.joinFaction("Tian Di Hui");
			}
		}
		if (globalThis.augplan[0][0][target][0] == "Sector-12") {
			if (!ns.getPlayer().factions.includes("Sector-12")) {
				if (ns.getPlayer().city != "Sector-12" && ns.getPlayer().money >= 200000) {
					ns.travelToCity("Sector-12");
				}
				ns.joinFaction("Sector-12");
			}
		}
		if (globalThis.augplan[0][0][target][0] == "The Black Hand") {
			if (!ns.getPlayer().factions.includes("The Black Hand")) {
				ns.joinFaction("The Black Hand");
			}
		}
		if (globalThis.augplan[0][0][target][0] == "BitRunners") {
			if (!ns.getPlayer().factions.includes("BitRunners")) {
				ns.joinFaction("BitRunners");
			}
		}
		if (globalThis.augplan[0][0][target][0] == "Daedalus") {
			if (!ns.getPlayer().factions.includes("Daedalus")) {
				ns.joinFaction("Daedalus");
			}
		}
		let faction = globalThis.augplan[0][0][target][0];
		if (faction == "Fulcrum Technologies") {
			faction = "Fulcrum Secret Technologies";
		}
		let corps = ["Clarke Incorporated", "Blade Industries", "ECorp", "NWO", "Fulcrum Secret Technologies"];
		for (let i = 0; i < corps.length; i++) {
			if (faction == corps[i]) {
				if (!ns.getPlayer().factions.includes(corps[i])) {
					ns.applyToCompany(globalThis.augplan[0][0][target][0], "IT");
					ns.workForCompany(globalThis.augplan[0][0][target][0], false);
					await ns.sleep(60000);
					ns.stopAction();
					ns.joinFaction(corps[i]);
				}
			}
		}
		let ownedAugs = ns.getOwnedAugmentations(true);
		let goal = globalThis.augplan[0][0][target][1];
		for (let i = 0; i < ownedAugs.length; i++) {
			goal = goal.filter(x => x != ownedAugs[i]);
		}
		// ns.tprint(goal);
		let facgoals = [8, 66, 150];
		for (let j = 0; j < facgoals.length; j++) {
			if ((ns.getFactionFavorGain(faction) + ns.getFactionFavor(faction) >= facgoals[j]) && (ns.getFactionFavor(faction) < facgoals[j])) {
				for (let i = 0; i < goal.length; i++) {
					ns.purchaseAugmentation(faction, goal[i]);
				}
				goal = [];
			}
		}
		if (goal.length > 0) {
			let repToGain = 0;
			for (let i = 0; i < goal.length; i++) {
				repToGain = Math.max(repToGain, ns.getAugmentationRepReq(goal[i]));
			}
			repToGain = 300000 * (repToGain - ns.getFactionRep(faction));

			ns.donateToFaction(faction, repToGain);
			if (ns.fileExists("SQLInject.exe") && !ns.isBusy()) {
				if (ns.workForFaction(faction, "Hacking Contracts", false)) {
					await ns.sleep(60000);
					ns.stopAction();
				}
			}
			ns.purchaseAugmentation(faction, goal[0]);
		} else {
			if (ns.getFactionFavor(faction) >= 150) {
				while (ns.getPlayer().money > 0 && ns.getFactionRep(faction) < ns.getAugmentationRepReq("NeuroFlux Governor")) {
					ns.donateToFaction(faction, Math.Ceil(ns.getPlayer().money / 10));
				}
			}
			while (ns.purchaseAugmentation(faction, "NeuroFlux Governor")) {
				if (ns.getFactionFavor(faction) >= 150) {
					while (ns.getPlayer().money > 0 && ns.getFactionRep(faction) < ns.getAugmentationRepReq("NeuroFlux Governor")) {
						ns.donateToFaction(faction, Math.Ceil(ns.getPlayer().money / 10));
					}
				}
			}
			ns.installAugmentations("/jeek/start.js");
			ns.softReset('/jeek/start.js');
		}
	}
}
