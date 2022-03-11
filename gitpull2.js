/** @param {NS} ns **/
export async function main(ns) {
	ns.tprint("Downloading jeekOS... downloading files...");
	var root = ns.read("/jtmp/root.txt");
	if (root == "") {
		root = "https://raw.githubusercontent.com/jeek/bitburner/main/";
	}
	await ns.wget(root + 'gitpull.js', '/jeek/gitpull.js');
	await ns.wget(root + 'hackit.js', '/jeek/hackit.js');
	await ns.wget(root + 'start.js', '/jeek/start.js');
	await ns.wget(root + 'purchasetor.js', '/jeek/purchasetor.js');
	await ns.wget(root + 'simplehack.js', '/jeek/simplehack.js');
	await ns.wget(root + 'upgradehomeram.js', '/jeek/upgradehomeram.js');
	await ns.wget(root + 'checkprogs.js', '/jeek/checkprogs.js');
	await ns.wget(root + 'grow.js', '/jeek/grow.js');
	await ns.wget(root + 'hack.js', '/jeek/hack.js');
	await ns.wget(root + 'weaken.js', '/jeek/weaken.js');
	await ns.wget(root + 'start2.js', '/jeek/start2.js');
	await ns.wget(root + 'purchaseservers.js', '/jeek/purchaseservers.js');
	await ns.wget(root + 'pop_all.js', '/jeek/pop_all.js');
	await ns.wget(root + 'batch.js', '/jeek/batch.js');
	await ns.wget(root + 'commitcrime.js', '/jeek/commitcrime.js');
	await ns.wget(root + 'installbackdoors.js', '/jeek/installbackdoors.js');
	await ns.wget(root + 'checkfirst.js', '/jeek/checkfirst.js');
	await ns.wget(root + 'checksource.js', '/jeek/checksource.js');
	await ns.wget(root + 'POST.js', '/jeek/POST.js');
	await ns.wget(root + 'metrics.js', '/jeek/metrics.js');
	ns.toast('Scripts updated.');
	ns.spawn("/jeek/checkfirst.js");
}
