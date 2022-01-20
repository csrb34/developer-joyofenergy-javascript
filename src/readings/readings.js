const readings = (data) => ({
    getReadings: (meterId) => data[meterId] || [],
    setReadings: (meterId, readings) => {
        const currentReadings = data[meterId];
        data[meterId] = [...currentReadings, ...readings];
        return data[meterId];
    },
    getLastWeekReadings: (meterId) => {
        const currentReadings = data[meterId]
        const now = new Date
        const lastWeekTime = now.setDate(now.getDate() - 7)
        return  currentReadings.filter(reading => reading.time >= lastWeekTime)
    },
});

module.exports = { readings };
