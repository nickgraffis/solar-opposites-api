import { HandlerResponse } from "@netlify/functions"
import { Call, Client, Expr, Index, Intersection, Match } from "faunadb"
import { getFormattedData, getPageSize, getProperCollectionName } from "."
import { Responder, responder } from "./responder";
import safeAwait from './safeAwait';
const { FAUNADB: secret } = process.env

type UtilityInput = {
  params: Expr[],
  collection: string,
  request: string,
  size?: number,
  after?: string | number,
  before?: string | number,
  verbose?: string | boolean
}

export const getMany = async ({
  params,
  size,
  after,
  before,
  verbose,
  collection,
  request
}: UtilityInput): Promise<Responder> => {
  /** Establish Fauna Client - If it cannot be established throw 500 error */
  const client = new Client({ secret })
  if (!client) return responder(
      500,
      'Server Error: No FaunaDB Authentication Provided.'
    )

  const [error, data] = await safeAwait(
    client.query(
      Call(
        "GetResults",
        params.length ?
        Intersection(
          ...params
        ) : Match(Index(collection)),
        {
          size: getPageSize(size, verbose),
          ...(verbose) && { verbose },
          ...(after) && { after },
          ...(before) && { before },
        },
        getProperCollectionName(collection)
      )
    )
  )

  if (error) return responder(
    500,
    'Server Error: ' + error
  )

  return responder(
    200, 
    getFormattedData(data, request)
  )
}