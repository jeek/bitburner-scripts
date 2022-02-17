/** @param {NS} ns **/
export async function main(ns) {
	ns.toast('Hacking ' + ns.args[0] + '.')
	ns.nuke(ns.args[0]);
	var n00dles = ns.getServer(ns.args[0])
	while (n00dles.minDifficulty + 5 < n00dles.hackDifficulty) {
		ns.toast('Pre-Grow weaken on ' + ns.args[0])
		await ns.weaken(ns.args[0]);
	}
	while (n00dles.moneyAvailable < n00dles.moneyMax) {
		ns.toast('Grow on ' + ns.args[0])
		await ns.grow(ns.args[0]);
	}
	while (n00dles.minDifficulty + 5 < n00dles.hackDifficulty) {
		ns.toast('Post-Grow Weaken' + ns.args[0])
		await ns.weaken(ns.args[0]);
	}
	ns.toast('Hacking ' + ns.args[0])
	await ns.hack(ns.args[0]);
}
