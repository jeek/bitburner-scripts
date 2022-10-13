// corp.js library by jeek

const CITIES = ["Aevum", "Chongqing", "Ishima", "New Tokyo", "Sector-12", "Volhaven"];

export const DIVISIONS = {
    "Energy": {
        "Warehouse": {
            "Real Estate": .65,
            "Hardware": 0,
            "Robots": .05,
            "AI Cores": .3
        },
        "Factors": {
            "Science": .7,
            "Advertising": .08
        },
        "Material Input": {
            "Hardware": .1,
            "Metal": .2
        },
        "Material Output": {
            "Energy": 1
        },
        "HQ Ratio": {
            "Operations": 2,
            "Engineer": 2,
            "Business": 1,
            "Management": 2,
            "Research & Development": 2
        },
        "Sat Ratio": {
            "Operations": 2,
            "Engineer": 2,
            "Business": 1,
            "Management": 2,
            "Research & Development": 2
        },
        "Launch Cost": 225e9
    },
    "Utilities": {
        "Warehouse": {
            "Real Estate": .65,
            "Hardware": 0,
            "Robots": .4,
            "AI Cores": .4
        },
        "Factors": {
            "Science": .6,
            "Advertising": .08
        },
        "Material Input": {
            "Hardware": .1,
            "Metal": .1
        },
        "Material Output": {
            "Water": 1
        },
        "HQ Ratio": {
            "Operations": 2,
            "Engineer": 2,
            "Business": 1,
            "Management": 2,
            "Research & Development": 2
        },
        "Sat Ratio": {
            "Operations": 2,
            "Engineer": 2,
            "Business": 1,
            "Management": 2,
            "Research & Development": 2
        },
        "Launch Cost": 150e9
    },
    "Agriculture": {
        "Warehouse": {
            "Real Estate": .72,
            "Hardware": .2,
            "Robots": .3,
            "AI Cores": .3
        },
        "Factors": {
            "Science": .5,
            "Advertising": .04
        },
        "Material Input": {
            "Water": .5,
            "Energy": .5,
        },
        "Material Output": {
            "Food": 1,
            "Plants": 1
        },
        "HQ Ratio": {
            "Operations": 2,
            "Engineer": 2,
            "Business": 1,
            "Management": 2,
            "Research & Development": 2
        },
        "Sat Ratio": {
            "Operations": 2,
            "Engineer": 2,
            "Business": 1,
            "Management": 2,
            "Research & Development": 2
        },
        "Launch Cost": 40e9
    },
    "Fishing": {
        "Warehouse": {
            "Real Estate": .15,
            "Hardware": .35,
            "Robots": .5,
            "AI Cores": .2
        },
        "Factors": {
            "Science": .35,
            "Advertising": .08
        },
        "Material Input": {
            "Energy": .5
        },
        "Material Output": {
            "Food": 1
        },
        "HQ Ratio": {
            "Operations": 2,
            "Engineer": 2,
            "Business": 1,
            "Management": 2,
            "Research & Development": 2
        },
        "Sat Ratio": {
            "Operations": 2,
            "Engineer": 2,
            "Business": 1,
            "Management": 2,
            "Research & Development": 2
        },
        "Launch Cost": 80e9
    },
    "Mining": {
        "Warehouse": {
            "Real Estate": .3,
            "Hardware": .4,
            "Robots": .45,
            "AI Cores": 45
        },
        "Factors": {
            "Science": .26,
            "Advertising": .06
        },
        "Material Input": {
            "Energy": .8
        },
        "Material Output": {
            "Metal": 1
        },
        "HQ Ratio": {
            "Operations": 2,
            "Engineer": 2,
            "Business": 1,
            "Management": 2,
            "Research & Development": 2
        },
        "Sat Ratio": {
            "Operations": 2,
            "Engineer": 2,
            "Business": 1,
            "Management": 2,
            "Research & Development": 2
        },
        "Launch Cost": 300e9
    },
    "Food": {
        "Warehouse": {
            "Real Estate": .05,
            "Hardware": .15,
            "Robots": .3,
            "AI Cores": .25
        },
        "Factors": {
            "Science": .12,
            "Advertising": .25
        },
        "Material Input": {
            "Food": .5,
            "Water": .5,
            "Energy": .2
        },
        "HQ Ratio": {
            "Operations": 37,
            "Engineer": 10,
            "Management": 17,
            "Research & Development": 26
        },
        "Janaszar": {
            "Engineer": 28,
            "Management": 72
        },
        "Sat Ratio": {
            "Research & Development": 1
        },
        "Launch Cost": 10e9
    },
    "Tobacco": {
        "Warehouse": {
            "Real Estate": .15,
            "Hardware": .15,
            "Robots": .2,
            "AI Cores": .15
        },
        "Factors": {
            "Science": .75,
            "Advertising": .2
        },
        "Material Input": {
            "Plants": 1,
            "Water": .2
        },
        "HQ Ratio": {
            "Operations": 1,
            "Management": 21,
            "Research & Development": 68
        },
        "Janaszar": {
            "Engineer": 9,
            "Management": 91
        },
        "Sat Ratio": {
            "Research & Development": 1
        },
        "Launch Cost": 20e9
    },
    "Chemical": {
        "Warehouse": {
            "Real Estate": .25,
            "Hardware": .2,
            "Robots": .25,
            "AI Cores": .2
        },
        "Factors": {
            "Science": .75,
            "Advertising": .07
        },
        "Material Input": {
            "Plants": 1,
            "Energy": .5,
            "Water": .5
        },
        "Material Output": {
            "Chemicals": 1
        },
        "HQ Ratio": {
            "Operations": 2,
            "Engineer": 2,
            "Business": 1,
            "Management": 2,
            "Research & Development": 2
        },
        "Sat Ratio": {
            "Operations": 2,
            "Engineer": 2,
            "Business": 1,
            "Management": 2,
            "Research & Development": 2
        },
        "Launch Cost": 70e9
    },
    "Pharmaceutical": {
        "Warehouse": {
            "Real Estate": .05,
            "Hardware": .15,
            "Robots": .25,
            "AI Cores": .2
        },
        "Factors": {
            "Science": .8,
            "Advertising": .16
        },
        "Material Input": {
            "Chemicals": 2,
            "Energy": 1,
            "Water": .5
        },
        "Material Output": {
            "Drugs": 1
        },
        "HQ Ratio": {
            "Engineer": 31,
            "Management": 69
        },
        "Janaszar": {
            "Engineer": 31,
            "Management": 69
        },
        "Sat Ratio": {
            "Research & Development": 1
        },
        "Launch Cost": 200e9
    },
    "Computer": {
        "Warehouse": {
            "Real Estate": .2,
            "Hardware": 0,
            "Robots": .36,
            "AI Cores": .19
        },
        "Factors": {
            "Science": .62,
            "Advertising": .17
        },
        "Material Input": {
            "Metal": 2,
            "Energy": 1
        },
        "Material Output": {
            "Hardware": 1
        },
        "HQ Ratio": {
            "Engineer": 37,
            "Management": 63
        },
        "Janaszar": {
            "Engineer": 37,
            "Management": 63
        },
        "Sat Ratio": {
            "Research & Development": 1
        },
        "Launch Cost": 500e9
    },
    "Robotics": {
        "Warehouse": {
            "Real Estate": .32,
            "AI Cores": .36,
            "Hardware": .19,
            "Robots": 0
        },
        "Factors": {
            "Science": .65,
            "Advertising": .18
        },
        "Material Input": {
            "Hardware": 5,
            "Energy": 3
        },
        "Material Output": {
            "Robots": 1
        },
        "HQ Ratio": {
            "Engineer": 30,
            "Management": 70
        },
        "Janaszar": {
            "Engineer": 30,
            "Management": 70
        },
        "Sat Ratio": {
            "Research & Development": 1
        },
        "Launch Cost": 1e12
    },
    "Software": {
        "Warehouse": {
            "Real Estate": .15,
            "Hardware": .25,
            "AI Cores": .18,
            "Robots": .05
        },
        "Factors": {
            "Science": .62,
            "Advertising": .16
        },
        "Material Input": {
            "Hardware": .5,
            "Energy": .5
        },
        "Material Output": {
            "AI Cores": 1
        },
        "HQ Ratio": {
            "Engineer": 37,
            "Management": 63
        },
        "Janaszar": {
            "Engineer": 37,
            "Management": 63
        },
        "Sat Ratio": {
            "Research & Development": 1
        },
        "Launch Cost": 25e9
    },
    "Healthcare": {
        "Warehouse": {
            "Real Estate": .1,
            "Hardware": .1,
            "Robots": .1,
            "AI Cores": .1
        },
        "Factors": {
            "Science": .75,
            "Advertising": .11
        },
        "Material Input": {
            "Robots": 10,
            "AI Cores": 5,
            "Energy": 5,
            "Water": 5
        },
        "HQ Ratio": {
            "Engineer": 27,
            "Management": 93
        },
        "Janaszar": {
            "Engineer": 27,
            "Management": 93
        },
        "Sat Ratio": {
            "Research & Development": 1
        },
        "Launch Cost": 750e9
    },
    "Real Estate": {
        "Warehouse": {
            "Real Estate": 0,
            "Hardware": .05,
            "AI Cores": .6,
            "Robots": .6
        },
        "Factors": {
            "Science": .05,
            "Advertising": .25
        },
        "Material Input": {
            "Metal": 5,
            "Energy": 5,
            "Water": 2,
            "Hardware": 4
        },
        "Material Output": {
            "Real Estate": 1
        },
        "HQ Ratio": {
            "Engineer": 56,
            "Management": 44
        },
        "Janaszar": {
            "Management": 1
        },
        "Sat Ratio": {
            "Research & Development": 1
        },
        "Launch Cost": 600e9
    }
}

