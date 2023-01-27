// create a new chart
const ctx = document.getElementById('myChart').getContext('2d');

// replace with data from the "Year" field
let xLabels = [];

// replace with data from the "Symptomatic Illnesses (Estimate)" field
let ySymptomatic = [];

// replace with data from the "Hospitalizations (Estimate)" field
let yHospitalizations = [];

// replace with data from the "Deaths (Estimate)" field
let yDeaths = [];

// fetch data from the flask API
fetch('http://127.0.0.1:5000/flu')
    .then(response => response.json())
    .then(data => {
        // loop through data and push the relevant fields to the arrays
        data.forEach(item => {
            xLabels.push(item.Year);
            ySymptomatic.push(item["Symptomatic Illnesses (Estimate)"]);
            yHospitalizations.push(item["Hospitalizations (Estimate)"]);
            yDeaths.push(item["Deaths (Estimate)"]);
        });

        // create the chart
        const stackedBar = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: xLabels,
                datasets: [{
                    label: 'Symptomatic Illnesses (Estimate)',
                    data: ySymptomatic,
                    backgroundColor: 'orange'
                }, {
                    label: 'Hospitalizations (Estimate)',
                    data: yHospitalizations,
                    backgroundColor: 'red'
                }, {
                    label: 'Deaths (Estimate)',
                    data: yDeaths,
                    backgroundColor: 'maroon'
                }]
            },
            options: {
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true
                    }
                },
                legend: {
                    display: true,
                    position: 'right'
                }
            }
        });
    });
