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

export default {
    async generateChart(data){
        const width = 1920; //px
        const height = 1080; //px
        const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => {
         });
        // See https://www.chartjs.org/docs/latest/configuration

        const configuration = {
            type: 'bar',
            data: this.prepareData(data),
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Temperature (in C°)',
                                fontSize: 30,
                                fontWeight: 'bold'
                            },
                            ticks: {
                                fontSize: 30
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
        
        return {image, message: chartLegend};
    },

    prepareData(data){
        const chartData = {
            labels: data.map(point => point.timestamp),
            datasets: [
                {
                    data: data.map(point => point.temperature),
                    backgroundColor: data.map(point =>{
                        const c = colors[point.skyState].value;
                        return `rgba(${c[0]}, ${c[1]},${c[2]},0.2)`;
                    }),
                    borderColor: data.map(point =>{
                        const c = colors[point.skyState].value;
                        return `rgba(${c[0]}, ${c[1]},${c[2]},1)`;
                    }),
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