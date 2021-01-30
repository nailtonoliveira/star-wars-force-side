import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { LoadMaster } from '@/domain/usecases'

export class RemoteLoadMaster {
  constructor(
    private readonly httpGetClient: HttpGetClient<RemoteLoadMaster.Model>
  ) {}

  async load(): Promise<void> {
    const httpResponse = await Promise.race([
      this.httpGetClient.get('/people/1'),
      this.httpGetClient.get('/people/4')
    ])
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadMaster {
  export type Model = LoadMaster.Model
}
