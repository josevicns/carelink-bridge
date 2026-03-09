import * as logger from '../logger.js';
let lastGuess;
export function guessPumpOffset(data) {
    const pumpTimeAsIfUTC = Date.parse(data.sMedicalDeviceTime);
    const serverTimeUTC = data.currentServerTime;
    const hours = Math.round((pumpTimeAsIfUTC - serverTimeUTC) / (60 * 60 * 1000));
    const offset = (hours >= 0 ? '+' : '-') +
        (Math.abs(hours) < 10 ? '0' : '') +
        Math.abs(hours) +
        '00';
    if (offset !== lastGuess) {
        logger.log('Guessed pump timezone ' + offset +
            ' (pump time: "' + data.sMedicalDeviceTime +
            '"; server time: ' + new Date(data.currentServerTime) + ')');
    }
    lastGuess = offset;
    return offset;
}
export function guessPumpOffsetMilliseconds(data) {
    const pumpTimeAsIfUTC = Date.parse(data.sMedicalDeviceTime);
    const serverTimeUTC = data.currentServerTime;
    const raw = pumpTimeAsIfUTC - serverTimeUTC;
    return Math.round(raw / (60 * 60 * 1000)) * (60 * 60 * 1000);
}
//# sourceMappingURL=pump-offset.js.map