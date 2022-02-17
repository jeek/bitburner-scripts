/** @param {NS} ns **/
export async function main(ns) {
    if (ns.purchaseTor()) {
        ns.toast('Purchased TOR Router.');
    }
}
