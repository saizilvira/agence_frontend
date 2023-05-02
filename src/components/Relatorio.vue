<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ['data'],
    methods: {
        totalReceitaLiquida(consultor: any){
            let total = 0
            consultor.forEach((element: any) => {
                total += parseFloat(element.receita_liquida)
                
            });
            return this.formatCurrency(total)
        },
        totalComissao(consultor: any){
            let total = 0
            consultor.forEach((element: any) => {
                total += parseFloat(element.comissao)
                
            });
            return this.formatCurrency(total)
        },
        totalLucro(consultor: any){
            let total = 0
            consultor.forEach((element: any) => {
                total += parseFloat(element.lucro)
                
            });
            return this.formatCurrency(total)
        },
        formatCurrency(value: any) {
            const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
            });
            return formatter.format(value)
        }
    }
})
</script>
<template>
    <div v-for="(consultor, index) in data" :key="index" class="table-responsive mt-4">
        <h5>{{ consultor[0].no_usuario }}</h5>
        <table class="table table-sm table-bordered">
            <thead>
                <tr>
                    <th scope="col">Período</th>
                    <th scope="col">Receita Líquida</th>
                    <th scope="col">Custo Fixo</th>
                    <th scope="col">Comissão</th>
                    <th scope="col">Lucro</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in consultor" :key="index">
                    <td>{{ data.periodo }}</td>
                    <td class="text-end">{{ formatCurrency(data.receita_liquida) }}</td>
                    <td class="text-end">{{ formatCurrency(data.custo_fixo) }}</td>
                    <td class="text-end">{{ formatCurrency(data.comissao) }}</td>
                    <td class="text-end">{{ formatCurrency(data.lucro) }}</td>
                </tr>
            </tbody>
            <tfoot class="table-light">
                <th scope="row">SALDO</th>
                <td class="text-end">{{ totalReceitaLiquida(data[index]) }}</td>
                <td class="text-end">{{ formatCurrency(consultor[0].custo_fixo) }}</td>
                <td class="text-end">{{ totalComissao(data[index]) }}</td>
                <td class="text-end">{{ totalLucro(data[index]) }}</td>
            </tfoot>
        </table>
        <hr class="mt-5">
    </div>
</template>