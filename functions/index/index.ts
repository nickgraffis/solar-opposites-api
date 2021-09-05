import { Handler } from '@netlify/functions'
import { getOne } from '../utils/getOne';
import { createFilters } from '../utils/createFilters';
import { getMany } from '../utils/getMany';

const handler: Handler = async (event, context) => {
  const t0 = performance.now()
  /** Only Accepts GET Requests */
  if (event.httpMethod !== 'GET') return {
    statusCode: 405,
    body: 'Method Not Allowed'
  }

  const t1 = performance.now()
  return {
    statusCode: 200,
    body: JSON.stringify({
      stats: {
        'response_time': t1 - t0,
      },
      results: {
        "message": "Welcome to the Solar Opposites API!",
        "documentation": "https://solaroppositesapi.com/documentation",
        "characters": "https://solaroppositesapi.com/api/character",
        "locations": "https://solaroppositesapi.com/api/location",
        "episodes": "https://solaroppositesapi.com/api/episode",
        "devices": "https://solaroppositesapi.com/api/devices",
        "documents": "https://solaroppositesapi.com/api/all",
      }
    })
  }
}

module.exports = { handler }