import axios from 'axios'
import { mockAxios, mockHttpResponse } from '@/infra/test'
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

  test('Should axios.get returns correct error ', async () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.get.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const promise = sut.get('any_url')
    expect(promise).toEqual(mockedAxios.get.mock.results[0].value)
  })
})
