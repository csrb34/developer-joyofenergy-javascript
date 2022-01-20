const { usage } = require("../usage/usage");

const getLastWeekUsage = (getLastWeekReadings, req) => {
    const meterId = req.params.smartMeterId;
    return { usage: usage(getLastWeekReadings(meterId))}
}

module.exports = { getLastWeekUsage }
