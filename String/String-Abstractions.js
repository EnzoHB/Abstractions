// ---------------------- Dependencies -------------------------- //

import { Fraction as Frac } from '../Math/fractions.js'

const Fraction = Frac;

// ---------------------- Code ---------------------------------- //

function StringAbstractions(constructor) {

// It converts Roman Numbers to Decimal ones by matching the index
// of the table with the number it corresponds.
// For example: XVI - 
//  It maches 'VI' - Index 6
//  It matches 'X' - Index 1
//  It matches '' - Index 0
//  It matches '' - Index 0
//  Number('0' + '0' + '1' + '6') == 16 

    constructor.prototype.toDecimal = function() {

        const units = ["","I","II","III","IV","V","VI","VII","VIII","IX"];
        const dozens = ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"];
        const hundreds = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"];
        const thousands = ["","M","MM","MMM"];

        const inverted = this.invert();
        const tableArray = [units, dozens, hundreds, thousands];

        const string = tableArray.reduce((acc, column) => {

            const number = 
            column.reduceRight((acc, roman, index) => {
                if (acc != -1) return acc;

                const match = new RegExp(roman.invert(), 'i');
                const found = match.test(inverted)

                return found? index : acc;

            }, -1)

            return (acc.unshift(number), acc);
        }, []);

        return Number(string.join(''));
    };

// 

    constructor.prototype.toFraction = function() {

        let string = this;
        const matchRepeating = /\.\.\./;
        const matchDecimal = /\d+\.\d+/;

        const type = matchRepeating.test(string);
        const decimal = matchDecimal.test(string);

        if (!type) {

            !decimal? string += '.0' : false;

            const [_, decimals] = string.split('.');
            const expoent = Number(decimals)? decimals.length : 0;  

            const denominator = 10 ** expoent;
            const numerator = string ** denominator;

            return Fraction.simplify([numerator, denominator]);

        };

        if (type) {

            string = string.replace('...', '');

            const [_, decimals] = string.split('.');
            const info = identify(decimals);

            const essencial = string.replace(info.part, '')
            const essencial_= essencial + info.digits;

            const expo = 10 ** essencial.split('.')[1].length;
            const expo_= 10 ** essencial_.split('.')[1].length;
            
            const denominator = expo_ - expo;
            const numerator = essencial_ * expo_ - essencial * expo;

            return Fraction.simplify([numerator, denominator])
        };

        function identify(decimals) {

            const length = decimals.length;
            decimals = decimals.invert(); 

            let result;

            for (let t = 0; t < length; t++) {

                const slice = decimals.slice(0, t + 1)
                const length = slice.length;
                const slice_= decimals.slice(length, length + t + 1)

                if (slice == slice_) {

                    result = slice.invert();
                    break
                };
            };

            const part = [];
            const digits = result || decimals[0];
            const splitted = decimals.splitBy(digits.length);

            let ongoing = true;

            splitted.forEach(a => {

                digits == a && ongoing?
                 part.unshift(a.invert()) :
                 ongoing = false;

            });

            return {
                part: part.join(''),
                digits
            };
        };
    };

// A abstraction that inverts a string. I don't know why JavaScript 
// does not have one like that.

    constructor.prototype.invert = function() {
        return this.split('').reverse().join('')
    };

// Abstraction that takes a string as input, divides it into pieces
// and then returns an array. For example : "Foo Bar" - 
// ['Fo', 'o ', 'Ba', 'r'] 

    constructor.prototype.splitBy = function(step = 1) {
        const result = [];
        const length = this.length - 1

        let tracker = '';
        for (let i = 0; i <= length; i++) {

            tracker += this[i]
            const length_ = tracker.length

            if (length_ % step == 0 && length_ != 0 || i == length) {
                result.push(tracker);
                tracker = ''
            };
        };

        return result;
    };
};

export { StringAbstractions }
