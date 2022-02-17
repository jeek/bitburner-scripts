/** @param {NS} ns **/
export async function main(ns) {
	ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/gitpull2.js', 'jeek/gitpull2.js');
	ns.spawn('/jeek/gitpull2.js', 1);
}
