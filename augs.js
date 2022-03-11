/** @param {NS} ns **/
export async function main(ns) {
	var augnames = Object.keys(JSON.parse(ns.read('/jeek/augs.txt')));
	var augs = JSON.parse(ns.read('/jeek/augs.txt'));
	for (var i = 0; i < augnames.length; i++) {
		if (!ns.getOwnedAugmentations().includes(augnames[i])) {
			ns.tprint(augnames[i]);
			for (var j = 0; j < augs[augnames[i]]['Factions'].length; j++) {
				ns.tprint("    ", augs[augnames[i]]['Factions'][j]);
			}
		}
	}
}