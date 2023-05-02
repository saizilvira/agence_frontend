<script lang="ts">
import { defineComponent } from 'vue';
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale,
    PointElement,
    LineElement,)

export default defineComponent({
    props: ['data'],
    components: { Bar },
    data(props) {
        let label = []
        let datos = []
        let medio = []
        let custo_fixo_medio = 0
        for (const [index, data] of props.data.entries()) {
            let receita = 0
            label.push(data[0].no_usuario)
            for (const dato of data) {
                receita += parseFloat(dato.receita_liquida)

            }
            custo_fixo_medio = (custo_fixo_medio + parseInt(data[0].custo_fixo))
            datos.push(receita)
            medio.push(custo_fixo_medio)
        }
        return {
            chartData: {
                labels: label,
                datasets: [
                    {
                        type: 'line',
                        label: 'Custo Fixo Medio',
                        data: medio,
                    },
                    {
                        type: 'bar',
                        backgroundColor: ["IndianRed", "Pink", "LightSalmon", "Gold", "Lavender", "GreenYellow"],
                        label: 'Receita Líquida',
                        data: datos,
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        formatCurrency(value: any) {
            const formatter = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
            return formatter.format(value)
        },
    }
})
</script>
<template>
    <div class="container p-sm-5">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>