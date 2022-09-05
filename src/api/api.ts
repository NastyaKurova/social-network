import axios from 'axios'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0',
  headers: { 'API-KEY': 'a18c39ba-a525-4dca-8e87-8ced8b6d6d78' },
})
