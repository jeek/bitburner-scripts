/** @param {NS} ns **/

export async function main(ns) {
	ns.tprint("jeekOS");
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/gitpull.js', '/jeek/gitpull.js');
    ns.spawn('/jeek/gitpull.js');
}
