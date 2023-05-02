import axios from "./axios";

export const getConsultores = async () => await axios.get('/consultores')
export const getPeriodos = async () => await axios.get('/periodos')
export const consulta = async (parametros: any) => await axios.post('/desempenho', parametros)