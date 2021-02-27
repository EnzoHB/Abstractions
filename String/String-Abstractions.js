import { Fraction as Frac} from '../Math/fractions.js'

const Fraction = Frac;

function StringAbstractions(constructor) {

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

    constructor.prototype.toFraction = function() {

        let string = this;
        const regX = /\.\.\./;
        const type = 
        
        regX.test(string)?
         'repeating' :
         'decimal';

        const decimal = string.includes(/\./, 'i');

        !decimal?
         string += '.0' :
         0 ;
        
        if (type == 'decimal') {

            const splitted = string.split('.');
            const decimalPart = splitted[1];
            const length = Number(decimalPart)? decimalPart.length : 0;

            const denominator = 10 ** length
            const numerator = Number(string) * denominator;

            return Fraction.simplify([numerator, denominator])
        };

        if (type == 'repeating') {

            const getRid = string.replace('...', ''); 
            const splitted = getRid.split('.')
            const repeatingDigits = identify(splitted[1]);
            const replaced = getRid.replace(repeatingDigits.part, '')

            const splitted_ = replaced.split('.');
            const isso = 10 ** splitted_[1].length;
            const number = Number(replaced * isso)

            const x0 = number;
            const x1 = Number(number + repeatingDigits.digits);
            const isso0 = isso
            const isso1 = 10 ** (splitted_[1] + repeatingDigits.digits).length

            const numerator = [x0, x1].sort((a, b) => b - a).reduce((a, b) => a - b)
            const denominator = [isso0, isso1].sort((a, b) => b - a).reduce((a, b) => a - b);

            return Fraction.simplify([numerator, denominator])

            function identify(decimalPart) {

                const inverted = decimalPart.invert(); 
                const length = decimalPart.length;
                const result = [];

                for (let t = 0; t < length; t++) {

                    const slice = inverted.slice(0, t + 1), length = slice.length;
                    const slice_ = inverted.slice(length, length + t + 1);

                    if (slice == slice_) result.push(slice);
                };

                const repeatingPart = [];
                const repeatingDigit = result[0] || inverted[0];

                const splitted = inverted.splitBy(repeatingDigit.length);
                let done = false;

                splitted.forEach(a => {

                    if (repeatingDigit == a && done == false) {
                        repeatingPart.unshift(a.invert());
                        return;
                    } else {
                        done = true;
                    };
                });

                return {part: repeatingPart.join(''), digits: repeatingDigit.invert()}
            };

        };


        // x = 12.4
        // 10x = 124.0
    };

    constructor.prototype.invert = function() {
        return this.split('').reverse().join('')
    };

    constructor.prototype.includes = function(expression, options) {

        const RegX = new RegExp(expression, options);
        return RegX.test(this)

    };

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

StringAbstractions(String)

/*
console.log('1.4...'.toFraction()); // Correto
console.log('1.356565...'.toFraction()); // correto
console.log('1.4543...'.toFraction()) // correto
console.log('1.4433...'.toFraction())
console.log('1.454456456...'.toFraction());
console.log('1.454456456456...'.toFraction());
*/

console.log('0'.toFraction())

// reduceRight() da esquerda para direita
// Começar assumindo um período de 1
// Testar 1.454456456 - 
   // Pegue o último - O próximo é 5
   // 6 == 6
   // Próximo 
   // 56 - O próximo é 64
   // 56 == 64
   // Próximo
   // 456 - O próximo é 456
   // 456 == 456
   // Pule para  456 encontrado
   // O próximo é 456?
   // Não - O período é 456
   // Sim - 
   // O período que se repete é 456 - O resto é período composto.
   // Break
// Chegou no length / 2 não encontrou nenhum - Pegue o último dígito como período que se repete.


// 144.33 = 100x
// 1443.33 = 1000x 
// 900x = 
