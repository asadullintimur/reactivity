const subscribers = new Map();

let activeEffect;

const addSubscriber = dependency => {
    if (!activeEffect) return;

    const dependencySubscribers = subscribers.get(dependency);

    if (dependencySubscribers) {
        dependencySubscribers.push(activeEffect)
    } else {
    subscribers.set(dependency, [activeEffect])
    }
}

const executeSubscribers = dependency => {
    const dependencySubscribers = subscribers.get(dependency);

    dependencySubscribers.forEach(effect => effect())
}

export const subscribeOnDependencies = func => {
    activeEffect = func;

    func();

    activeEffect = null;
}

export const getDependencyByPrimitive = val => {
    const dependency = {
        get value() {
            addSubscriber(dependency);

            return val;
        },

        set value(newVal) {
            val = newVal;

            executeSubscribers(dependency);
        }
    }

    return dependency;
}