import axios from 'axios'

const api = axios.create({
  baseURL: 'jobtrackerbackend-production-7bb7.up.railway.app',
  withCredentials: true,
})

export default api