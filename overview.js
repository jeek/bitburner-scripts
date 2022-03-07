function shuffle(array) {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}

function bestserver(ns) {
	var self = ns.getPlayer();
	var targetLevel = self['hacking'] / 2;
	if (targetLevel < 5) {
		targetLevel = 5;
	}
	var serverlist = ['home'];
	var i = 0;
	var targetserver = "";
	var bestmoney = 0;
	for (var i = 0; i < serverlist.length; i++) {
		var current = ns.scan(serverlist[i]);
		for (var j = 0; j < current.length; j++) {
			if (!serverlist.includes(current[j])) {
				serverlist.push(current[j]);
			}
		}
	}
	serverlist = serverlist.filter(x => ns.hasRootAccess(x));
	serverlist = serverlist.filter(y => ns.getServerRequiredHackingLevel(y) <= targetLevel);
	serverlist = serverlist.sort(function (a, b) {
		return ns.hackAnalyzeChance(a) * (100 - ns.getServer(a).hackDifficulty) * (ns.getPlayer()['hacking'] - (ns.getServerRequiredHackingLevel(a) - 1)) * ns.getServerMaxMoney(a) / (ns.getHackTime(a) * ns.hackAnalyzeThreads(a, 1)) -
			ns.hackAnalyzeChance(b) * (100 - ns.getServer(b).hackDifficulty) * (ns.getPlayer()['hacking'] - (ns.getServerRequiredHackingLevel(b) - 1)) * ns.getServerMaxMoney(b) / (ns.getHackTime(b) * ns.hackAnalyzeThreads(b, 1))
	});
	serverlist = serverlist.filter(x => x != "run4theh111z").filter(x => x != "fulcrumassets").filter(x => x != "The-Cave").filter(x => x != "avmnite-02h").filter(x => x != ".").filter(x => x != "I.I.I.I").filter(y => !(ns.getPurchasedServers().includes(y)));
	if (serverlist.length > 0) {
		targetserver = serverlist[serverlist.length - 1];
	} else {
		targetserver = "n00dles";
	}
	// ns.toast("Best Server: " + targetserver);
	return targetserver;
}

/** @param {NS} ns **/
export async function main(ns) {
	globalThis.doc = eval("document");
	const hook0 = doc.getElementById('overview-extra-hook-0');
	if (doc.getElementById('pserverarea') == null) {
		const parentdiv = doc.getElementById('overview-extra-hook-0').parentNode.parentNode;
		const pserverarea = document.createElement("tr");
		doc.getElementById('overview-extra-hook-0').insertAdjacentElement('afterend', pserverarea);

		pserverarea.setAttribute('id', 'pserverarea');

	}
	pserverarea.innerHTML = "";
	const hook1 = doc.getElementById('overview-extra-hook-1');
	const hook2 = doc.getElementById('overview-extra-hook-2');
	ns.atExit(() => {
		pserverarea.remove();
		hook0.innerHTML = "";
		hook1.innerHTML = "";
		hook2.innerHTML = "";
	});
	hook2.innerHTML = "";
	var curbestserver = "n00dles";
	while (true) {
		var g = 0;
		var w = 0;
		var h = 0;
		var serverlist = ["home"];
		for (var i = 0; i < serverlist.length; i++) {
			var current = ns.scan(serverlist[i]);
			h += ns.ps(serverlist[i]).filter(x => x.filename == '/jeek/hack.js' && x.args[0] == curbestserver).length;
			g += ns.ps(serverlist[i]).filter(x => x.filename == '/jeek/grow.js' && x.args[0] == curbestserver).length;
			w += ns.ps(serverlist[i]).filter(x => x.filename == '/jeek/weaken.js' && x.args[0] == curbestserver).length;
			for (var j = 0; j < current.length; j++) {
				if (!serverlist.includes(current[j])) {
					serverlist.push(current[j]);
				}
			}
			if (h + g + w == 0) {
				curbestserver = bestserver(ns);
			}
			hook0.innerHTML = curbestserver + "<BR>" + h.toString() + "/" + w.toString() + "/" + g.toString() + "<BR>" + (ns.getServerMoneyAvailable(curbestserver) / ns.getServerMaxMoney(curbestserver)).toString() + "<BR>" + (ns.getServerSecurityLevel(curbestserver) / ns.getServerMinSecurityLevel(curbestserver)).toString();
		}
		var serversizes = ns.getPurchasedServers().map(x => ns.getServerMaxRam(x)).map(y => Math.log(y) / Math.log(2));
		while (serversizes.length < 25) {
			serversizes.push(0);
		}
		serversizes = serversizes.map(x => Math.ceil(Math.min(255, x * 256 / 20)).toString(16)).map(y => "#" + y + y + y)
		serversizes = shuffle(serversizes);
		ns.print(serversizes);
		var servertable = "<RIGHT><TABLE BORDER=0 WIDTH=100% CELLPADDING=0 CELLSPACING=0>";
		for (var i = 0; i < 25; i++) {
			if (i % 5 == 0) {
				servertable = servertable + "<TR>";
			}
			servertable = servertable + "<TD WIDTH=20% BGCOLOR=" + serversizes[i] + ">&nbsp&nbsp;&nbsp;&nbsp;</TD>";
			if (i % 5 == 4) {
				servertable = servertable + "</TR>";
			}

		}
		servertable = servertable + "</TABLE></RIGHT>";
		pserverarea.innerHTML = "<TD COLSPAN=2>" + servertable + "</TD>";
		await ns.sleep(1000);
	}
	hook0.innerHTML = "<center>30</center>";
	hook1.innerHTML = "<center>90</center>";
}
