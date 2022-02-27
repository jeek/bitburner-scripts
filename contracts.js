// Find Largest Prime Factor
// Given a number, find its largest prime factor. A prime factor
// is a factor that is a prime number.
function findprime(ns, data) {
	var i = data;
	var j = 2;
	while (i > 1) {
		while (i % j == 0) {
			i = Math.floor(i / j);
		}
		j = j + 1;
	}
	return j - 1;
}

// Subarray with Maximum Sum
// Given an array of integers, find the contiguous subarray (containing
// at least one number) which has the largest sum and return that sum.
function subarray(ns, data) {
	var best = -1000;
	for (var i = 0; i < data.length; i++) {
		for (var j = i + 1; j < data.length; j++) {
			best = Math.max(best, data.slice(i, j + 1).reduce((a, b) => a + b, 0));
		}
	}
	return best;
}

// Total Ways to Sum
// Given a number, how many different ways can that number be written as
// a sum of at least two positive integers?
// Spiralize Matrix
// Given an array of array of numbers representing a 2D matrix, return the
// elements of that matrix in clockwise spiral order.
//
// Example: The spiral order of
//
// [1, 2, 3, 4]
// [5, 6, 7, 8]
// [9, 10, 11, 12]
//
// is [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
// Array Jumping Game
// You are given an array of integers where each element represents the
// maximum possible jump distance from that position. For example, if you
// are at position i and your maximum jump length is n, then you can jump
// to any position from i to i+n.
//
// Assuming you are initially positioned at the start of the array, determine
// whether you are able to reach the last index of the array.
function arrayjumping(ns, data) {
	var answer = [];
	while (answer.length < data.length) {
		answer.push(0);
	}
	answer[0] = 1;
	for (var i = 0; i < data.length; i++) {
		if (answer[i] == 1) {
			for (var j = i; j <= i + answer[i]; j++) {
				answer[i] = 1;
			}
		}
	}
	return answer[answer.length - 1];
}
// Merge Overlapping Intervals
// Given an array of intervals, merge all overlapping intervals. An interval
// is an array with two numbers, where the first number is always less than
// the second (e.g. [1, 5]).
//
// The intervals must be returned in ASCENDING order.
//
// Example:
// [[1, 3], [8, 10], [2, 6], [10, 16]]
// merges into [[1, 6], [8, 16]]
// Generate IP Addresses
// Given a string containing only digits, return an array with all possible
// valid IP address combinations that can be created from the string.
//
// An octet in the IP address cannot begin with ‘0’ unless the number itself
// is actually 0. For example, “192.168.010.1” is NOT a valid IP.
//
// Examples:
// 25525511135 -> [255.255.11.135, 255.255.111.35]
// 1938718066 -> [193.87.180.66]
// Algorithmic Stock Trader I
// You are given an array of numbers representing stock prices, where the
// i-th element represents the stock price on day i.
//
// Determine the maximum possible profit you can earn using at most one
// transaction (i.e. you can buy an sell the stock once). If no profit
// can be made, then the answer should be 0. Note that you must buy the stock
// before you can sell it.

function stocks(ns, transactions) {
	//	ns.tprint(transactions);
	var queue = [
		[0, transactions]
	];
	console.log(queue);
	var zzz = 0;
	var best = 0;
	if (transactions.length >= 2) {
		for (var j = 0; j < transactions.length; j++) {
			for (var k = j + 1; k < transactions.length; k++) {
				if (transactions[j] < transactions[k]) {
					best = Math.max(best, 0 - transactions[j] + transactions[k]);
				}
			}
		}
	}
	return best;
}
// Algorithmic Stock Trader II
// You are given an array of numbers representing stock prices, where the
// i-th element represents the stock price on day i.
//
// Determine the maximum possible profit you can earn using as many transactions
// as you’d like. A transaction is defined as buying and then selling one
// share of the stock. Note that you cannot engage in multiple transactions at
// once. In other words, you must sell the stock before you buy it again. If no
// profit can be made, then the answer should be 0.

