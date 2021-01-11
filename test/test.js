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
                const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.ADDMEASUREMENTPOINT} ${object.name} ${object.location}`)
                // const message = await dataService.addMeasurementPoint([object.name, object.location]);
                expect(response.message).to.equal('Measurement sent');
            }
        })
    });
    
    describe('sendWeatherData', async ()=>{
        it('wrong values', async ()=>{
            for await(const object of WrongWeatherData){
                const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.SENDWEATHERDATA} ${object.key} ${object.temperature} ${object.skyState}`);
                console.log(response, object.resultMessage)
                expect(response.message).to.equal(object.result);
            }
        });
        it('right values', async ()=>{
            for await (const object of AddWeatherData){
                const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.SENDWEATHERDATA} ${object.key} ${object.temperature} ${object.skyState}`);
                // const message = await dataService.sendWeatherData([object.key, object.temperature, object.skyState]);
                expect(response.message).to.equal('Data send');
            }
        })
    });
})