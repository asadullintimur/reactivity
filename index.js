import {
    subscribeOnDependencies,

    getDependencyByPrimitive,
    getDependencyByExpression,
    getDependencyByObject
} from "./lib.js";

const counterContainer = document.querySelector('#counterContainer'),
    multipliedCounterContainer = document.querySelector('#multipliedCounterContainer'),
    countersCounter1Container = document.querySelector('#countersCounter1Container'),
    countersCounter2Container = document.querySelector('#countersCounter2Container'),
    countersCounter3Container = document.querySelector('#countersCounter3Container'),
    countersNestedCountersCounter1Container = document.querySelector('#countersNestedCountersCounter1Container'),
    countersNestedCountersCounter2Container = document.querySelector('#countersNestedCountersCounter1Container');

const counter = getDependencyByPrimitive(0),
    multipliedCounter = getDependencyByExpression(() => counter.value * 2),
    counters = getDependencyByObject({
        counter1: 0,
        counter2: 0,
        counter3: 0,
        nestedCounters: {
            counter1: 0,
            counter2: 0
        }
    });

const renderCounter = () => {
        counterContainer.innerHTML = `counter - ${counter.value}`
    },
    renderMultipliedCounter = () => {
        multipliedCounterContainer.innerHTML = `multiplied counter - ${multipliedCounter.value}`
    }, renderCountersCounter1 = () => {
        countersCounter1Container.innerHTML = `counters.counter1 - ${counters.counter1}`
    }, renderCountersCounter2 = () => {
        countersCounter2Container.innerHTML = `counters.counter2 - ${counters.counter2}`
    }, renderCountersCounter3 = () => {
        countersCounter3Container.innerHTML = `counters.counter3 - ${counters.counter3}`
    },
    renderCountersNestedCountersCounter1 = () => {
        countersNestedCountersCounter1Container.innerHTML = `counters.nestedCounters.counter1 - ${counters.nestedCounters.counter1}`
    },
    renderCountersNestedCountersCounter2 = () => {
        countersNestedCountersCounter2Container.innerHTML = `counters.nestedCounters.counter2 - ${counters.nestedCounters.counter2}`
    };


subscribeOnDependencies(renderCounter);
subscribeOnDependencies(renderMultipliedCounter);
subscribeOnDependencies(renderCountersCounter1);
subscribeOnDependencies(renderCountersCounter2);
subscribeOnDependencies(renderCountersCounter3);
subscribeOnDependencies(renderCountersNestedCountersCounter1);
subscribeOnDependencies(renderCountersNestedCountersCounter2);

setInterval(() => {
    counter.value++;

    counters.counter2++;
    counters.counter1++;
    counters.counter3++;

    counters.nestedCounters.counter1++;
    counters.nestedCounters.counter2++;
}, 1000)

