import { Client, Create, Collection } from 'faunadb';
import UAParser from 'ua-parser-js'
import safeAwait from './safeAwait';
const { FAUNADB: secret } = process.env

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
}: UtilityInput): Promise<void> => {
  const client = new Client({ secret })
  if (!client) return

  const ua = new UAParser(userAgent as string)

  const [error, data] = await safeAwait(
    client.query(
      Create(
        Collection('logs'),
        {
          data: {
            request_time,
            response_time,
            response_size: new TextEncoder().encode(JSON.stringify(response)).length / 1024,
            query,
            browser: ua.getBrowser(),
            os: ua.getOS(),
            device: ua.getDevice(),
            method,
            url,
            result 
          }
        }
      )
    )
  )
}