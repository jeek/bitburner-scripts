/** @param {NS} ns **/
export async function main(ns) {
	ns.tprint("Downloading jeekOS... getting list of files...");
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/gitpull.js', '/jeek/gitpull.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/hackit.js', '/jeek/hackit.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/start.js', '/jeek/start.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/purchasetor.js', '/jeek/purchasetor.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/simplehack.js', '/jeek/simplehack.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/upgradehomeram.js', '/jeek/upgradehomeram.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/checkprogs.js', '/jeek/checkprogs.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/grow.js', '/jeek/grow.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/hack.js', '/jeek/hack.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/weaken.js', '/jeek/weaken.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/start2.js', '/jeek/start2.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/purchaseservers.js', '/jeek/purchaseservers.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/pop_all.js', '/jeek/pop_all.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/batch.js', '/jeek/batch.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/commitcrime.js', '/jeek/commitcrime.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/installbackdoors.js', '/jeek/installbackdoors.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/checkfirst.js', '/jeek/checkfirst.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/checksource.js', '/jeek/checksource.js');
	await ns.wget('https://raw.githubusercontent.com/jeek/bitburner/main/POST.js', '/jeek/POST.js');
	ns.toast('Scripts updated.');
	ns.spawn("/jeek/checkfirst.js");
}
