import { Expr, Distinct, Union, Match, Index } from "faunadb"

export const createFilters = (
  filters: { [key: string]: string }, 
  collection: string
): Expr[] => {
  /** Create array of params to search from
   * Each Match will return an array of Refs
   * The Union will combine the Refs of each param, 
   * meaning this is an OR search
   * The Distinct will remove any duplicates
   */
   const params = []
   Object.keys(filters).forEach(param => {
    params.push(
      Distinct(
        Union(
          param
            .trim()
            .split(',')
            .map(value => 
              Match(Index(`${collection.toLowerCase()}_by_${param}`), value)
            )
            .join(',')
        )
      )
    )
  })
  return params
}