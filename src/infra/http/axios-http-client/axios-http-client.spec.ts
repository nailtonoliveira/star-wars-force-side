import { mockAxios } from '@/infra/test'
import axios from 'axios'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios.get with correct values', async () => {
    const url = 'any_url'
    const { sut, mockedAxios } = makeSut()
    await sut.get(url)
    expect(mockedAxios.get).toHaveBeenCalledWith(url)
  })

  test('Should axios.get returns correct response', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpResponse = await sut.get('any_url')
    const axiosResponse = await mockedAxios.get.mock.results[0].value
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })
})
