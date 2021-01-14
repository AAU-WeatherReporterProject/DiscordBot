import "regenerator-runtime/runtime.js";
import { expect } from 'chai';
import MessageService from '../services/message-service.mjs';
import { COMMANDS, Settings } from '../config/config.mjs';
import { AddWeatherData, WrongWeatherData, MeasurementObjects } from './mock.mjs';


describe('MessageService', async ()=>{
    // before(()=>{
    // });

    describe('addMeasurementPoint', async ()=>{
        it('Adding measurement points', async ()=>{
            for await (const object of MeasurementObjects){
                const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.ADDMEASUREMENTPOINT.value} ${object.name} ${object.location}`);
                // const message = await dataService.addMeasurementPoint([object.name, object.location]);
                expect(response.message).to.equal('Measurement sent');
            }
        })
    });
    
    describe('sendWeatherData', async ()=>{
        it('wrong values', async ()=>{
            for await(const object of WrongWeatherData){
                const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.SENDWEATHERDATA.value} ${object.key} ${object.temperature} ${object.skyState}`);
                expect(response.message).to.equal(object.result);
            }
        });
        it('right values', async ()=>{
            for await (const object of AddWeatherData){
                const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.SENDWEATHERDATA.value} ${object.key} ${object.temperature} ${object.skyState}`);
                // const message = await dataService.sendWeatherData([object.key, object.temperature, object.skyState]);
                expect(response.message).to.equal('Data send');
            }
        })
    });

    describe('getMeasurements', async ()=>{
        it('get points', async ()=>{
            const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.GETMEASUREMENTS.value}`);
            expect(response.message).to.contain(`**name:** TestLocation; **location:** irgendwo; **key:** 123456789`)
        })
    });

    describe('showData', async ()=>{
        it('show: invalid command', async ()=>{
            const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.SHOWDATA.value}`);
            expect(response.attachment).to.be.undefined;
        });
        it('show: invalid key', async ()=>{
            const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.SHOWDATA.value} abcd`);
            expect(response.message).to.equal('No data');
            expect(response.attachment).to.be.undefined;
        });
        it('show: invalid from date', async ()=>{
            const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.SHOWDATA.value} 123456789 abcd`);
            expect(response.message).to.equal('Please enter a valid "from" date');
            expect(response.attachment).to.be.undefined;
        });
        it('show: invalid to date', async ()=>{
            const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.SHOWDATA.value} 123456789 2020-01-01_09:00:00 abcd`);
            expect(response.message).to.equal('Please enter a valid "to" date');
            expect(response.attachment).to.be.undefined;
        });
        it('show: right', async ()=>{
            const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.SHOWDATA.value} 123456789`);
            expect(response.attachment).to.not.be.undefined;
        })
    })
})