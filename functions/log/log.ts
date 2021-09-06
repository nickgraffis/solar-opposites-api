import { Handler } from '@netlify/functions'
import { Client, Collection, Create } from 'faunadb'
import safeAwait from '../utils/safeAwait'
import UAParser from 'ua-parser-js'
const { FAUNADB: secret } = process.env
const { SOLAROPPOSITESKEY } = process.env

const handler: Handler = async (event, context) => {
  /** Establish Fauna Client - If it cannot be established throw 500 error */
  console.log('logs go hihihi')
  const client = new Client({ secret })
  if (!client) return {
    statusCode: 500,
    body: 'Fauna client could not be established'
  }

  if (event.httpMethod !== 'POST') return {
    statusCode: 405,
    body: 'Method not allowed'
  }

  if (!event.body) return {
    statusCode: 400,
    body: 'No body provided'
  }
  console.log('logs go there')
  const ua = new UAParser(JSON.parse(event.body).userAgent as string)

  const { 
    key,
    request_time,
    response_time,
    response_size,
    query,
    method,
    url,
    result 
  } = JSON.parse(event.body)

  console.log(key, SOLAROPPOSITESKEY)

  if (key !== SOLAROPPOSITESKEY) return {
    statusCode: 401,
    body: 'Invalid key'
  }
  console.log('logs go past the key')

  const [error, data] = await safeAwait(
    client.query(
      Create(
        Collection('logs'),
        {
          data: {
            request_time,
            response_time,
            response_size,
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

  console.log('logs stop here')

  if (error) return {
    statusCode: 500,
    body: error.message
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}

module.exports = { handler }