function stocks2(ns, transactions) {
	//	ns.tprint(transactions);
	var queue = [
		[0, transactions]
	];
	console.log(queue);
	var zzz = 0;
	var best = 0;
	while (queue.length > 0) {
		var aa = queue[0][0];
		var bb = queue[0][1];
		zzz = zzz + 1;
		//    if (zzz > 10) {
		//      return best;
		//    }
		queue.shift();
		console.log(best, aa, bb, queue.length);
		best = Math.max(best, aa);
		if (bb.length >= 2) {
			for (var j = 0; j < bb.length; j++) {
				for (var k = j + 1; k < bb.length; k++) {
					if (bb[j] < bb[k]) {
						var a = aa - bb[j] + bb[k];
						var b = bb.slice(k + 1).map(x => x);
						var good = true;
						for (var l = 0; l < queue.length; l++) {
							if (JSON.stringify(queue[l][1]) == JSON.stringify(b)) {
								good = false;
								queue[l][0] = Math.max(queue[l][0], a);
							}
						}
						if (good == true) {
							queue.push([a, b]);
						}
					}
				}
			}
		}
		queue = queue.sort(function (aaa, bbb) {
			return 0 - aaa[1].length + bbb[1].length;
		})
	}
	return best;
}
// Algorithmic Stock Trader III
// You are given an array of numbers representing stock prices, where the
// i-th element represents the stock price on day i.
//
// Determine the maximum possible profit you can earn using at most two
// transactions. A transaction is defined as buying and then selling one share
// of the stock. Note that you cannot engage in multiple transactions at once.
// In other words, you must sell the stock before you buy it again. If no profit
// can be made, then the answer should be 0.

function stocks3(ns, transactions) {
	//	ns.tprint(transactions);
	var queue = [
		[0, transactions]
	];
	console.log(queue);
	var zzz = 0;
	var best = 0;
	if (transactions.length >= 2) {
		for (var j = 0; j < transactions.length; j++) {
			for (var k = j + 1; k < transactions.length; k++) {
				for (var l = k + 1; l < transactions.length; l++) {
					for (var m = l + 1; m < transactions.length; m++) {
						if (transactions[j] < transactions[k]) {
							if (transactions[l] < transactions[m]) {
								best = Math.max(best, 0 - transactions[j] + transactions[k] - transactions[l] + transactions[m]);
							}
						}
					}
				}
			}
		}
	}
	return Math.max(best, stocks(ns, transactions));
}
// Algorithmic Stock Trader IV
// You are given an array with two elements. The first element is an integer k.
// The second element is an array of numbers representing stock prices, where the
// i-th element represents the stock price on day i.
//
// Determine the maximum possible profit you can earn using at most k transactions.
// A transaction is defined as buying and then selling one share of the stock.
// Note that you cannot engage in multiple transactions at once. In other words,
// you must sell the stock before you can buy it. If no profit can be made, then
// the answer should be 0.
function stocks4(ns, data) {
	ns.tail();
	ns.print(data);

	var left = data[0];
	var transactions = data[1];
	if (left == 0) {
		return 0;
	}
	if (transactions.length < 2) {
		return 0;
	}
	var best = 0;
	for (var i = 0 ; i < transactions.length ; i++) {
        for (var j = i + 1 ; j < transactions.length ; j++) {
			if (transactions[i] < transactions[j]) {
				best = Math.max(best, best-transactions[i] + transactions[j], best-transactions[i] + transactions[j] + stocks4(ns, [left-1, transactions.slice(j+1)]) );
			}
		}
	}
	return best;
}
// Minimum Path Sum in a Triangle
// You are given a 2D array of numbers (array of array of numbers) that represents a
// triangle (the first array has one element, and each array has one more element than
// the one before it, forming a triangle). Find the minimum path sum from the top to the
// bottom of the triangle. In each step of the path, you may only move to adjacent
// numbers in the row below.
function minpathtri(ns, data) {
    while (data.length > 1) {
		for (var i = 0 ; i < data[data.length - 2].length ; i++) {
			data[data.length-2][i] = data[data.length-2][i] + Math.min(data[data.length-1][i],data[data.length-1][i+1]);
		}
		data.pop();
	}
	return data[0][0];
}
// Unique Paths in a Grid I
// You are given an array with two numbers: [m, n]. These numbers represent a
// m x n grid. Assume you are initially positioned in the top-left corner of that
// grid and that you are trying to reach the bottom-right corner. On each step,
// you may only move down or to the right.
//
// Determine how many unique paths there are from start to finish.
function uniquePathsI(ns, data) {
	var answer = [];
	while (answer.length < data[0]) {
		answer.push([]);
		while (answer[answer.length - 1].length < data[1]) {
			answer[answer.length - 1].push(0);
		}
	}
	answer[data[0] - 1][data[1] - 1] = 1;
	for (var i = data[0] - 1; i >= 0; i--) {
		for (var j = data[1] - 1; j >= 0; j--) {
			if ((i < data[0] - 1) || (j < data[1] - 1)) {
				answer[i][j] = (i + 1 < data[0] ? answer[i + 1][j] : 0) + (j + 1 < data[1] ? answer[i][j + 1] : 0);
			}
		}
	}
	return answer[0][0];
}

