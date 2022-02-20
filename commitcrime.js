/** @param {NS} ns **/
export async function main(ns) {
    var targetCrime = "Shoplift";
	var crimes = ["Heist", "Assassination", "Kidnap", "Grand Theft Auto", "Homicide", "Traffick Illegal Arms", "Deal Drugs", "Mug Someone", "Larceny", "Rob Store", "Shoplift"];
	for (var i = crimes.length - 1 ; i >= 0 ; i--) {
		if (ns.getCrimeChance(crimes[i]) > .5) {
			targetCrime = crimes[i]
		}
	}
	if (!ns.isBusy()) {
		ns.commitCrime(targetCrime);
		ns.toast("Crime: " + targetCrime);
	}
    ns.spawn("/jeek/commitcrime.js");
}
