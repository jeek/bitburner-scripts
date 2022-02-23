/** @param {NS} ns **/
export async function main(ns) {
    ns.tprint("Checking status of world...")
    var source = ns.getOwnedSourceFiles();
    source = source.map(x => x.n);
    source.push(ns.getPlayer().bitNodeN);
    ns.tprint(source.join(","));
    ns.write("/jtmp/source.txt", source.map(x => x.n).join(","), "w");
    //	ns.spawn("/jeek/checkfirst.js");
}
