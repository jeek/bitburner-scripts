/** @param {NS} ns **/
export async function main(ns) {
	while (await ns.sleep(1)) {
		var data = ns.readPort(19);
		if (data != "NULL PORT DATA") {
			ns.tprint(data);
		}
	}
}
