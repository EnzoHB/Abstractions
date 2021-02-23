import { MathAbstractions } from './math-abstractions.js'

MathAbstractions(Math);

const Fraction = {

    add: (...fractions) => Fraction._addSubtract(0, fractions),
    subtract: (...fractions) => Fraction._addSubtract(1, fractions),
    multiply: (...fractions) => Fraction._multiplyDivide(0, fractions),
    divide: (...fractions) => Fraction._multiplyDivide(1, fractions),
    calculate: (...operations) => Fraction._calculate(operations),
    simplify: (array) => Fraction._simplify(array),
    convert: (array) => Fraction._convert(array),

    _addSubtract: (type, fractions) => {

        const denominator = getLCM(fractions.map(fraction => fraction[1]));
        const numerator = fractions.map(fraction => denominator / fraction[1] * fraction[0]).reduce((a, b) => type == 0? a + b : a - b);
        const mdc = getGCD([denominator, numerator]);

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
        const mdc = getGCD([numerator, denominator]);

        return [numerator, denominator].map(a => !Number.isNaN(mdc)? a / mdc : a);
    },

    _calculate: (operations) => {
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

    _simplify: (array) => {
        const gcd = Math.gcd(array);
        return array.map(a => a / gcd)
    },

    _convert: (array) => {
        return array[0] / array[1];
    }
    
};

export { Fraction }
