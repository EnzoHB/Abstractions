function ObjectAbstractions(constructor) {
    constructor.prototype.makeCopy = function() {

        const isArray = this.length? true : false;
        const object = isArray?
         Object.assign([], this) :
         Object.assign({}, this) ;

        for (const property of Object.keys(object)) {
            const prop = object[property]

            if (typeof prop == 'object') {
                object[property] = prop.makeCopy();
            };
        };

        return object;
    };

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
};

export { ObjectAbstractions }