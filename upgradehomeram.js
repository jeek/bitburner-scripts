/** @param {NS} ns **/
export async function main(ns) {
	if (ns.upgradeHomeRam()) {
		ns.toast("Home RAM Upgraded.")
	}
}
