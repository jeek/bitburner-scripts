// packitin.js by jeek
// Super fast approximation of optimal warehouse layout.
//
// death to the Zoë cult (not Zoë herself, though, she's cool)

let mults = [
    [.30, .20, .72, .30], //  0 - Agriculture
    [.20, .20, .25, .25], //  1 - Chemical
    [.19, .00, .20, .36], //  2 - Computer
    [.30, .00, .65, .05], //  3 - Energy
    [.20, .35, .50, .15], //  4 - Fishing
    [.25, .15, .05, .30], //  5 - Food
    [.10, .10, .10, .10], //  6 - Healthcare
    [.45, .40, .30, .45], //  7 - Mining
    [.20, .15, .05, .25], //  8 - Pharmaceutical
    [.60, .06, .00, .60], //  9 - Real Estate
    [.36, .19, .32, .00], // 10 - Robotics
    [.18, .25, .15, .05], // 11 - Software
    [.15, .15, .15, .20], // 12 - Tobacco
    [.50, .00, .50, .40]  // 13 - Utilities
]

function calc(ai = 0, hw = 0, re = 0, rob = 0, industry = 0) {
    return (((.002 * ai + 1) ** mults[industry][0]) * ((.002 * hw + 1) ** mults[industry][1]) * ((.002 * re + 1) ** mults[industry][2]) *  ((.002 * rob + 1) ** mults[industry][3])) ** .73
}

function optimizerr(industry, size) {
    if (size == 0) {
        return [0, 0, 0];
    }
    let searchmin = 0;
    let searchmax = size;
    let divs = (searchmax - searchmin) * .1;
    let scores = [[calc(0,0,0,size/.5, industry), 0, size]];
    while (divs > .00005 && searchmin < searchmax) {
        let i = searchmin;
        while (i <= searchmax + divs) {
            if (i <= size && i >= 0) {
                scores = scores.concat([[calc(0, 0, i / .005,(size-i) / .5,industry), i, size-i]]);
            }
            i += divs;
        }
        scores = scores.sort((a, b) => {return a[0] - b[0];});
        searchmin = scores[scores.length-1][0] - divs;
        searchmax = scores[scores.length-1][0] + divs;
        divs *= .1;
    }
    return [scores[scores.length-1][0], scores[scores.length-1][1], size - scores[scores.length-1][1]];
}

function optimizeah(industry, size) {
    if (size == 0) {
        return [0, 0, 0];
    }
    let searchmin = 0;
    let searchmax = size;
    let divs = (searchmax - searchmin) * .1;
    let scores = [[calc(0, size/.06, 0, 0, industry), 0, size]];
    while (divs > .00005 && searchmin < searchmax) {
        let i = searchmin;
        while (i <= searchmax + divs) {
            if (i <= size && i >= 0) {
                scores = scores.concat([[calc(i / .1, (size-i) / .06, 0, 0, industry), i, size-i]]);
            }
            i += divs;
        }
        scores = scores.sort((a, b) => {return a[0] - b[0];});
        searchmin = scores[scores.length-1][0] - divs;
        searchmax = scores[scores.length-1][0] + divs;
        divs *= .1;
    }
    return [scores[scores.length-1][0], scores[scores.length-1][1], size - scores[scores.length-1][1]];
}

export function optimize(industry, size) {
    if (size == 0) {
        return [0, 0, 0, 0, 0];
    }
    let searchmin = 0;
    let searchmax = size;
    let divs = (searchmax - searchmin) * .1;
    let scores = [[0, 0, 0, 0, 0, 0, 0, 0]];
    while (divs > .00005 && searchmin < searchmax) {
        let i = searchmin;
        while (divs > .00005 && i <= searchmax + divs) {
            if (i <= size && i >= 0) {
                let rr = optimizerr(industry, i);
                let ah = optimizeah(industry, size - i);
                scores = scores.concat([[ah[0] * rr[0], i, size - i, ah[1]/.1, ah[2]/.06, rr[1]/.005, rr[2]/.5]]);
            }
            i += divs;
        }
        scores.sort((a, b) => {return a[0] - b[0];});
        searchmin = scores[scores.length-1][1] - divs;
        searchmax = scores[scores.length-1][1] + divs;
        divs *= .1;
    }
    let finalcheck = [[Math.floor(scores[scores.length-1][3]), Math.floor(scores[scores.length-1][4]), Math.floor(scores[scores.length-1][5]), Math.floor(scores[scores.length-1][6])]];
    for (let ai = finalcheck[0][0] ; ai <= finalcheck[0][0] + 20 ; ai++) {
        for (let hw = finalcheck[0][1] ; hw <= finalcheck[0][1] + 32 ; hw++) {
            for (let re = finalcheck[0][2] ; re <= finalcheck[0][2] + 100 ; re++) {
                for (let rob = finalcheck[0][3] ; rob <= finalcheck[0][3] + 4 ; rob++) {
                    if (ai * .1 + hw * .06 + re * .005 + rob * .5 <= size) {
                        finalcheck.push([ai, hw, re, rob]);
                    }
                }
            }
        }
    }
    finalcheck = finalcheck.filter(x => x[0] * .1 + x[1] * .06 + x[2] * .005 + x[3] * .5 <= size);
    finalcheck = finalcheck.sort((a, b) => calc(a[0], a[1], a[2], a[3], industry) - calc(b[0], b[1], b[2], b[3], industry));
    finalcheck[finalcheck.length-1].push(6 * calc(finalcheck[finalcheck.length-1][0], finalcheck[finalcheck.length-1][1], finalcheck[finalcheck.length-1][2], finalcheck[finalcheck.length-1][3], industry));
    return finalcheck[finalcheck.length-1];
}

/** @param {NS} ns */
export async function main(ns) {
    let industry = ns.args[0];
	let size = ns.args[1];
    ns.tprint(optimize(["Agriculture", "Chemical", "Computer", "Energy", "Fishing", "Food", "Healthcare", "Mining", "Pharmaceutical", "Real Estate", "Robotics", "Software", "Tobacco", "Utilities"].indexOf(ns.args[0]), ns.args[1]));
}
