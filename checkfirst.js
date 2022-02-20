/** @param {NS} ns **/
export async function main(ns) {
	ns.tprint("Checking status of world... first time?")
    var mem = ns.getServerMaxRam("home");
	if (mem == 8) {
		ns.tprint("Yes. Stopping. Good luck.")
	} else {
        ns.spawn("/jeek/start.js");
	}
}
