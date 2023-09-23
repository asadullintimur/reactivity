import { subscribeOnDependencies, getDependencyByPrimitive, getDependencyByExpression } from "./lib.js";

const root = document.querySelector('#root');

let counter = getDependencyByPrimitive(0);

const multipliedCounter = getDependencyByExpression(() => counter.value * 2)

const renderCounter = () => root.innerHTML = `multipliedCounter - ${multipliedCounter.value}`

subscribeOnDependencies(renderCounter);

setInterval(() => {
    counter.value++;
}, 1000)

