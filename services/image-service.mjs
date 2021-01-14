import { CanvasRenderService } from 'chartjs-node-canvas';
 

export default {
    async generateChart(data, key){
        const width = 1920; //px
        const height = 1080; //px
        const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => { });
        
        // See https://www.chartjs.org/docs/latest/configuration

        const configuration = {
            type: 'bar',
            data: this.prepareData(data, key),
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
        return image;
    },

    prepareData(data, key){
        return {
            labels: data.map(point => point.timestamp),
            datasets: [{
                label: `Point: ${key}`,
                data: data.map(point => point.temperature),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(100, 100, 100, 0.2)',
                    'rgba(200, 200, 200, 0.2)',
                    'rgba(255, 0, 255, 0.2)',
                    'rgba(128, 128, 0, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(100, 100, 100, 1)',
                    'rgba(200, 200, 200, 1)',
                    'rgba(255, 0, 255, 1)',
                    'rgba(128, 128, 0, 1)'
                ],
                borderWidth: 1
            }]
        };
    }
}