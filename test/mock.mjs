export const AddWeatherData = [
    {
        key: 'TestLocation',
        temperature: '20',
        skyState: '0'
    }
];

export const WrongWeatherData = [
    {
        key: 'TestLocation',
        temperature: 'abc',
        skyState: '0',
        result: 'Invalid temperature'
    },
    {
        key: 'TestLocation',
        temperature: '10',
        skyState: 'edf',
        result: 'Invalid sky state'
    },
    {
        key: 'TestLocation',
        temperature: '10',
        skyState: '-1',
        result: 'Invalid sky state'
    },
    {
        key: 'TestLocation',
        temperature: '10',
        skyState: '5',
        result: 'Invalid sky state'
    }
];

export const MeasurementObjects = [
    {
        location: 'Klagenfurt'
    },
    {
        location: 'Villach'
    }
];