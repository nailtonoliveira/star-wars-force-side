import { RemoteLoadMaster } from './remote-load-master'
import { HttpGetClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteLoadMaster
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadMaster.Model>
}

const makeSut = (): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadMaster.Model>()
  const sut = new RemoteLoadMaster(httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadMaster', () => {
  test('Should call HttpGetClient twice with correct urls', async () => {
    const url1 = '/people/1'
    const url2 = '/people/4'
    const { sut, httpGetClientSpy } = makeSut()
    await sut.load()
    expect(httpGetClientSpy.url).toEqual([url1, url2])
    expect(httpGetClientSpy.url).toContain(url1)
    expect(httpGetClientSpy.url).toContain(url2)
  })

  test('Should throws UnexpectedError if HttpGetClient return any error', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: 500
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
