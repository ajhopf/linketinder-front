import {BarController, BarElement, CategoryScale, Chart, LinearScale, Tooltip} from "chart.js";

import Candidato from "../../model/Candidato";
import {Vaga} from "../../model/Vaga";

Chart.register(
    BarController,
    BarElement,
    LinearScale,
    CategoryScale,
    Tooltip
)

const buildChartComponent = (title: string) => {
    return `
        <div class="d-flex flex-column align-items-center justify-content-center">
            <h1>${title}</h1>
            <div style="width: 800px;">
                <canvas id="acquisitions"></canvas>
            </div>
        </div>
    `
}

const colors = ['rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',]

const colorsHover = ['rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',]

const addChart = async (items: Candidato[] | Vaga[], tooltipLabel: string) => {
    const categorias: {categoria: string, contagem: number}[] = [];

    items.forEach(item => {
        item.competencias.forEach(competencia => {
            const idx = categorias.findIndex(item => item.categoria.toLowerCase() === competencia.competencia.toLowerCase())

            if (idx >= 0) {
                categorias[idx].contagem += 1;
            } else {
                categorias.push({categoria: competencia.competencia, contagem: 1})
            }
        })
    })

    const canvas = <HTMLCanvasElement> document.getElementById('acquisitions')

    new Chart(canvas,
        {
            type: 'bar',
            data: {
                labels: categorias.map(categoria => categoria.categoria),
                datasets: [
                    {
                        label: tooltipLabel,
                        data: categorias.map(categoria => categoria.contagem),
                        backgroundColor: colors,
                        hoverBackgroundColor: colorsHover
                    }
                ],
            },
            options: {
                plugins: {
                    tooltip: {
                        yAlign: 'bottom'
                    }
                }
            }
        }
    );
};

export {buildChartComponent, addChart}