export const AddWeatherData = [
    {
        key: 'TestLocation1',
        temperature: '20',
        skyState: '0',
        humidity: '',
        pressure: ''
    },
    {
        key: 'TestLocation2',
        temperature: '20',
        skyState: '0',
        humidity: '50',
        pressure: ''
    },
    {
        key: 'TestLocation3',
        temperature: '20',
        skyState: '0',
        humidity: '50',
        pressure: '900'
    }
];

export const WrongWeatherData = [
    {
        key: 'TestLocation',
        temperature: 'abc',
        skyState: '0',
        humidity: '',
        pressure: '',
        result: 'Invalid temperature'
    },
    {
        key: 'TestLocation',
        temperature: '20',
        skyState: '1',
        humidity: 'abc',
        pressure: '',
        result: 'Invalid humidity. A valid humidity is between 0 and 100'
    },
    {
        key: 'TestLocation',
        temperature: '10',
        skyState: '0',
        humidity: '101',
        pressure: '',
        result: 'Invalid humidity. A valid humidity is between 0 and 100'
    },
    {
        key: 'TestLocation',
        temperature: '10',
        skyState: '0',
        humidity: '-1',
        pressure: '',
        result: 'Invalid humidity. A valid humidity is between 0 and 100'
    },
    {
        key: 'TestLocation',
        temperature: '10',
        skyState: '0',
        humidity: '50',
        pressure: 'abc',
        result: 'Invalid pressure. A valid pressure is between 800 and 1100'
    },
    {
        key: 'TestLocation',
        temperature: '10',
        skyState: '0',
        humidity: '50',
        pressure: '799',
        result: 'Invalid pressure. A valid pressure is between 800 and 1100'
    },
    {
        key: 'TestLocation',
        temperature: '10',
        skyState: '0',
        humidity: '50',
        pressure: '1101',
        result: 'Invalid pressure. A valid pressure is between 800 and 1100'
    },
    {
        key: 'TestLocation',
        temperature: '10',
        skyState: 'edf',
        humidity: '',
        pressure: '',
        result: 'Invalid sky state'
    },
    {
        key: 'TestLocation',
        temperature: '10',
        skyState: '-1',
        humidity: '',
        pressure: '',
        result: 'Invalid sky state'
    },
    {
        key: 'TestLocation',
        temperature: '10',
        skyState: '5',
        humidity: '',
        pressure: '',
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

export const ShowData = [
    {
        type: '0',
        location: 'TestLocation',
        from: '2020-01-01T09:00:00',
        to: 'abc',
        message: 'Please enter a valid "to" date',
        hasAttachment: false
    },
    {
        type: '0',
        location: 'TestLocation',
        from: 'abc',
        to: '2020-01-01T09:00:00',
        message: 'Please enter a valid "from" date',
        hasAttachment: false
    },
    {
        type: '-1',
        location: 'TestLocation',
        from: '',
        to: '',
        message: 'Please enter a valid type',
        hasAttachment: false
    },
    {
        type: 'abc',
        location: 'TestLocation',
        from: '',
        to: '',
        message: 'Please enter a valid type',
        hasAttachment: false
    },
    {
        type: '3',
        location: 'TestLocation',
        from: '',
        to: '',
        message: 'Please enter a valid type',
        hasAttachment: false
    },
    {
        type: '0',
        location: 'abc',
        from: '2020-01-01T09:00:00',
        to: '',
        message: 'No data',
        hasAttachment: false
    },
    {
        type: '0',
        location: 'abc',
        from: '2020-01-01T09:00:00',
        to: '2020-01-01T10:00:00',
        message: 'Please enter a valid "to" date. "to" date must be greater than "from" date',
        hasAttachment: false
    },
    {
        type: '0',
        location: 'TestLocation',
        from: '2020-01-01T09:00:00',
        to: '',
        message: '',
        hasAttachment: true
    },
    {
        type: '0',
        location: 'TestLocation',
        from: '2020-01-01T09:00:00',
        to: '',
        message: '',
        hasAttachment: true
    }
]