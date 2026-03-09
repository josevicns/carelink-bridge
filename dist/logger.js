let verbose = false;
export function setVerbose(v) {
    verbose = v;
}
export function log(...args) {
    if (verbose) {
        console.log(new Date(), ...args);
    }
}
//# sourceMappingURL=logger.js.map