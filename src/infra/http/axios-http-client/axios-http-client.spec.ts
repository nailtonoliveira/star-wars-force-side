import { mockAxios } from '@/infra/test'
import { AxiosHttpClient } from './axios-http-client'

describe('AxiosHttpClient', () => {
  test('Should call axios.get with correct values', async () => {
    const url = 'any_url'
    const mockedAxios = mockAxios()
    const sut = new AxiosHttpClient()
    await sut.get(url)
    expect(mockedAxios.get).toHaveBeenCalledWith(url)
  })
})
