export enum HttpStatusCode {
  ok = 200
}
export type HttpResponse<ResponseType = any> = {
  statusCode: HttpStatusCode
  body?: ResponseType
}
