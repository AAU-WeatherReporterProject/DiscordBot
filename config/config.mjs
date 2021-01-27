export const Settings = {
    prefix: "."
};

export const SKYSTATES = [
    'Sunny',
    'Windy',
    'Cloudy',
    'Rain',
    'Clear'
];

export const COMMANDS = {
    ADDMEASUREMENTPOINT: {
        value: 'addMeasurement',
        params: ['location']
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
        params: ['location', 'temperature', 'skyState:[0: Sunny, 1: Windy, 2: Cloudy, 3: Rain, 4: Clear]']
    },
    SHOWDATA:{
        value: 'show',
        params: ['location', '?from', '?to']
    }
};