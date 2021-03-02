import { ArrayAbstractions } from '../Array/array-abstractions.js'
ArrayAbstractions(Array);

function MathAbstractions(prototype) {

    prototype.gcd = (array) => {

        const some = () => array.some(a => a % primes[0] == 0); 
        const every = () => array.every(a => a % primes[0] == 0);
        const update = () => array = array.map(a => a % primes[0] == 0? a / primes[0] : a);
        const decimal = () => array.map(a => String(a).split('.')[1] || '').reduce((a, b) => a.length > b.length? a : b).length;

        if (array.some(a => a == 0)) return NaN;

            const commonFactors = [1];
            const primes = [2, 3, 5, 7, 11];
            const expo = 10 ** decimal();

            array = array.map(a => a * expo); 

            for (;;) {
                const someB = some();
                const everyB = every();
                const length = primes.length;

                if (length == 0) break;

                    everyB? commonFactors.push(primes[0]) : false; 
                    someB? update() : primes.shift();
            };

                return commonFactors.reduce((a, b) => a * b) / expo;
    };

    prototype.lcm = (array) => {

        const numerator = array.reduce((a, b) => a * b);
        const denominator = prototype.gcd(array);

            return numerator / denominator;
    };

    prototype.factors = (array) => {

        return array.map(tracker => {

            const primes = [2, 3, 5, 7, 11];
            const factors = [1];
    
            for (;;) {
                if (tracker % primes[0] == 0) {
    
                    factors.push(primes[0]);
                    tracker /= primes[0];
                    continue;
                };
    
                if (!primes.length == 0) {
    
                    primes.shift();
                    continue;
                }
    
                tracker != 1? factors.push(tracker) : false;
                break;
            };
    
            return factors;
        });
    };
    
    prototype.divisors = (array) => {
        return array.map(element => {
            const divisors = [];
    
            for (let c = 1; c <= element; c++) {
                element % c == 0? divisors.push(c) : 0;
            };
    
            return divisors;
        });
    };

    prototype.randomInRange = (range) => {
    
        range.sort((a, b) => a - b);
            const array = [];
            for (let c = range[0]; c <= range[1]; c++) array.push(c);
            return array.pickRandom();
    };

};

export { MathAbstractions };

// Array almostRandom;
// To Fraction