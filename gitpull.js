/** @param {NS} ns **/
export async function main(ns) {
	var root = ns.read("/jtmp/root.txt");
	if (root == "") {
		root = "https://raw.githubusercontent.com/jeek/bitburner/main/";
	}
	ns.tprint("Downloading jeekOS... getting list of files...");
	await ns.wget(root + 'gitpull2.js', '/jeek/gitpull2.js');
	ns.spawn('/jeek/gitpull2.js', 1);
}
