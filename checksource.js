/** @param {NS} ns **/
export async function main(ns) {
	ns.tprint("Checking status of world...")
    var source = ns.getOwnedSourceFiles();
	if (source == null) {
		ns.write("/jtemp/source.txt", "", "w");
	} else {
        ns.write(source.map(x => x.n));
	}
	ns.spawn("/jeek/checkfirst.js");
}
