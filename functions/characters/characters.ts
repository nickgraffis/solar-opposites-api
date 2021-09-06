import { performance } from 'perf_hooks'
import { Handler } from '@netlify/functions'
import { getOne } from '../utils/getOne';
import { createFilters } from '../utils/createFilters';
import { getMany } from '../utils/getMany';
import { getOriginalRequest } from '../utils';
import { responder } from '../utils/responder';
import { logResponse } from '../utils/logResponse';

const handler: Handler = async (event, context) => {
  let t0: number, t1: number // Declare variables for timing
  const request_time = Date.now()
  t0 = performance.now() // Start timing
  // Only accepts GET requests
  if (event.httpMethod !== 'GET') {
    t1 = performance.now() // End timing, if there is an error
    return responder(
      405,
      "Method Not Allowed!"
    ).addResponseTime(t1 - t0)
  }
  
  // Get the segments of the path after the api and collection
  const segements: string[] = event.path.replace(/\api\/[^/]+/, '')
    .split('/').filter(Boolean); 

  // Get the after and before parameters or undefined
  const { after, before } = event.queryStringParameters
  
  // Get the size parameter or default to 64 as an integer
  const size = parseInt(event.queryStringParameters?.size || '64')
  const verbose = event.queryStringParameters?.verbose ?
    event.queryStringParameters.verbose.toLowerCase() === 'true' : false;

  if (segements.length) {
    t1 = performance.now() // End timing, if we are returning here
    const record = await getOne({ segements, verbose, collection: "characters" })
    return record.addResponseTime(t1 - t0)
  }

  // Curate the queryStringParameters that are avaliable
  const avaliableFilters = ['name', 'species', 'status', 'gender', 'id']
  const cleanQueryStringParameters = {}
  Object.keys(event.queryStringParameters).forEach(param => {
    if (avaliableFilters.includes(param)) 
      cleanQueryStringParameters[param] = event.queryStringParameters[param]
  })

  // Create the filters as Exprs
  const params = createFilters(cleanQueryStringParameters, "characters")
  const response = await getMany({ 
    size, 
    after, 
    before, 
    params, 
    verbose, 
    collection: "characters", 
    request: getOriginalRequest("characters", event.queryStringParameters)
  })

  t1 = performance.now() // End timing
  await logResponse({
    response_time: t1 - t0,
    request_time,
    response: response,
    query: event.queryStringParameters,
    method: event.httpMethod,
    url: event.path,
    result: 'SUCCESS',
    userAgent: event.headers['user-agent'],
  })
  return response.addResponseTime(t1 - t0)
}

module.exports = { handler }