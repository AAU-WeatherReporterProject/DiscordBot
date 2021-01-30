import "regenerator-runtime/runtime.js";
import { expect } from 'chai';
import MessageService from '../services/message-service.mjs';
import { COMMANDS, Settings } from '../config/config.mjs';
import { AddWeatherData, WrongWeatherData, MeasurementObjects, ShowData } from './mock.mjs';


describe('MessageService', async ()=>{
    // before(()=>{
    // });

    describe('addMeasurementPoint', async ()=>{
        it('Adding measurement points', async ()=>{
            for await (const object of MeasurementObjects){
                const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.ADDMEASUREMENTPOINT.value} ${object.location}`);
                expect(response.message).to.equal('Measurement sent');
            }
            const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.ADDMEASUREMENTPOINT.value} ${MeasurementObjects[0].location}`);
            expect(response.message).to.equal('Error while sending measurementPoint');
        })
    });
    
    describe('sendWeatherData', async ()=>{
        it('wrong values', async ()=>{
            for await(const object of WrongWeatherData){
                const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.SENDWEATHERDATA.value} ${object.key} ${object.temperature} ${object.skyState} ${object.humidity} ${object.pressure}`);
                expect(response.message).to.equal(object.result);
            }
        });
        it('right values', async ()=>{
            for await (const object of AddWeatherData){
                const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.SENDWEATHERDATA.value} ${object.key} ${object.temperature} ${object.skyState} ${object.humidity} ${object.pressure}`);
                expect(response.message).to.equal('Data sent');
            }
        })
    });

    describe('getMeasurements', async ()=>{
        it('get points', async ()=>{
            const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.GETMEASUREMENTS.value}`);
            expect(response.message).to.contain(`**location:** TestLocation`)
        })
    });

    describe('showData', async ()=>{
        it('show: commands', async ()=>{
            for(let data of ShowData){
                const response = await MessageService.handleMessage(`${Settings.prefix}${COMMANDS.SHOWDATA.value} ${data.type} ${data.location} ${data.from} ${data.to}`);
                if(data.hasAttachment){
                    expect(response.attachment).to.not.be.undefined;
                }
                else{
                    expect(response.attachment).to.be.undefined;
                    expect(response.message).to.equal(data.message);
                }
                
            }
        });
    })
})