import { MathAbstractions } from './math-abstractions.js'
import { ArrayAbstractions } from '../Array/array-abstractions.js'

MathAbstractions(Math);
ArrayAbstractions(Array);

const Fraction = {

    add: (...fractions) => Fraction._addSubtract(0, fractions),
    subtract: (...fractions) => Fraction._addSubtract(1, fractions),
    multiply: (...fractions) => Fraction._multiplyDivide(0, fractions),
    divide: (...fractions) => Fraction._multiplyDivide(1, fractions),

    _addSubtract: (type, fractions) => {

        const denominator = Math.lcm(fractions.map(fraction => fraction[1]));
        const numerator = fractions.map(fraction => denominator / fraction[1] * fraction[0]).reduce((a, b) => type == 0? a + b : a - b);
        const mdc = Math.gcd([denominator, numerator]);

        return [numerator, denominator].map(a => !Number.isNaN(mdc)? a / mdc : a);
    },

    _multiplyDivide: (type, fractions) => {

        if (type == 1) {
            fractions = fractions.map((a, index) => {
                if (index == 0) return a;
                return [a[1], a[0]];
            });
        };

        const numerator = fractions.map(fraction => fraction[0]).reduce((a, b) => a * b);
        const denominator = fractions.map(fraction => fraction[1]).reduce((a, b) => a * b);
        const mdc = Math.gcd([numerator, denominator]);

        return [numerator, denominator].map(a => !Number.isNaN(mdc)? a / mdc : a);
    },

    calculate: (...operations) => {

        if (operations.length == 1) return operations[0];

        const details = find();
        const before = operations[details.index - 1]; 
        const after = operations[details.index + 1];
        let result;

            if (details.type === '*') result = Fraction.multiply(before, after);
            if (details.type === '/') result = Fraction.divide(before, after);;
            if (details.type === '+') result = Fraction.add(before, after);;
            if (details.type === '-') result = Fraction.subtract(before, after);;

            operations.splice(details.index - 1, 3, result);
                return calculate(operations);
    
        function find() {

            const precedence = operations.some(element => /^[*\/]$/.exec(String(element)))
            const regX = precedence? /^[*\/]$/ : /^[+\-]$/;
            
                return operations.reduce((a, b, c) => { 
                    if (regX.test(b) && a.length == 0) {

                        const information = {
                            index: Number(c),
                            type: b,
                        };

                        a.push(information);
                    };

                    return a;
                }, [])[0];
        };
    },

    simplify: (array) => {
        const gcd = Math.gcd(array);
        return array.map(a => a / gcd)
    },

    convert: (array) => {
        return array[0] / array[1];
    },

    sort: (array) => {
        const mmc = Math.lcm(array.map(a => a[1]))

        array.sort((a, b) => {
            const isso = mmc / a[1] * a[0];
            const esse = mmc / b[1] * b[0];

            return isso > esse? -1 : isso == esse? 0 : 1; 
        })

        return array;
    },

    gcd: (array) => {

        if (array.length == 1) return array[0];
        if (array.some(a => a[0] == 0 || a[1] == 0)) return NaN;

        Fraction.sort(array);
        let required = array.slice(0, 2);
        let rest = array.slice(2);
        let result;

        for (;;) {
            Fraction.sort(required);
            required[2] = Fraction.subtract(...required);

            if (Fraction.convert(required[2]) == 0) {
                result = required[1];
                break;
            }

            const max = Fraction.max(...required);
            const index = required.reduce((a, b, c) => b.deepEqual(max)? c : a, 0)

            required = required.cutOff(index);
        };

        return Fraction.gcd([result, ...rest])
    },

    lcm: (array) => {
        if (array.some(a => a[0] == 0 || a[1] == 0)) return NaN;

        const numerator = array.reduce((a, b) => Fraction.multiply(a, b));
        const denominator = Fraction.gcd(array);

        const fraction = Fraction.divide(numerator, denominator);
        const gcd = Math.gcd(fraction);

            return fraction.map(a => a / gcd)
    },

    equivalent: () => {

    },

    min: (...array) => Fraction._compare(0, array),
    max: (...array) => Fraction._compare(1, array),

    _compare: (type, array) => {

        const lcm = Math.lcm(array.map(a => a[1]));
        const mapped = array.map(a => lcm / a[1] * a[0]);

        const result = type == 0? Math.min(...mapped) : Math.max(...mapped);
        const index = mapped.indexOf(result);

        return array[index];
    },
};


console.log(Fraction.lcm([[3, 1], [0, 1]]));
export { Fraction }
