<script lang="ts">
import { defineComponent } from 'vue';
import { getConsultores, getPeriodos, consulta } from '@/services/api';
export default defineComponent({
    data() {
        return {
            consultores: [],
            periodos: [],
            parametros: {},
            data: {},
            click: false
        }
    },
    methods: {
        async getConsultores() {
            const resp = await getConsultores();
            this.consultores = resp.data
        },
        async getPeriodos() {
            const resp = await getPeriodos();
            this.periodos = resp.data
        },
        canch() {
            this.click = false
        },
        async consultar() {
            const resp = await consulta(this.parametros);
            this.data = resp.data
            this.click = true
        }
    },
    mounted() {
        this.getConsultores()
        this.getPeriodos()
    },
})
</script>
<template>
    <body>
        <nav class="navbar navbar-expand-md mb-1">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand">Agence</router-link>
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link active">Desempenho</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <main class="container">
            <div class="p-5">
                <form class="row mb-4 mt-2" @submit.prevent="consultar()">
                    <div class="mb-3 col-12 col-sm-4">
                        <label class="form-label">Consultores</label>
                        <VueMultiselect :options="consultores" :multiple="true" :close-on-select="true"
                            placeholder="Seleccione..." label="no_usuario" track-by="no_usuario"
                            v-model="parametros.co_usuario" />
                    </div>
                    <div class="mb-3 col-12 col-sm-4">
                        <label class="form-label">Periodo</label>
                        <VueMultiselect :options="periodos" :multiple="false" :close-on-select="true"
                            placeholder="Seleccione..." label="periodo" track-by="periodo" v-model="parametros.periodo" />
                    </div>
                    <div class="col-12 col-sm-4 mt-4">
                        <button type="submit" class="btn btn-primary" :disabled="!parametros.co_usuario || !parametros.periodo">Consultar</button>
                    </div>
                </form>

                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="relatorio-tab" data-bs-toggle="tab"
                            data-bs-target="#relatorio-tab-pane" type="button" role="tab" aria-controls="relatorio-tab-pane"
                            aria-selected="true">Relatorio</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="grafico-tab" data-bs-toggle="tab" data-bs-target="#grafico-tab-pane"
                            type="button" role="tab" aria-controls="grafico-tab-pane" aria-selected="true">Grafico</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pizza-tab" data-bs-toggle="tab" data-bs-target="#pizza-tab-pane"
                            type="button" role="tab" aria-controls="pizza-tab-pane" aria-selected="true">Pizza</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="relatorio-tab-pane" role="tabpanel"
                        aria-labelledby="relatorio-tab" tabindex="0">
                        <Relatorio v-if="click" :data="data" />
                    </div>
                    <div class="tab-pane fade" id="grafico-tab-pane" role="tabpanel" aria-labelledby="grafico-tab"
                        tabindex="0">
                        <Grafico v-if="click" :data="data" />
                    </div>
                    <div class="tab-pane fade" id="pizza-tab-pane" role="tabpanel" aria-labelledby="pizza-tab" tabindex="0">
                        <Pizza v-if="click" :data="data" />
                    </div>
                </div>
            </div>
        </main>

    </body>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>