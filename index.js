import { subscribeOnDependencies, getDependencyByPrimitive} from "./lib.js";

const root = document.querySelector('#root');

let counter = getDependencyByPrimitive(0);

const renderCounter = () => root.innerHTML = `counter - ${counter.value}`

subscribeOnDependencies(renderCounter);

setInterval(() => {
    counter.value++;
}, 1000)

