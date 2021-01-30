import { HttpResponse } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient {
  async get(url: string): Promise<HttpResponse> {
    const axiosResponse = await axios.get(url)
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
