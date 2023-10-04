const subscribersMap = new Map();

let activeEffect;

//HELPERS
const checkIsPrimitive = val => typeof val !== 'object' || val === null;

//SUBSCRIBE FUNCTIONALITY
const getDependencies = (key) => {
    let dependencies = subscribersMap.get(key);

    if (!dependencies) {
        dependencies = {};

        subscribersMap.set(key, dependencies)
    }

    return dependencies;
}
const getSubscribersByDependencies = (dependencies, prop) => {
    let subscribers = dependencies[prop];

    if (!subscribers) {
        subscribers = [];

        dependencies[prop] = subscribers;
    }

    return subscribers;
}

const getSubscribers = (key, prop) => {
    const dependencies = getDependencies(key),
        subscribers = getSubscribersByDependencies(dependencies, prop);

    return subscribers;
}

const addSubscriber = (key, prop) => {
    if (!activeEffect) return;

    const subscribers = getSubscribers(key, prop);

    subscribers.push(activeEffect)
}

const executeSubscribers = (key, prop) => {
    const subscribers = getSubscribers(key, prop);

    subscribers.forEach(effect => effect())
}

export const subscribeOnDependencies = func => {
    activeEffect = func;

    func();

    activeEffect = null;
}

//REACTIVE WRAPPERS
export const getDependencyByObject = obj => {
    const nestedDependencies = {};

    return new Proxy(obj, {
        get(target, prop) {
            addSubscriber(target, prop)

            const value = target[prop];

            if (checkIsPrimitive(value)) return value;

            return nestedDependencies[prop] || getDependencyByObject(value);
        },

        set(target, prop, val) {
            target[prop] = val;

            executeSubscribers(target, prop)

            return true;
        }
    })
}

export const getDependencyByPrimitive = val => {
    const reactiveWrapper = {
        get value() {
            addSubscriber(reactiveWrapper, 'value');

            return val;
        },

        set value(newVal) {
            val = newVal;

            executeSubscribers(reactiveWrapper, 'value');
        }
    }

    return reactiveWrapper;
}

export const getDependencyByExpression = expression => {
    return {
        get value() {
            return expression()
        }
    }
}