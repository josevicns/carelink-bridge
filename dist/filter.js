export function makeRecencyFilter(timeFn) {
    let lastTime = 0;
    return function (items) {
        const out = [];
        for (const item of items) {
            if (timeFn(item) > lastTime) {
                out.push(item);
            }
        }
        for (const item of out) {
            lastTime = Math.max(lastTime, timeFn(item));
        }
        return out;
    };
}
//# sourceMappingURL=filter.js.map