// Unique Paths in a Grid II
// You are given a 2D array of numbers (array of array of numbers) representing
// a grid. The 2D array contains 1’s and 0’s, where 1 represents an obstacle and
// 0 represents a free space.
//
// Assume you are initially positioned in top-left corner of that grid and that you
// are trying to reach the bottom-right corner. In each step, you may only move down
// or to the right. Furthermore, you cannot move onto spaces which have obstacles.
//
// Determine how many unique paths there are from start to finish.
// Sanitize Parentheses in Expression
// Given a string with parentheses and letters, remove the minimum number of invalid
// parentheses in order to validate the string. If there are multiple minimal ways
// to validate the string, provide all of the possible results.
//
// The answer should be provided as an array of strings. If it is impossible to validate
// the string, the result should be an array with only an empty string.
//
// Examples:
// ()())() -> [()()(), (())()]
// (a)())() -> [(a)()(), (a())()]
// )( -> [“”]
// Find All Valid Math Expressions
// You are given a string which contains only digits between 0 and 9 as well as a target
// number. Return all possible ways you can add the +, -, and * operators to the string
// of digits such that it evaluates to the target number.
//
// The answer should be provided as an array of strings containing the valid expressions.
//
// NOTE: Numbers in an expression cannot have leading 0’s
//
// Examples:
// Input: digits = “123”, target = 6
// Output: [1+2+3, 1*2*3]
//
// Input: digits = “105”, target = 5
// Output: [1*0+5, 10-5]

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("disableLog");
	ns.disableLog("scan");
	ns.disableLog("sleep");
	var parent = Object();
	var serverlist = ['home'];
	for (var i = 0; i < serverlist.length; i++) {
		var current = ns.scan(serverlist[i]);
		for (var j = 0; j < current.length; j++) {
			if (!serverlist.includes(current[j])) {
				parent[current[j]] = serverlist[i];
				serverlist.push(current[j]);
			}
		}
		await ns.sleep(1);
	}
	var z = 0;
	if (ns.getPlayer().factions.length != 0) {
		var currentcontracts = serverlist.map(x => ns.ls(x).map(y => [x, y])).flat().filter(z => z[1].substring(z[1].length - 4) == ".cct");
		for (var ii = currentcontracts.length - 1; ii >= 0; ii--) {
			//			ns.connect("home");
			//			var j = currentcontracts[i][0];
			//			while (ns.getCurrentServer() != currentcontracts[i][0]) {
			//				ns.print(ns.getCurrentServer())
			//				if (parent[j] == ns.getCurrentServer()) {
			//					ns.connect(j);
			//					j = currentcontracts[i][0];
			//				} else {
			//					j = parent[j];
			//				}
			//				await ns.sleep(60);
			//			}
			z = z + 1;
			var zz = 0;
			if (ns.codingcontract.getContractType(currentcontracts[ii][1], currentcontracts[ii][0]) == "Unique Paths in a Grid I") {
				ns.toast(ns.codingcontract.attempt(uniquePathsI(ns, ns.codingcontract.getData(currentcontracts[ii][1], currentcontracts[ii][0])), currentcontracts[ii][1], currentcontracts[ii][0], { returnReward: true }));
				zz += 1;
			} else if (ns.codingcontract.getContractType(currentcontracts[ii][1], currentcontracts[ii][0]) == "Algorithmic Stock Trader I") {
				ns.toast(ns.codingcontract.attempt(stocks(ns, ns.codingcontract.getData(currentcontracts[ii][1], currentcontracts[ii][0])), currentcontracts[ii][1], currentcontracts[ii][0], { returnReward: true }));
				zz += 1;
			} else if (ns.codingcontract.getContractType(currentcontracts[ii][1], currentcontracts[ii][0]) == "Algorithmic Stock Trader II") {
				ns.toast(ns.codingcontract.attempt(stocks2(ns, ns.codingcontract.getData(currentcontracts[ii][1], currentcontracts[ii][0])), currentcontracts[ii][1], currentcontracts[ii][0], { returnReward: true }));
				zz += 1;
			} else if (ns.codingcontract.getContractType(currentcontracts[ii][1], currentcontracts[ii][0]) == "Algorithmic Stock Trader III") {
				ns.toast(ns.codingcontract.attempt(stocks3(ns, ns.codingcontract.getData(currentcontracts[ii][1], currentcontracts[ii][0])), currentcontracts[ii][1], currentcontracts[ii][0], { returnReward: true }));
				zz += 1;
			} else if (ns.codingcontract.getContractType(currentcontracts[ii][1], currentcontracts[ii][0]) == "Algorithmic Stock Trader III") {
				ns.toast(ns.codingcontract.attempt(stocks3(ns, ns.codingcontract.getData(currentcontracts[ii][1], currentcontracts[ii][0])), currentcontracts[ii][1], currentcontracts[ii][0], { returnReward: true }));
				zz += 1;
//} else if (ns.codingcontract.getContractType(currentcontracts[ii][1], currentcontracts[ii][0]) == "Algorithmic Stock Trader IV") {
//				ns.toast(ns.codingcontract.attempt(stocks4(ns, ns.codingcontract.getData(currentcontracts[ii][1], currentcontracts[ii][0])), currentcontracts[ii][1], currentcontracts[ii][0], { returnReward: true }));
//				zz += 1;
			} else if (ns.codingcontract.getContractType(currentcontracts[ii][1], currentcontracts[ii][0]) == "Subarray with Maximum Sum") {
				ns.toast(ns.codingcontract.attempt(subarray(ns, ns.codingcontract.getData(currentcontracts[ii][1], currentcontracts[ii][0])), currentcontracts[ii][1], currentcontracts[ii][0], { returnReward: true }));
				zz += 1;
			} else if (ns.codingcontract.getContractType(currentcontracts[ii][1], currentcontracts[ii][0]) == "Array Jumping Game") {
				ns.toast(ns.codingcontract.attempt(arrayjumping(ns, ns.codingcontract.getData(currentcontracts[ii][1], currentcontracts[ii][0])), currentcontracts[ii][1], currentcontracts[ii][0], { returnReward: true }));
				zz += 1;
			} else if (ns.codingcontract.getContractType(currentcontracts[ii][1], currentcontracts[ii][0]) == "Find Largest Prime Factor") {
				ns.toast(ns.codingcontract.attempt(findprime(ns, ns.codingcontract.getData(currentcontracts[ii][1], currentcontracts[ii][0])), currentcontracts[ii][1], currentcontracts[ii][0], { returnReward: true }));
				zz += 1;
			} else if (ns.codingcontract.getContractType(currentcontracts[ii][1], currentcontracts[ii][0]) == "Minimum Path Sum in a Triangle") {
				ns.toast(ns.codingcontract.attempt(minpathtri(ns, ns.codingcontract.getData(currentcontracts[ii][1], currentcontracts[ii][0])), currentcontracts[ii][1], currentcontracts[ii][0], { returnReward: true }));
				zz += 1;
			} else {
				if (zz == 0) {
					ns.print(ns.codingcontract.getContractType(currentcontracts[ii][1], currentcontracts[ii][0]));
					ns.print(ns.codingcontract.getData(currentcontracts[ii][1], currentcontracts[ii][0]));
				}
			}
		}
	}
}
