import { HandlerResponse } from '@netlify/functions';
import { Call, Client, Collection, Ref} from 'faunadb';
import { getFunctionName } from '.';
import { Responder, responder } from './responder';
import safeAwait from './safeAwait';
const { FAUNADB: secret } = process.env

type UtilityInput = {
  segements: string[],
  verbose: string| boolean,
  collection: string
}

export const getOne = async (
  { segements, verbose, collection}: UtilityInput
): Promise<Responder> => {
  const [id] = segements;

  /** Establish Fauna Client - If it cannot be established throw 500 error */
  const client = new Client({ secret })
  if (!client) responder(
    500,
    'Server Error: No FaunaDB Authentication Provided.'
  )

  const [error, data] = await safeAwait(
    client.query(
      Call(
        getFunctionName(collection),
        Ref(Collection(collection.toLowerCase()), id),
        verbose,
        ""
      )
    )
  )

  if (error) responder(
    500,
    'Server Error:' + error
  )

  return responder(
    200, 
    { results: data }
  )
}