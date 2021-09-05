import { Handler } from '@netlify/functions'
import { getOne } from '../utils/getOne';
import { createFilters } from '../utils/createFilters';
import { getMany } from '../utils/getMany';

const handler: Handler = async (event, context) => {
  /** Only Accepts GET Requests */
  if (event.httpMethod !== 'GET') return {
    statusCode: 405,
    body: 'Method Not Allowed'
  }

  const segements: string[] = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
    .split('/').filter(Boolean);

  const { after, before } = event.queryStringParameters
  const size = parseInt(event.queryStringParameters?.size)
  const verbose = event.queryStringParameters.verbose.toLowerCase() === 'true'

  if (segements.length) return await getOne({ segements, verbose, collection: "locations" })

  /** Curate the queryStringParameters that are avaliable */
  const avaliableFilters = ['name', 'type', 'id', 'character']
  const cleanQueryStringParameters = {}
  Object.keys(event.queryStringParameters).forEach(param => {
    if (avaliableFilters.includes(param)) 
      cleanQueryStringParameters[param] = event.queryStringParameters[param]
  })

  const params = createFilters(cleanQueryStringParameters, "locations")

  return await getMany({ size, after, before, params, verbose, collection: "locations" })
}

module.exports = { handler }