import { HttpResponse } from '.'

export interface HttpGetClient<ResponseType = any> {
  get: (url: string) => Promise<HttpResponse<ResponseType>>
}
