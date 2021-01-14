export const Settings = {
    prefix: "."
}

export const COMMANDS = {
    ADDMEASUREMENTPOINT: {
        value: 'addMeasurement',
        params: ['name', 'location']
    },
    GETMEASUREMENTS:{
        value: 'measurements',
        params: []
    },
    LIST:{
        value: 'list',
        params: []
    },
    SENDWEATHERDATA:{
        value: 'send',
        params: ['key', 'temperature', 'skyState']
    },
    SHOWDATA:{
        value: 'show',
        params: ['key', '?from', '?to']
    }
}