export const getFunctionName = (collection: string): string => {
  if (collection.slice(-1) === 's') collection = collection.slice(0, -1);
  return `Get${collection[0].toUpperCase()}${collection.slice(1)}`;
}

export const getProperCollectionName = (collection: string): string => {
  if (collection.slice(-1) === 's') collection = collection.slice(0, -1);
  return `${collection[0].toUpperCase()}${collection.slice(1)}`;
}

export const getPageSize = (size?: number, verbose?: string | boolean): number => {
  size = size || (verbose ? 12 : 64)
  if (verbose) {
    if (size > 24) return 24;
    return size;
  } else {
    if (size > 100) return 100;
    return size;
  }
}

export const getOriginalRequest = (collection: string, params: { [key: string]: string }): string => {
  delete params.after
  delete params.before
  const keys = Object.keys(params)

  return collection + '?' + keys
  .map(key => key + '=' + params[key])
  .join('&')
}

export const getNextPage = (originalRequest: string, cursor: string): string => {
  return `${originalRequest}&after=${cursor}`
}

export const getPreviousPage = (originalRequest: string, cursor: string): string => {
  return `${originalRequest}&before=${cursor}`
}

export const getFormattedData = (data: any, request: string) => {
  if (data.info.after) data.info.after = `https://solaroppositesapi.com/api/${encodeURIComponent(`${request}&after=${data.info.after}`)}`
  if (data.info.before) data.info.before = `https://solaroppositesapi.com/api/${encodeURIComponent(`${request}&before=${data.info.before}`)}`

  return data
}