// --------------------- Dependecies ----------------------- //

import { MathAbstractions } from './math-abstractions.js'
import { ArrayAbstractions } from '../Array/array-abstractions.js'

MathAbstractions(Math);
ArrayAbstractions(Array);

// ---------------------- Fractions ------------------------ //

const Fraction = {

// ------------------ Simple Operations --------------------- //

    add: (fractions) => Fraction._addSubtract(0, fractions),
    subtract: (fractions) => Fraction._addSubtract(1, fractions),
    multiply: (fractions) => Fraction._multiplyDivide(0, fractions),
    divide: (fractions) => Fraction._multiplyDivide(1, fractions),

// This Method calculates both add and subtract operations.
// In order to do that, you divide the lcm of the denominators by
// the denominator and then multiply the numerator. To add or subtract,
// we sum or subtract all numerators.

    _addSubtract: (type, fractions) => {

        const denominator = Math.lcm(fractions.map(frac => frac[1]));
        const numerator = fractions.map(frac => denominator / frac[1] * frac[0]).reduce((a, b) => type == 0? a + b : a - b);

        return Fraction.simplify([numerator, denominator]);
    },

// This method calculates both multiplication and division.
// The rule is - If it is multiplication, multiply all numerators by themselves
// and all denominatros by themselves. If it is divion, invert all the elements expect the first. 

    _multiplyDivide: (type, fractions) => {

        if (type == 1) {
            fractions = fractions.map((a, index) => {
                if (index == 0) return a;
                return [a[1], a[0]];
            });
        };

        const numerator = fractions.map(frac => frac[0]).reduce((a, b) => a * b);
        const denominator = fractions.map(frac => frac[1]).reduce((a, b) => a * b);

        return Fraction.simplify([numerator, denominator]);
    },

// Abstraction that mixes all others and lets you 
// apply operations with those above easily

    calculate: (...operations) => {

        if (operations.length == 1) return Fraction.simplify(operations[0]);

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

// ------------------- Comparison Functions --------------------- //

    min: (...array) => Fraction._minMax(0, array),
    max: (...array) => Fraction._minMax(1, array),

// This function gets the modified numerators -
// lcm / denominator * numerator - and maps an array.
// It gets the index of highest or lowest number and returns
// that same index of the original array.

    _minMax: (type, array) => {

        const denominators = array.map(a => a[1]);
        const lcm = Math.lcm(denominators);
        const numerators = array.map(a => lcm / a[1] * a[0]);

        const index = numerators.indexOf((
            type == 0?
             Math.min(...numerators) :
             Math.max(...numerators) 
        ))

        return array[index]
    },

// These functions simulate the comparison operators but with fractions. 
// It uses the deep equal abstraction.

    lsThan: (one, two) => one.deepEqual(Fraction.min(one, two)),
    grThan: (one, two) => one.deepEqual(Fraction.max(one, two)),
    equalTo: (one, two) => one.deepEqual(two),

    grThanE: (one, two) => one.deepEqual(two) || one.deepEqual(Fraction.max(one, two)),
    lsThanE: (one, two) => one.deepEqual(two) || one.deepEqual(Fraction.min(one, two)),

// ------------------------- Utilities ---------------------------- //

// This function simplifies a fraction by getting the gcd of both 
// the numerator and denominator and then, dividing them by it.

    simplify: (array) => {
        const gcd = Math.gcd(array);
        return array.map(a => !Number.isNaN(gcd)? a / gcd : a)
    },

// This functions converts the fraction into decimals by dividing its
// numerator by its denominator.

    convert: (array) => {
        return array[0] / array[1];
    },

// This function sorts an array of fractions. It follows the Array.prototype.sort() rule.
// It returns a positive number where A is greater than B, 0 if both are equal and -1 if 
// A is less than B.

    sort: (array) => {
        return array.sort((a, b) => {
            return Fraction.grThan(a, b)? -1 : Fraction.equalTo(a, b)? 0 : 1;
        });
    },

// This function returns a booolean value indicating when two fractions are equivalent.

    equivalent: ([one, two]) => {
        return one[0] * two[1] == one[1] * two[0];
    },

    validate: (array) => {
        return array.some(a => a.some(b => b == 0));
    },

// ------------------------ Complex Operations ------------------------- //

// This funcion validates the array of fractions and then simplify them all
// It gets one part and calculates the GCD. Take them out and put the new result
// It repeats that process until we have the final GCD.

    gcd: (array) => {

        if (Fraction.validate(array)) return NaN;
        const simplified = array.map(a => Fraction.simplify(a));

        for (;;) {
            const part = simplified.slice(0, 2);

                for (;;) {
                    Fraction.sort(part)
                    const result = Fraction.subtract(part);

                    if (!Fraction.convert(result) == 0) {
                        simplified.splice(0, 2, part[1]);
                        break;
                    }; 

                    const index = part.indexOf(Fraction.max(...part));
                     part[index] = result;
                };

            if (simplified.length == 1) return simplified[0]
        };
    },

// By knowing the GCD of two number, you can calculate their LCM. It means
// that with fractions wouldn't be different. 

    lcm: (array) => {
        if (Fraction.validate(array)) return NaN;

        const numerator = Fraction.multiply(array);
        const denominator = Fraction.gcd(array);
        const fraction = Fraction.divide([numerator, denominator]);

        return Fraction.simplify(fraction);
    },
};

export { Fraction }