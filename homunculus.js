/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
        var data = ns.readPort(20);
    	while (data == "NULL PORT DATA") {
	    	await ns.sleep(1000);
			data = ns.readPort(20);
		}
		var splitdata = data.split("|");
		if (len(splitdata) == 1) {
			while (0 == ns.run(splitdata[0])) {
				await ns.sleep(1000);
			}
		} else {
		if (len(splitdata) == 2) {
			while (0 == ns.run(splitdata[0], 1, splitdata[1])) {
				await ns.sleep(1000);
			}
		} else {
					if (len(splitdata) == 3) {
			while (0 == ns.run(splitdata[0], 1, splitdata[1], splitdata[2])) {
				await ns.sleep(1000);
			}
		} else {
					if (len(splitdata) == 4) {
			while (0 == ns.run(splitdata[0], 1, splitdata[1], splitdata[2], splitdata[3])) {
				await ns.sleep(1000);
			}
		} else {
			// Modify for more arguments if needed
		}
		}
		}			
		}
	}
}