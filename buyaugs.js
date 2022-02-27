globalThis.augplan = [
	[[4,
		["CyberSec", ["Cranial Signal Processors - Gen I", "Cranial Signal Processors - Gen II", "BitWire", "Synaptic Enhancement Implant", "Neurotrainer I"]],
		["Tian Di Hui", ["Neuroreceptor Management Implant", "Social Negotiation Assistant (S.N.A)", "Nuoptimal Nootropic Injector Implant", "ADR-V1 Pheromone Gene", "Speech Enhancement",]],
		["NiteSec", ["DataJack", "Cranial Signal Processors - Gen III", "CRTX42-AA Gene Modification", "Neural-Retention Enhancement", "Embedded Netburner Module", "Neurotrainer II", "Artificial Synaptic Potentiation"]]
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
				if (ns.getPlayer().city != "New Tokyo") {
					ns.travelToCity("New Tokyo");
				}
				ns.joinFaction("Tian Di Hui");
			}
		}
		let ownedAugs = ns.getOwnedAugmentations(true);
		let goal = globalThis.augplan[0][0][target][1];
		for (let i = 0; i < ownedAugs.length; i++) {
			goal = goal.filter(x => x != ownedAugs[i]);
		}
		if (goal.length > 0) {
			if (ns.fileExists("SQLInject.exe") && !ns.isBusy()) {
				if (ns.workForFaction(globalThis.augplan[0][0][target][0], "Hacking Contracts", false)) {
					await ns.sleep(60000);
					ns.stopAction();
				}
			}
			ns.purchaseAugmentation(globalThis.augplan[0][0][target][0], goal[0]);
		} else {
			while (ns.purchaseAugmentation(globalThis.augplan[0][0][target][0], "NeuroFlux Governor")) {
				// You get NOTHING.
			}
			ns.installAugmentations("/jeek/start.js");
		}
	}
}
