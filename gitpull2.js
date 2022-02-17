/** @param {NS} ns **/
export async function main(ns) {
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/gitpull.js', 'jeek/gitpull.js');
	ns.spawn('/jeek/gitpull2.js', 1);
	ns.toast('Scripts updated.');
}
