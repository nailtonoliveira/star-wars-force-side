import { RemoteLoadMaster } from './remote-load-master'
import { HttpGetClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { mockLoadMaster } from '@/domain/test/mock-load-master'
import { HttpStatusCode } from '@/data/protocols/http'
import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadMaster
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadMaster.Model>
}

const makeSut = (
  url1 = faker.internet.url(),
  url2 = faker.internet.url()
): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadMaster.Model>()
  const sut = new RemoteLoadMaster(url1, url2, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadMaster', () => {
  test('Should call HttpGetClient twice with correct urls', async () => {
    const url1 = faker.internet.url()
    const url2 = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url1, url2)
    await sut.load()
    expect(httpGetClientSpy.urls).toContain(url1)
    expect(httpGetClientSpy.urls).toContain(url2)
  })

  test('Should throws UnexpectedError if HttpGetClient return any error', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: 500
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should HttpGetClient return a LoadMaster.Model', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    const loadMaster = mockLoadMaster()

    jest.spyOn(httpGetClientSpy, 'get').mockResolvedValue({
      statusCode: HttpStatusCode.ok,
      body: loadMaster
    })

    const httpResponse = await sut.load()
    expect(httpResponse).toEqual(loadMaster)
  })
})
