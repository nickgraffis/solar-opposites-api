import { HandlerResponse } from "@netlify/functions"
import { Call, Client, Expr, Intersection } from "faunadb"
import { getPageSize, getProperCollectionName } from "."
import safeAwait from './safeAwait';
const { FAUNADB: secret } = process.env

type UtilityInput = {
  params: Expr[],
  collection: string,
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
  collection
}: UtilityInput): Promise<HandlerResponse> => {
  /** Establish Fauna Client - If it cannot be established throw 500 error */
  const client = new Client({ secret })
  if (!client) return {
    statusCode: 500,
    body: 'Server Error: No FaunaDB Authentication Provided.'
  }

  const [error, data] = await safeAwait(
    client.query(
      Call(
        "GetResults",
        Intersection(
          ...params
        ),
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

  if (error) return {
    statusCode: 500,
    body: 'Server Error: ' + error
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}