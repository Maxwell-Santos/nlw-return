import axios from 'axios'

export const api = axios.create({
  
  //esse import é uma variável ambiente lá do arquivo '.env.local'
  //API_URL é o nome da variável ambiente que eu criei
  baseURL: import.meta.env.VITE_API_URL, //colocar o endereço do backend (para deploy)

  // baseURL: 'http://localhost:3333', //colocar o endereço do backend (podia ser assim)
});