<script lang="ts">
import { defineComponent } from 'vue';
import { Pie } from 'vue-chartjs'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

export default defineComponent({
    props: ['data'],
    components: { Pie },
    data(props) {
        let label = []
        let datos = []
        let totalReceita = 0
        for (const [index, data] of props.data.entries()) {
            for (const dato of data) {
                totalReceita += parseFloat(dato.receita_liquida)
            }
        }
        for (const [index, data] of props.data.entries()) {
            let receita = 0
            label.push(data[0].no_usuario)
            for (const dato of data) {
                receita += parseFloat(dato.receita_liquida)
            }
            datos.push(((receita/totalReceita)*100).toFixed(2))
        }
        return {
            chartData: {
                labels: label,
                datasets: [
                    {
                        backgroundColor: ["IndianRed", "Pink", "LightSalmon", "Gold", "Lavender", "GreenYellow"],
                        data: datos
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    }
})
</script>
<template>
    <div class="container p-sm-5">
        <Pie :data="chartData" :options="options" />
    </div>
</template>