let mults = Object.keys(DIVISIONS).map(x => [x, DIVISIONS[x]['Warehouse']]).sort((a, b) => {return a[0].localeCompare(b[0])}).map(x => [x[1]["AI Cores"], x[1]["Hardware"], x[1]["Real Estate"], x[1]["Robots"]]);

// IMPLEMENT BIG HARRY
// Big Harry: I go 1/1/1/1 +11, 2/1/3/2 + 22, then 6/3/8/6 + 22, then all into r&d after

const PRODUCTRATINGS = {
  "Food": {
    "Quality": 0.7,
    "Performance": 0.0,
    "Durability": 0.1,
    "Reliability": 0.0,
    "Aesthetics": 0.2,
    "Features": 0.0
  },
  "Tobacco": {
    "Quality": 0.4,
    "Durability": 0.2,
    "Performance": 0.0,
    "Reliability": 0.2,
    "Aesthetics": 0.2,
    "Features": 0.0
  },
  "Pharmaceutical": {
    "Quality": 0.2,
    "Performance": 0.2,
    "Aesthetics": 0.0,
    "Durability": 0.1,
    "Reliability": 0.3,
    "Features": 0.2
  },
  "Computer": {
    "Quality": 0.15,
    "Performance": 0.25,
    "Durability": 0.25,
    "Reliability": 0.2,
    "Aesthetics": 0.05,
    "Features": 0.1
  },
  "Robotics": {
    "Quality": 0.1,
    "Performance": 0.2,
    "Durability": 0.2,
    "Reliability": 0.2,
    "Aesthetics": 0.1,
    "Features": 0.2
  },
  "Software": {
    "Quality": 0.2,
    "Performance": 0.2,
    "Reliability": 0.2,
    "Aesthetics": 0.0,
    "Durability": 0.2,
    "Features": 0.2
  },
  "Healthcare": {
    "Quality": 0.4,
    "Performance": 0.1,
    "Durability": 0.1,
    "Reliability": 0.3,
    "Aesthetics": 0.0,
    "Features": 0.1
  },
  "RealEstate": {
    "Quality": 0.2,
    "Performance": 0.0,
    "Durability": 0.25,
    "Reliability": 0.1,
    "Aesthetics": 0.35,
    "Features": 0.1
  },
  "Real Estate": {
    "Quality": 0.2,
    "Durability": 0.25,
    "Performance": 0.0,
    "Reliability": 0.1,
    "Aesthetics": 0.35,
    "Features": 0.1
  }
}

