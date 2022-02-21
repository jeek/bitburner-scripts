/** @param {NS} ns **/
export async function main(ns) {
    await ns.weaken(ns.args[0]);
    await ns.writePort(19, "WEAKEN" + (" " + (ns.args.length > 1 ? ns.args[1] : "")));
}
