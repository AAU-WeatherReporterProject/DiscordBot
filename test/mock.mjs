export const AddWeatherData = [
    {
        key: '123456789',
        temperature: '20',
        skyState: '0'
    }
];

export const WrongWeatherData = [
    {
        key: '123456789',
        temperature: 'abc',
        skyState: '0',
        result: 'Invalid temperature'
    },
    {
        key: '123456789',
        temperature: '10',
        skyState: 'edf',
        result: 'Invalid sky state'
    },
    {
        key: '123456789',
        temperature: '10',
        skyState: '-1',
        result: 'Invalid sky state'
    },
    {
        key: '123456789',
        temperature: '10',
        skyState: '5',
        result: 'Invalid sky state'
    },
    {
        key: 'myInvalidKey',
        temperature: '10',
        skyState: '0',
        result: 'Error while sending data'
    }
];

export const MeasurementObjects = [
    {
        name: 'Klagenfurt',
        location: 'something'
    },
    {
        name: 'Villach',
        location: 'something2'
    }
];