class Employee {
	constructor (ns, division, city, name) {
		this.ns = ns;
		this.division = division;
		this.city = city;
		this.name = name;
	}
    get int() {
        let c = eval("this.ns.corporation");
		return c.getEmployee(this.division, this.city, this.name).int * (1 + .1 * c.getUpgradeLevel("Neural Accelerators")) * (c.hasResearched(this.division, "Overclock") ? 1.25 : 1) * (c.hasResearched(this.division, "CPH4 Injections") ? 1.1 : 1);
    }
    get eff() {
        let c = eval("this.ns.corporation");
		return c.getEmployee(this.division, this.city, this.name).eff * (1 + .1 * c.getUpgradeLevel("FocusWires")) * (c.hasResearched(this.division, "Overclock") ? 1.25 : 1) * (c.hasResearched(this.division, "CPH4 Injections") ? 1.1 : 1);
    }
    get cre() {
        let c = eval("this.ns.corporation");
		return c.getEmployee(this.division, this.city, this.name).cre * (1 + .1 * c.getUpgradeLevel("Nuoptimal Nootropic Injector Implants")) * (c.hasResearched(this.division, "CPH4 Injections") ? 1.1 : 1);
    }
    get cha() {
        let c = eval("this.ns.corporation");
		return c.getEmployee(this.division, this.city, this.name).cha * (1 + .1 * c.getUpgradeLevel("Speech Processor Implants")) * (c.hasResearched(this.division, "CPH4 Injections") ? 1.1 : 1);
    }
    get exp() {
        let c = eval("this.ns.corporation");
		return c.getEmployee(this.division, this.city, this.name).exp;
    }
    get operations() {
        return this.int * .6 + this.cha * .1 + this.exp + this.cre * .5 + this.eff;
    }
    get engineer() {
        return this.int + this.cha * .1 + this.exp * 1.5 + this.eff;
    }
    get business() {
        return this.int * .4 + this.cha + this.exp * .5;
    }
    get management() {
        return this.cha * 2 + this.exp + this.cre * .2 + this.eff * .7;
    }
    get researchanddevelopment() {
        return this.int * 1.5 + this.exp * .8 + this.cre + this.eff * .5;
    }
    get training() {
        return 0;
    }
    get unassigned() {
        return 0;
    }
    get jobs() {
        return {
            "Operations": this.operations,
            "Business": this.business,
            "Engineer": this.engineer,
            "Management": this.management,
            "Research & Development": this.researchanddevelopment,
            "Unassigned": this.unassigned,
            "Training": this.training
        }
    }
}

