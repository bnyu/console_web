import { axiosInstance } from 'src/boot/axios'

export function login (data) {
  return axiosInstance({
    url: '/login',
    method: 'post',
    data
  })
}
