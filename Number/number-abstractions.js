import { MathAbstractions } from '../Math/math-abstractions.js'

MathAbstractions(Math);

function NumberAbstractions(constructor) {

    constructor.prototype.toRoman = function() {
        const n = String(this);

        const units = ["","I","II","III","IV","V","VI","VII","VIII","IX"];
        const dozens = ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"];
        const hundreds = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"];
        const thousands = ["","M","MM","MMM"];
        const converted = [];
        
            converted.unshift(units[n[n.length - 1]]);
            converted.unshift(dozens[n[n.length - 2]]);
            converted.unshift(hundreds[n[n.length - 3]]);
            converted.unshift(thousands[n[n.length - 4]]);
        
            return converted.join("");
    }

    constructor.prototype.isDivisibleBy = function(n) {

        const divisors = Math.divisors([this]);
        return divisors.includes(n);
    }; 
};

export { NumberAbstractions };