import { RemoteLoadMaster } from './remote-load-master'
import { HttpGetClientSpy } from '@/data/test'

describe('RemoteLoadMaster', () => {
  test('Should call HttpGetClient twice with correct urls', async () => {
    const url1 = '/people/1'
    const url2 = '/people/4'
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadMaster(httpGetClientSpy)
    await sut.load()
    expect(httpGetClientSpy.url).toEqual([url1, url2])
    expect(httpGetClientSpy.url[0]).toBe(url1)
    expect(httpGetClientSpy.url[1]).toBe(url2)
  })
})
