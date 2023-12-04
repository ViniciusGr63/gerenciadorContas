let myChart; // Agora `myChart` é uma variável global para armazenar o objeto Chart

function gerarGrafico() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const chartType = document.getElementById('chartType').value;
    const beginAtZero = document.getElementById('beginAtZero').checked;
    const smoothCurve = document.getElementById('smoothCurve').checked;
    const stackable = document.getElementById('stackable').checked;
    const fillArea = document.getElementById('fillArea').checked;

    Papa.parse(file, {
        complete: function (result) {
            const ctx = document.getElementById('myChart');

            // Destrói o gráfico anterior se existir
            if (myChart) {
                myChart.destroy();
            }

            // Configurações específicas para cada tipo de gráfico
            const chartOptions = {
                bar: {
                    type: 'bar',
                    data: {
                        labels: result.data.map(row => row[0]),
                        datasets: [{
                            label: '# of Votes',
                            data: result.data.map(row => row[1]),
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: beginAtZero
                            }
                        }
                    }
                },
                line: {
                    type: 'line',
                    data: {
                        labels: result.data.map(row => row[0]),
                        datasets: [{
                            label: '# of Votes',
                            data: result.data.map(row => row[1]),
                            borderWidth: 1,
                            tension: smoothCurve ? 0.4 : 0 // Suaviza a curva se a opção estiver marcada
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: beginAtZero
                            }
                        }
                    }
                },
                pie: {
                    type: 'pie',
                    data: {
                        labels: result.data.map(row => row[0]),
                        datasets: [{
                            data: result.data.map(row => row[1]),
                            borderWidth: 1
                        }]
                    },
                    options: {} // Pie chart não precisa de escalas, então deixamos vazio
                }
            };

            // Adiciona opções de personalização com base no tipo escolhido
            if (stackable && chartType !== 'pie') {
                chartOptions[chartType].options.scales = {
                    y: {
                        stacked: true
                    }
                };
            }

            if (fillArea && chartType === 'line') {
                chartOptions[chartType].data.datasets[0].backgroundColor = 'rgba(75,192,192,0.2)';
            }

            // Criação do gráfico com base no tipo escolhido
            myChart = new Chart(ctx, chartOptions[chartType]);
        }
    });
}

 function exibirPreview() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        Papa.parse(file, {
            preview: 5, // Exibir as primeiras 5 linhas como prévia
            complete: function (result) {
                const dataPreviewDiv = document.getElementById('dataPreview');
                dataPreviewDiv.innerHTML = '';

                if (result.data.length > 0) {
                    const table = document.createElement('table');
                    table.border = '1';

                    // Cria cabeçalho da tabela
                    const headerRow = table.insertRow();
                    result.data[0].forEach(header => {
                        const th = document.createElement('th');
                        th.textContent = header;
                        headerRow.appendChild(th);
                    });

                    // Preenche a tabela com os dados
                    for (let i = 1; i < result.data.length; i++) {
                        const row = table.insertRow();
                        result.data[i].forEach(cellData => {
                            const cell = row.insertCell();
                            cell.textContent = cellData;
                        });
                    }

                    dataPreviewDiv.appendChild(table);
                } else {
                    dataPreviewDiv.textContent = 'Não foi possível visualizar os dados.';
                }
            }
        });
    }
}

function salvarComoPNG() {
    const ctx = document.getElementById('myChart');
    const dataURL = ctx.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'grafico.png';
    link.click();
}

function salvarComoJPG() {
    const ctx = document.getElementById('myChart');
    const dataURL = ctx.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'grafico.jpg';
    link.click();
}