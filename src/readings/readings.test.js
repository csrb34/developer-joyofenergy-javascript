const { meters } = require("../meters/meters");
const { readings } = require("./readings");
const { readingsData } = require("./readings.data");

describe("readings", () => {
    it("should get readings", () => {
        const { getReadings } = readings(readingsData);

        expect(getReadings(meters.METER0).length).toBeGreaterThan(0);
    });

    it("should get readings with meter id", () => {
        const { getReadings } = readings(readingsData);

        expect(getReadings(meters.METER1)[0]).toHaveProperty("time");
        expect(getReadings(meters.METER1)[0]).toHaveProperty("reading");
    });

    it("should get empty array if can't find meter id", () => {
        const { getReadings } = readings(readingsData);

        expect(getReadings("meter-no")).toHaveLength(0);
    });

    it("should set readings with meter id", () => {
        const { getReadings, setReadings } = readings(readingsData);

        const length = getReadings(meters.METER0).length;

        setReadings(meters.METER0, [
            { time: 923874692387, reading: 0.26785 },
            { time: 923874692387, reading: 0.26785 },
            { time: 923874692387, reading: 0.111 },
        ]);

        const newLength = getReadings(meters.METER0).length;

        expect(length + 3).toEqual(newLength);
    });

    it("should get last week readings with meter id", () => {
        const { getLastWeekReadings, setReadings } = readings(readingsData);
        
        // setReadings(meters.METER0, [
        //     { time: 1637762205681, reading: 0.26785 },
        //     { time: 1637854639116, reading: 0.26785 },
        //     { time: 1636207005681, reading: 0.111 },
        // ]);

        const now = new Date
        const d1 = new Date
        const d2 = new Date
        const d3 = new Date
        const d4 = new Date
        const d5 = new Date
        const d6 = new Date

        setReadings(meters.METER0, [
            { time: now.getTime(), reading: 0.26785 },
            {
                time: d1.setDate(now.getDate() - 7),
                reading: 0.26785
            },
            {
                time: d2.setDate(now.getDate() - 2),
                reading: 0.26785
            },
            {
                time: d3.setDate(now.getDate() - 4),
                reading: 0.26785
            },
            {
                time: d4.setDate(now.getDate() - 5),
                reading: 0.26785
            },
            {
                time: d5.setDate(now.getDate() - 6),
                reading: 0.26785
            },
            {
                time: d6.setDate(now.getDate() - 12),
                reading: 0.26785
            },
        ]);

        expect(getLastWeekReadings(meters.METER0)[0]).toHaveProperty("time")
        expect(getLastWeekReadings(meters.METER0)[0].time)
            .toBeGreaterThanOrEqual(1635598605681);
        expect(getLastWeekReadings(meters.METER0)[0]).toHaveProperty("reading");
    });
});
