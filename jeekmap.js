/** @param {NS} ns **/
export async function main(ns) {
	let doc = eval("document");
	if (doc.getElementById("jeekmap") != null) {
		let jeekmap = doc.getElementById('jeekmap');
		let start = "<CENTER><TABLE WIDTH=100%>"
		for (let i = 0 ; i < 19 ; i++) {
			start = start + "<TR>";
			for (let j = 0 ; j < 19 ; j++) {
				start = start + "<TD id='jeekmap-" + i.toString() + "-" + j.toString() + "'></TD>"
			}
			start = start + "</TR>";
		}
		start = start + "</TABLE>";
		jeekmap.innerHTML = start;
		let home = doc.getElementById('jeekmap-9-9');
		home.innerHTML = '<FONT COLOR=green>o</FONT>';
	}
}