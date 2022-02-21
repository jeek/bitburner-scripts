/** @param {NS} ns **/
export async function main(ns) {
    await ns.grow(ns.args[0]);
    await ns.writePort(19, "GROW" + (" " + (ns.args.length > 1 ? ns.args[1] : "")));
}
