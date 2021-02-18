import { CanvasRenderService } from 'chartjs-node-canvas';
import { SKYSTATES } from '../config/config.mjs';
const colors = [
    {
        value: [246, 210, 90],
        text: 'yellow'
    },
    {
        value: [188,107,80],
        text: 'brown'
    },
    {
        value: [255,255,255],
        text: 'white'
    },
    {
        value: [171,136,215],
        text: 'purple'
    },
    {
        value: [102,167,238],
        text: 'blue'
    }
];
const chartLegend = generateChartLegend();
const Types = [
    //temp
    {
        label: 'Temperature (in C°)',
        min: -60,
        max: 100,
        type: 'bar'
    },
    //hum
    {
        label: 'Percent (%)',
        min: 0,
        max: 100,
        type: 'line'
    },
    //pres
    {
        label: 'Hektopascal (hPa)',
        min: 800,
        max: 1100,
        type: 'line'
    }

]

export default {
    async generateChart(data, type){
        data = data.reverse();
        type = +type;
        const width = 1920; //px
        const height = 1080; //px
        const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => {
         });
        // See https://www.chartjs.org/docs/latest/configuration

        const configuration = {
            type: Types[type].type,
            data: this.prepareData(data, type),
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: Types[type].label,
                                fontSize: 30,
                                fontWeight: 'bold'
                            },
                            ticks: {
                                fontSize: 30,
                                suggestedMin: Types[type].min,
                                suggestedMax: Types[type].max
                            }
                        }
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Timestamp',
                                fontSize: 30,
                                fontWeight: 'bold'
                            },
                            ticks: {
                                fontSize: 20
                            }
                        }
                    ],
                }
            }
        };
        const image = await canvasRenderService.renderToBuffer(configuration);
        const message = type === 0 ? chartLegend : '';
        return {image, message};
    },

    prepareData(data, type){
        let backgroundColor, borderColor, fillColor, strokeColor, key;
        switch(type){
            case 0:
                backgroundColor = data.map(point =>{
                    const c = colors[point.skyState].value;
                    return `rgba(${c[0]}, ${c[1]},${c[2]},0.2)`;
                });
                borderColor = data.map(point =>{
                    const c = colors[point.skyState].value;
                    return `rgba(${c[0]}, ${c[1]},${c[2]},1)`;
                });
                key = 'temperature';
                break;
            
            case 1:
                key = 'humidity';
                backgroundColor = data.map(()=>'rgba(220,220,220,0.5)');
                borderColor = data.map(()=>'rgba(220,220,220,1)');
                break;
            case 2:
                key = 'pressure';
                backgroundColor = data.map(()=>'rgba(220,220,220,0.5)');
                borderColor = data.map(()=>'rgba(220,220,220,1)');
                break;
        }
        const chartData = {
            labels: data.map(point => point.timestamp),
            datasets: [
                {
                    data: data.map(point => point[key]),
                    backgroundColor,
                    borderColor,
                    fillColor,
                    strokeColor,
                    borderWidth: 1
                }
            ]
        };

        return chartData;
    }
}

function generateChartLegend(){
    let legend = '**Legend:**';
    for(let i = 0; i < SKYSTATES.length; ++i){
        legend += `\n${SKYSTATES[i]}: :${colors[i].text}_circle:`
    }
    return legend;
}