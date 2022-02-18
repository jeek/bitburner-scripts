/** @param {NS} ns **/
export async function main(ns) {
	while (ns.isRunning('/jeek/start.js', 'home')) {
		await ns.sleep(1);
	}
	await ns.sleep(30);
	ns.run('/jeek/start.js');
}
