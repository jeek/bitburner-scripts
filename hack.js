/** @param {NS} ns **/
export async function main(ns) {
    await ns.hack(ns.args[0]);
    await ns.writePort(19, "HACK" + (" " + (ns.args.length > 1 ? ns.args[1] : "")));
}
