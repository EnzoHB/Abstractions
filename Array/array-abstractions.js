function ArrayAbstractions(constructor) {
    constructor.prototype.pickRandom = function() {
        return this[Math.floor(Math.random() * this.length)]
    }

    constructor.prototype.deepEqual = function(obj) {
        if ( this === obj) return true;

        const keys = Object.keys(this);
        const keys_ = Object.keys(obj);

        if (keys.length !== keys_.length) return false;

        return keys.reduce((acc, key) => {
            const value = this[key];
            const value_ = obj[key];
            let result = value === value_;

            typeof value == 'object'?
             typeof value_ == 'object'? 
              result = value.deepEqual(value_) : 0 : 0;

            return acc && result

        }, true);
    };

    constructor.prototype.cut = function(start, end = start) {
        return this.slice(0, start).concat(this.slice(end + 1));
    };
};

export { ArrayAbstractions };