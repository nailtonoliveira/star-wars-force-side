import { HttpGetClient } from '@/data/protocols/http'

export class RemoteLoadMaster {
  constructor(private readonly httpGetClient: HttpGetClient) {}

  async load(): Promise<void> {
    await this.httpGetClient.get('/people/1')
    await this.httpGetClient.get('/people/4')
  }
}
