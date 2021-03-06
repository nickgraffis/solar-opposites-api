import axios from 'axios';
const { SOLAROPPOSITESKEY } = process.env
const { post } = axios
type UtilityInput = {
  request_time: number,
  response_time: number,
  response: any,
  query: { [key: string]: string },
  method: 'GET',
  url: string,
  result: 'SERVER ERROR' | 'USER ERROR' | 'SUCCESS' ,
  userAgent: string,
}

export const logResponse = async ({ 
  request_time, 
  response_time, 
  response, 
  query, 
  method,
  url,
  result,
  userAgent 
}: UtilityInput): Promise<any> => {
  return post(
    'https://solaroppositesapi.netlify.app/metrics/log', 
    {
      key: SOLAROPPOSITESKEY,
      request_time,
      response_time,
      response_size: new TextEncoder().encode(JSON.stringify(response)).length / 1024,
      query,
      method,
      url,
      result,
      userAgent
    }
  )
  .then(res => console.log(res))
  .catch(err => console.log(err))
}