const { CanvasRenderService } = require('chartjs-node-canvas');
 

module.exports = () => {
    const service = {
        generateChart: generateChart
    };

    return service;


    async function generateChart(data){
        const width = 400; //px
        const height = 400; //px
        const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => { });
        
        // See https://www.chartjs.org/docs/latest/configuration

        data = data || generateTestData();

        const configuration = {
            type: 'bar',
            data
        };
        const image = await canvasRenderService.renderToBuffer(configuration);
        return image;
    }

    function generateTestData(){
        return {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };
    }
}