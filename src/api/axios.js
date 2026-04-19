import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jobtrackerbackend-production-8fd0.up.railway.app',
  withCredentials: true,
})

export default api