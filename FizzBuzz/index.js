/*
* OOP style
*/

const MaxNum =100; // max znaczenie iterowanie num

class Tag {
    constructor(_value) {
        this.value = _value;
    }
}

class Printer { 
    constructor(_context) {
        this.context = _context;
    }

    print() {
        console.log(this.context.value); // value mozemy przekazac w Printer(i to nie obowiazkowo bedzie Tag)
    }
}

class DivCondition {   // warunki
    constructor(_divider) {
        this.divider = _divider;
    }

    isThruthy(num) {  // interface (dodaje wkladane strategie )
        return num % this.divider === 0; //  sprawdzamy czy num jest cala liczba
    }
}
// i warunek i strategja maja ta sama metode dla sprawdzania(to pozwala robic skomplikowane strategie i warunki)
class ConditionAndStrategy {
    constructor(_conditionOrStrategies) { // kolekcja warunkow i strategii
        this.conditions = _conditionOrStrategies;
    }

    isThruthy(num) {
        for(let i in this.conditions) {
            if (!this.conditions[i].isThruthy(num)) {
                return false;
            }
            return true;
        }
    }
}


class TagNumRule { // regula czy do liczby mozemy dodac Tag
    constructor(_tag, _strategy) {
        this.strategy = _strategy;
        this.tag = _tag;
    }

    isSuccess(num) {
        return this.strategy.isThruthy(num);
    }
}

class TagNumRulesCollection {
    constructor(_tags) {
        this.tags = _tags;
    }

    find(num, defaultValue) {
        for(let i in this.tags) {
            if (this.tags[i].isSuccess(num)) {
                return this.tags[i].tag;
            }
        }
        return defaultValue;
    }
}

const numTags = new TagNumRulesCollection([
    new TagNumRules(new Tag('FizzBuzz'), new ConditionAndStrategy([new DivCondition(3), new DivCondition(5)])),
    new TagNumRules(new Tag('Fizz'), new ConditionAndStrategy([new DivCondition(3)])),
    new TagNumRules(new Tag('Buzz'), new ConditionAndStrategy([new DivCondition(5)]))
]);

for (let i = 1; i < MaxNum; i++) {
    new Printer(numTags.find(i, new Tag(i))).print(); // tworzymy printer w kotryj przekazujemy Tag
} 

console.log(print);