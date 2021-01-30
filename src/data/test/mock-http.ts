import {
  HttpGetClient,
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http'

export class HttpGetClientSpy<ResponseType>
  implements HttpGetClient<ResponseType> {
  url: string[] = []
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async get(url: string): Promise<HttpResponse<ResponseType>> {
    this.url.push(url)
    return this.response
  }
}
