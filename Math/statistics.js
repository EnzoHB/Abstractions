const CTM = {
    mode: (array) => {

        const [copy, unique] = array.reduce(([copy, unique], element) => {

            if (!unique.includes(element)) (unique.push(element), copy.push(0));

            copy[unique.indexOf(element)] +=1;
            return [copy, unique];

        }, [[], []]);

        const max = Math.max(...copy);
        const min = Math.min(...copy);
        const result = copy.reduce((a, b, c) => (b == max && b != min? a.push(unique[c]) : 0, a), []);

        return { result, max: copy.every(a => a == max)? 0 : max};

    },
    mean: (array) => array.reduce((a, b) => a + b) / array.length,
    median: (array) => {
        array.sort((a, b) => a - b)

        const length = array.length;
        const half = length / 2;
        const result = 

            length % 2 == 0?
             CTM.mean([array[half - 1], array[half]]) :
             array[half - 1 / 2]
        
        return result;
    }
};

console.log(CTM.mode([1, 1, 2, 34, 5, 4, 3, 2]))

//export { CTM }