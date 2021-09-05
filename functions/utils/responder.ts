import { HandlerResponse } from "@netlify/functions"

export type Responder = {
  response: HandlerResponse,
  addResponseTime: (time: number) => HandlerResponse,
}

export const responder = (statusCode: number, body: any): Responder => {
  const _responder: Responder = {
    response: {
      statusCode,
      body
    },
    addResponseTime: (time: number): HandlerResponse => {
      _responder.response.body = JSON.stringify({
        stats: {
          'response_time': time
        },
        ..._responder.response.body as any,
      })
      return _responder.response
    }
  }

  return _responder
}