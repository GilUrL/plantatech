import {configValues} from './hooks/getValues.js';
import {get_alarms} from './data.js';
import {regex,cssRegex} from './hooks/regex.js';
$(document).on('click', '#config-values', function (e) {
  let data = configValues(this);
  get_alarms(data);
});
$(document).on('keyup change', '#config-alarms input', function () {
    let input = $(this);
    let value = input.val().trim();
    let isValid = regex(input.attr('id'), value);
    let allValid = cssRegex(isValid, input, value);
    $('#config_button').prop('disabled', !allValid);
});
Chart.register({
  id: 'doughnut-center-text',
  afterDraw: function (chart) {
    if (chart.config.type === "doughnut") {
      const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;

      ctx.restore();
      const fontSize = (height / 100).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";
      ctx.fillStyle = "green"; 

      const data = chart.config.data.datasets[0].data[0];
      const label = chart.config.data.labels[0];
      const text = data + (label.includes('Temperatura') ? "°C" : "%");

      const textX = Math.round((width - ctx.measureText(text).width) / 2) + left;
      const textY = (top + bottom) / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  }
});

let chartInstances = {};

export const createCharts = (data) => {
  const chartsContainer = document.getElementById('charts-container');
  chartsContainer.innerHTML = '';

  const groupedData = data.reduce((acc, reading) => {
      if (!acc[reading.Identifier]) {
          acc[reading.Identifier] = {
              pot_name: reading.pot_name,
              pot_location: reading.pot_location,
              readings: {} 
          };
      }

      acc[reading.Identifier].readings[reading.sensor_name] = reading.value;
      return acc;
  }, {});

  Object.values(groupedData).forEach((maceta, macetaIndex) => {
      const potName = maceta.pot_name;
      const potIdentifier = Object.keys(groupedData)[macetaIndex]; 

      const chartData = [
          { label: 'Humedad Ambiental', value: maceta.readings['ambient_humidity'], color: '#4A90E2' },
          { label: 'Temperatura Ambiental', value: maceta.readings['ambient_temperature'], color: '#FF6F61' },
          { label: 'Intensidad de Luz', value: maceta.readings['light_intensity'], color: '#FFD700' },
          { label: 'Humedad del Suelo', value: maceta.readings['soil_humidity'], color: '#50C878' }
      ];

      const validData = chartData.filter(item => item.value !== null && !isNaN(item.value));

      if (validData.length === 0) {
          console.warn(`No hay datos válidos para la maceta: ${potIdentifier}`);
          return;
      }

      const macetaSection = document.createElement('div');
      macetaSection.className = 'col-12';
      macetaSection.innerHTML = `<h3 class="mt-4">Maceta: ${potName}</h3>`;

      const row = document.createElement('div');
      row.className = 'row';

      validData.forEach((item, index) => {
        const sensorName = Object.keys(maceta.readings).find(key => {
          const labelMapping = {
            'Humedad Ambiental': 'ambient_humidity',
            'Temperatura Ambiental': 'ambient_temperature',
            'Intensidad de Luz': 'light_intensity',
            'Humedad del Suelo': 'soil_humidity'
          };
          return labelMapping[item.label] === key;
        });
      
        const chartHTML = `
        <div class="col-xl-6 mb-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-4">${item.label} - ${potName}</h4>
                    <div dir="ltr">
                        <div class="mt-3 chartjs-chart" style="height: 320px;">
                            <canvas id="chart-${macetaIndex}-${index}" data-colors="${item.color},#e9ecef"></canvas>
                        </div>
                    </div>
                    <i class="fas fa-cog settings-icon" id="config-values"
                     data-bs-toggle="modal" 
                     data-bs-target="#config-pots"
                     data-pot-identifier="${potIdentifier}"
                     data-value-identifier="${sensorName}"
                     data-maceta-index="${macetaIndex}"
                     data-chart-index="${index}"></i>
                </div>
            </div>
        </div>
        `;
        row.insertAdjacentHTML('beforeend', chartHTML);
      });
      macetaSection.appendChild(row);
      chartsContainer.appendChild(macetaSection);

      validData.forEach((item, index) => {
          const ctx = document.getElementById(`chart-${macetaIndex}-${index}`).getContext('2d');
          const chartInstance = new Chart(ctx, {
              type: "doughnut",
              data: {
                  labels: [item.label, "Restante"],
                  datasets: [
                      {
                          data: [item.value, 100 - item.value],
                          backgroundColor: [item.color, '#e9ecef'],
                          borderColor: "transparent",
                          borderWidth: 3,
                      },
                  ],
              },
              options: {
                  maintainAspectRatio: false,
                  cutout: '60%',
                  plugins: {
                      legend: { display: false },
                      title: {
                          display: true,
                          text: `${item.label} - ${potName}`,
                          font: { size: 18 },
                          color: "#b0ada1",
                      },
                  },
              },
              plugins: [{
                  id: 'doughnut-center-text',
              }],
          });

          if (!chartInstances[potIdentifier]) {
              chartInstances[potIdentifier] = {};
          }
          chartInstances[potIdentifier][item.label] = chartInstance;
      });
  });

};
export const updateCharts = (data) => {

  const groupedData = data.reduce((acc, reading) => {
    if (!acc[reading.Identifier]) {
      acc[reading.Identifier] = {
        pot_name: reading.pot_name,
        pot_location: reading.pot_location,
        readings: {} 
      };
    }

    acc[reading.Identifier].readings[reading.sensor_name] = reading.value;
    return acc;
  }, {});

  Object.entries(groupedData).forEach(([potIdentifier, maceta]) => {

    const chartData = [
      { label: 'Humedad Ambiental', value: maceta.readings['ambient_humidity'] },
      { label: 'Temperatura Ambiental', value: maceta.readings['ambient_temperature'] },
      { label: 'Intensidad de Luz', value: maceta.readings['light_intensity'] },
      { label: 'Humedad del Suelo', value: maceta.readings['soil_humidity'] }
    ];

    chartData.forEach(item => {
      if (chartInstances[potIdentifier] && chartInstances[potIdentifier][item.label]) {
        const chartInstance = chartInstances[potIdentifier][item.label];
        chartInstance.data.datasets[0].data = [item.value, 100 - item.value];
        chartInstance.update(0);
      } else {
      }
    });
  });
};