class Office {
    #ns;
    constructor (ns, industry, city) {
        this.#ns = ns;
        this.industry = industry;
        this.city = city;
    }
    get divisionname() {
        let c = eval("this.#ns.corporation");
        let doIExist = c.getCorporation().divisions.filter(x => x.type == this.industry);
        if ((doIExist.length) == 0) {
            return null;
        }
        return doIExist[0].name;
    }
    get peeps() {
        let c = eval("this.#ns.corporation");
        return c.getOffice(this.divisionname, this.city).employees;
    }
    get business() {
        let c = eval("this.#ns.corporation");
        return this.peeps.filter(x => c.getEmployee(this.divisionname, this.city, x).pos === "Business").map(x => new Employee(this.#ns, this.divisionname, this.city, x).business).reduce((a, b) => {return a + b;}, 0);
    }
    get engineering() {
        let c = eval("this.#ns.corporation");
        return this.peeps.filter(x => c.getEmployee(this.divisionname, this.city, x).pos === "Engineer").map(x => new Employee(this.#ns, this.divisionname, this.city, x).engineer).reduce((a, b) => {return a + b;}, 0);
    }
    get randd() {
        let c = eval("this.#ns.corporation");
        return this.peeps.filter(x => c.getEmployee(this.divisionname, this.city, x).pos === "Research & Development").map(x => new Employee(this.#ns, this.divisionname, this.city, x).researchanddevelopment).reduce((a, b) => {return a + b;}, 0);
    }
    get operations() {
        let c = eval("this.#ns.corporation");
        return this.peeps.filter(x => c.getEmployee(this.divisionname, this.city, x).pos === "Operations").map(x => new Employee(this.#ns, this.divisionname, this.city, x).operations).reduce((a, b) => {return a + b;}, 0);
    }
    get management() {
        let c = eval("this.#ns.corporation");
        return this.peeps.filter(x => c.getEmployee(this.divisionname, this.city, x).pos === "Management").map(x => new Employee(this.#ns, this.divisionname, this.city, x).management).reduce((a, b) => {return a + b;}, 0);
    }
    get stats() {
        return {"Business": this.business, "Engineer": this.engineering, "Research & Development": this.randd, "Operations": this.operations, "Management": this.management,
                "Quality": this.qlt, "Performance": this.per, "Durability": this.dur, "Reliability": this.rel, "Aesthetics": this.aes, "Features": this.fea, "Rating": this.rat};
    }
    get qlt() {
        return .1 * this.engineering + .05 * this.management + .05 * this.randd + .02 * this.operations + .02 * this.business;
    }
    get per() {
        return .15 * this.engineering + .02 * this.management + .02 * this.randd + .02 * this.operations + .02 * this.business;
    }
    get dur() {
        return .05 * this.engineering + .02 * this.management + .08 * this.randd + .05 * this.operations + .05 * this.business;
    }
    get rel() {
        return .02 * this.engineering + .08 * this.management + .02 * this.randd + .05 * this.operations + .08 * this.business;
    }
    get aes() {
        return 0 * this.engineering + .08 * this.management + .05 * this.randd + .02 * this.operations + .1 * this.business;
    }
    get fea() {
        return .08 * this.engineering + .08 * this.management + .02 * this.randd + .05 * this.operations + .05 * this.business;
    }
    get rat() {
        if (!Object.keys(PRODUCTRATINGS).includes(this.industry)) {
            return null;
        }
        return PRODUCTRATINGS[this.industry]["Features"] * this.fea + PRODUCTRATINGS[this.industry]["Quality"] * this.qlt + PRODUCTRATINGS[this.industry]["Performance"] * this.per +
               PRODUCTRATINGS[this.industry]["Durability"] * this.dur + PRODUCTRATINGS[this.industry]["Reliability"] * this.rel + PRODUCTRATINGS[this.industry]["Features"] * this.fea;
    }
    async truxican(wait = true) {
        let c = eval("this.#ns.corporation");
        let answer = {};
        let currentjobs = {
            "Operations": 0,
            "Business": 0,
            "Engineer": 0,
            "Management": 0,
            "Research & Development": 0,
            "Unassigned": 0,
            "Training": 0
        }
        if (wait) {
            while (c.getCorporation().state === "START")
                await this.ns.sleep(0);
            while (c.getCorporation().state != "START")
                await this.ns.sleep(0);
        }
        for (let employee of c.getOffice(this.divisionname, this.city).employees) {
            answer[employee] = new Employee(this.#ns, this.divisionname, this.city, employee).jobs;
            currentjobs[c.getEmployee(this.divisionname, this.city, employee).pos] += 1;
            await this.ns.sleep(0);
        }
        let ranges = {}
        let final = [];
        for (let role of ["Operations", "Business", "Engineer", "Management", "Research & Development", "Unassigned", "Training"]) {
            if (currentjobs[role] > 0) {
                ranges[role] = [Object.keys(answer).map(x => answer[x][role]).reduce((a, b) => {return a <= b ? a : b}), Object.keys(answer).map(x => answer[x][role]).reduce((a, b) => {return a >= b ? a : b})]
                for (let employee of c.getOffice(this.divisionname, this.city).employees) {
                    if (ranges[role][0] == ranges[role][1]) {
                        final.push([0, 0, employee, role]);
                    } else {
                        final.push([(answer[employee][role] - ranges[role][0])/(ranges[role][1] - ranges[role][0]), answer[employee][role], employee, role]);
                    }
                    await this.ns.sleep(0);
                }
            }
        }
        final = final.sort((a, b) => {if (a[0] == b[0]) return a[1] - b[1]; return a[0] - b[0];});
        while (final.length > 0) {
            if (currentjobs[final[final.length-1][3]] > 0) {
                if (c.getEmployee(this.divisionname, this.city, final[final.length-1][2]).pos != final[final.length-1][3]) {
                    this.ns.tprint(this.divisionname, " ", this.city, " ", final[final.length-1][2], ": ", c.getEmployee(thisname.division, this.city, final[final.length-1][2]).pos, " -> ", final[final.length-1][3]);
                }
                c.assignJob(this.divisionname, this.city, final[final.length-1][2], final[final.length-1][3]);
                currentjobs[final[final.length-1][3]] -= 1;
                final = final.filter(x => x[2] != final[final.length-1][2]);
            } else {
                final = final.filter(x => x[3] != final[final.length-1][3]);
            }
            await this.ns.sleep(0);
        }
    }

    calc(ai = 0, hw = 0, re = 0, rob = 0, industry = 0) {
        return (((.002 * ai + 1) ** mults[industry][0]) * ((.002 * hw + 1) ** mults[industry][1]) * ((.002 * re + 1) ** mults[industry][2]) *  ((.002 * rob + 1) ** mults[industry][3])) ** .73
    }

    optimizerr(industry, size) {
        if (size == 0) {
            return [0, 0, 0];
        }
        let searchmin = 0;
        let searchmax = size;
        let divs = (searchmax - searchmin) * .1;
        let scores = [[this.calc(0, 0, 0,size/.5, industry), 0, size]];
        while (divs > .00005 && searchmin < searchmax) {
            let i = searchmin;
            while (i <= searchmax + divs) {
                if (i <= size && i >= 0) {
                    scores = scores.concat([[this.calc(0, 0, i / .005,(size-i) / .5, industry), i, size-i]]);
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

    optimizeah(industry, size) {
        if (size == 0) {
            return [0, 0, 0];
        }
        let searchmin = 0;
        let searchmax = size;
        let divs = (searchmax - searchmin) * .1;
        let scores = [[this.calc(0, size/.06, 0, 0, industry), 0, size]];
        while (divs > .00005 && searchmin < searchmax) {
            let i = searchmin;
            while (i <= searchmax + divs) {
                if (i <= size && i >= 0) {
                    scores = scores.concat([[this.calc(i / .1, (size-i) / .06, 0, 0, industry), i, size-i]]);
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

    optimize(industry, size) {
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
                    let rr = this.optimizerr(industry, i);
                    let ah = this.optimizeah(industry, size - i);
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
        finalcheck = finalcheck.sort((a, b) => this.calc(a[0], a[1], a[2], a[3], industry) - this.calc(b[0], b[1], b[2], b[3], industry));
        finalcheck[finalcheck.length-1].push(6 * this.calc(finalcheck[finalcheck.length-1][0], finalcheck[finalcheck.length-1][1], finalcheck[finalcheck.length-1][2], finalcheck[finalcheck.length-1][3], industry));
        return finalcheck[finalcheck.length-1];
    }
}

export class Division {
    #cities;
    #ns;
    constructor (ns, industry) {
        this.#ns = ns;
        let c = eval("this.#ns.corporation");
        this.industry = industry;
        if (c.getCorporation().divisions.filter(x => x.type == this.industry).length > 0) {
            this.#cities = {};
            for (let city of c.getDivision(this.name).cities) {
                this.#cities[city] = new Office(this.#ns, this.industry, city);
            }
        }
    }
    get name() {
        let c = eval("this.#ns.corporation")
        return c.getCorporation().divisions.filter(x => x.type == this.industry)[0].name;
    }
    get peeps() {
        let c = eval("this.#ns.corporation");
        let answer = [];
        for (let city of c.getCorporation().divisions.filter(x => x.type == this.industry)[0].cities) {
            answer = answer.concat(c.getOffice(this.name, city).employees.map(x => [city, x]));
        }
        return answer;
    }
    get cities() {
        let c = eval("this.#ns.corporation");
        let answer = {};
        for (let city of c.getDivision(this.name).cities) {
            if (!Object.keys(this.#cities).includes(city)) {
                this.#cities[city] = new Office(this.#ns, this.industry, city);
            }
            answer[city] = this.#cities[city];
        }
        return answer;
    }
    getCity(city) {
        let c = eval("this.#ns.corporation");
        if (!c.getDivision(this.name).cities.includes(city)) {
            return null;
        }
        if (!Object.keys(this.#cities).includes(city)) {
            this.#cities[city] = new Office(this.industry, city);
        }
        return this.#cities[city];
    }
    get ["Sector-12"]() {
        return this.getCity("Sector-12");
    }
    get Aevum() {
        return this.getCity("Aevum");
    }
    get Chongqing() {
        return this.getCity("Chongqing");
    }
    get Ishima() {
        return this.getCity("Ishima");
    }
    get ["New Tokyo"]() {
        return this.getCity("New Tokyo");
    }
    get Volhaven() {
        return this.getCity("Volhaven");
    }
}

export class Corp {
    #divisions;
    #ns;
    /** @param {NS} ns */
    constructor(ns, name="Corporation") {
        this.#ns = ns;
        this.name = name;
        this.#divisions = {}
        let c = eval("this.#ns.corporation");
        try {
            c.getCorporation().funds;
        } catch (error) {
            if (error === "cannot be called without a corporation") {
                try {
                    c.createCorporation(name, false);
                } catch (error) {
                    if (error === "cannot use seed funds outside of BitNode 3") {
                        c.createCorporation(name, true);
                    } else {
                        throw new Error(error);
                    }
                }
            } else {
                throw new Error(error);
            }
        }
    }
    get round() {
        let c = eval("this.#ns.corporation");
        try {
            if (c.getCorporation().public) {
                return 5;
            }
        } catch {
            return 0;
        }
        return c.getInvestmentOffer().round;
    }
    get peeps() {
        let c = eval("this.#ns.corporation");
        let answer = [];
        for (let division of c.getCorporation().divisions) {
            for (let city of division.cities) {
                for (let emp of c.getOffice(division.name, city).employees) {
                    answer = answer.concat([[division.name, city, new Employee(this.ns, division.name, city, emp).name]]);
                }
            }
        }
        return answer;
    }
    get divisions() {
        let c = eval("this.#ns.corporation");
        let answer = {};
        for (let division of c.getCorporation().divisions) {
            answer[division.type] = this.getDiv(division.type);
        }
        return answer;
    }
    get funds() {
        let c = eval("this.#ns.corporation");
        return c.getCorporation().funds;
    }
    getDiv(divisiontype) {
        let c = eval("this.#ns.corporation");
        if (c.getCorporation().divisions.filter(x => x.type == divisiontype).length == 0) {
            if (Object.keys(this.#divisions).includes(divisiontype)) {
                this.#divisions.delete(divisiontype);
            }
            return null;
        }
        if (!Object.keys(this.#divisions).includes(divisiontype)) {
            this.#divisions[divisiontype] = new Division(this.#ns, divisiontype);
        }
        return this.#divisions[divisiontype];
    }
    get Agriculture() {
        return this.getDiv("Agriculture");
    }
    get Chemical() {
        return this.getDiv("Chemical");
    }
    get Computer() {
        return this.getDiv("Computer");
    }
    get Energy() {
        return this.getDiv("Energy");
    }
    get Fishing() {
        return this.getDiv("Fishing");
    }
    get Food() {
        return this.getDiv("Food");
    }
    get Healthcare() {
        return this.getDiv("Healthcare");
    }
    get Mining() {
        return this.getDiv("Mining");
    }
    get Pharmaceutical() {
        return this.getDiv("Pharmaceutical");
    }
    get ['Real Estate']() {
        return this.getDiv("Real Estate");
    }
    get Robotics() {
        return this.getDiv("Robotics");
    }
    get Software() {
        return this.getDiv("Software");
    }
    get Tobacco() {
        return this.getDiv("Tobacco");
    }
    get Utilities() {
        return this.getDiv("Utilities");
    }
    startDivision(industry, full = false) {
        if (c.getCorporation().divisions.filter(x => x.type == industry).length == 0) {
            if (!full) {
                if (c.getExpandIndustryCost(type) < this.funds) {
                    c.expandIndustry(type, name === "COPYTYPE" ? type : name);
                }
            } else {
                if (5 * c.getExpandCityCost() + 5 * c.getPurchaseWarehouseCost() + c.getExpandIndustryCost(type) < this.funds) {
                    c.expandIndustry(type, name === "COPYTYPE" ? type : name);
                    for (let city of CITIES) {
                        c.expandCity(this.name, city);
                        c.purchaseWarehouse(this.name, city);
                    }
                }
            }
        }
    }
}
