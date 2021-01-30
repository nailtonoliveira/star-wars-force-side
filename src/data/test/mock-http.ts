import { HttpGetClient } from '@/data/protocols/http'

export class HttpGetClientSpy implements HttpGetClient {
  url: string[] = []
  get(url: string): Promise<void> {
    this.url.push(url)
    return null
  }
}
